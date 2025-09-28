'use client';

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Eye, EyeOff, ChevronRight, ArrowLeft, Shield, Mail, Lock } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import FocusLock from 'react-focus-lock';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import debounce from 'lodash.debounce';
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Utility to get token from cookies
const getToken = () => {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='));
  console.log(`[${new Date().toISOString()}] Login - Cookies:`, document.cookie);
  return cookie?.split('=')[1];
};

// Error Boundary Component
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('ErrorBoundary caught:', error);
      }
      setHasError(true);
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded text-xs">
        Something went wrong. Please refresh the page or try again later.
      </div>
    );
  }
  return children;
};
ErrorBoundary.propTypes = { children: PropTypes.node.isRequired };
ErrorBoundary.displayName = 'ErrorBoundary';

// Dynamic SocialButton
const SocialButton = dynamic(
  () =>
    Promise.resolve(
      memo(function SocialButton({ provider, icon, onClick }) {
        const [isLoading, setIsLoading] = useState(false);
        const buttonRef = useRef(null);

        useEffect(() => {
          if (process.env.NODE_ENV === 'development' && buttonRef.current) {
            const unexpectedAttrs = Array.from(buttonRef.current.attributes).filter(
              attr => !['type', 'class', 'aria-label', 'disabled'].includes(attr.name)
            );
            if (unexpectedAttrs.length > 0) {
              console.warn(`Unexpected attributes on ${provider} button:`, unexpectedAttrs);
            }
          }
        }, [provider]);

        const handleClick = async () => {
          setIsLoading(true);
          try {
            await onClick();
          } catch (error) {
            toast.error(`Failed to sign in with ${provider}`);
            console.error(`Social login error (${provider}):`, error);
          } finally {
            setIsLoading(false);
          }
        };

        return (
          <motion.button
            ref={buttonRef}
            type="button"
            onClick={handleClick}
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-3 border border-slate-200 rounded-lg shadow-sm bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} transition-all duration-300`}
            aria-label={`Sign in with ${provider}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? 'Loading...' : icon}
            {provider}
          </motion.button>
        );
      })
    ),
  { ssr: false }
);

SocialButton.displayName = 'SocialButton';
SocialButton.propTypes = {
  provider: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Validation Hook
const useFormValidation = () => {
  const validateField = useCallback((name, value, step = 0, confirmPassword = '') => {
    const errors = {};
    if (name === 'email' || step === 1) {
      if (!value.trim()) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) errors.email = 'Please enter a valid email address';
    }
    if (name === 'password' && step === 0) {
      if (!value) errors.password = 'Password is required';
    }
    if (step === 2) {
      if (name === 'otp' && !value.trim()) errors.otp = 'OTP is required';
      else if (name === 'otp' && !/^\d{6}$/.test(value)) errors.otp = 'OTP must be a 6-digit number';
    }
    if (step === 3) {
      if (name === 'newPassword') {
        if (!value) errors.newPassword = 'New password is required';
        else if (value.length < 8) errors.newPassword = 'Password must be at least 8 characters';
        else if (!/[A-Z]/.test(value)) errors.newPassword = 'Include at least one uppercase letter';
        else if (!/[0-9]/.test(value)) errors.newPassword = 'Include at least one number';
      }
      if (name === 'confirmNewPassword' && value !== confirmPassword) {
        errors.confirmNewPassword = 'Passwords do not match';
      }
    }
    return errors;
  }, []);
  return { validateField };
};

// Password Strength Indicator
const PasswordStrengthIndicator = memo(({ password }) => {
  const [strength, setStrength] = useState(null);

  useEffect(() => {
    if (!password) {
      setStrength(null);
      return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    setStrength(score);
  }, [password]);

  if (!strength && strength !== 0) return null;

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-blue-400',
    'bg-green-500',
  ];

  return (
    <div className="mt-2 flex items-center">
      <div className="w-full h-1 bg-slate-200 rounded overflow-hidden">
        <div
          className={`h-1 rounded ${strengthColors[strength] || strengthColors[0]}`}
          style={{ width: `${(strength + 1) * 20}%` }}
        />
      </div>
      <span className="ml-2 text-xs text-slate-600 min-w-[70px]">
        {strengthLabels[strength] || strengthLabels[0]}
      </span>
    </div>
  );
});
PasswordStrengthIndicator.propTypes = { password: PropTypes.string.isRequired };
PasswordStrengthIndicator.displayName = 'PasswordStrengthIndicator';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [forgotPasswordErrors, setForgotPasswordErrors] = useState({});
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [forgotAuthMessage, setForgotAuthMessage] = useState('');
  const [forgotPasswordStep, setForgotPasswordStep] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);

  const router = useRouter();
  const dialogRef = useRef(null);
  const emailInputRef = useRef(null);
  const forgotEmailInputRef = useRef(null);
  const otpInputRef = useRef(null);
  const newPasswordInputRef = useRef(null);
  const { validateField } = useFormValidation();

  useEffect(() => {
    const token = getToken();
    console.log(`[${new Date().toISOString()}] Login - Token check:`, token ? 'Present' : 'Absent');
    if (token) {
      console.log(`[${new Date().toISOString()}] Token found, redirecting to /dashboard`);
      router.push('/dashboard');
    } else {
      emailInputRef.current?.focus();
    }
  }, [router]);

  useEffect(() => {
    if (forgotPasswordStep === 1) forgotEmailInputRef.current?.focus();
    else if (forgotPasswordStep === 2) otpInputRef.current?.focus();
    else if (forgotPasswordStep === 3) newPasswordInputRef.current?.focus();
  }, [forgotPasswordStep]);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
      setErrors(prev => ({ ...prev, ...validateField(name, value) }));
      setAuthError('');
    },
    [validateField]
  );

  const handleForgotPasswordChange = useCallback(
    (name, value, step, newPassword) => {
      setForgotPasswordData(prev => ({
        ...prev,
        [name]: value,
      }));
      setForgotPasswordErrors(prev => ({
        ...prev,
        ...validateField(name, value, step, newPassword),
      }));
      setForgotAuthMessage('');
    },
    [validateField]
  );

  const debouncedForgotPasswordChange = useMemo(
    () => debounce(handleForgotPasswordChange, 300),
    [handleForgotPasswordChange]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setAuthError('');
      const formErrors = {};
      Object.keys(formData).forEach(key => {
        if (key !== 'rememberMe') {
          Object.assign(formErrors, validateField(key, formData[key]));
        }
      });
      setErrors(formErrors);
      if (Object.keys(formErrors).length > 0) {
        toast.error('Please fix the form errors');
        return;
      }

      setIsLoginLoading(true);
      try {
        const response = await api.post('/api/users/login', {
          email: formData.email.trim(),
          password: formData.password,
        });
        const { token } = response.data;
        console.log(`[${new Date().toISOString()}] Login - Token received:`, token);
        document.cookie = `token=${token}; path=/; SameSite=Strict; ${formData.rememberMe ? 'Max-Age=604800' : ''}`;
        console.log(`[${new Date().toISOString()}] Login - Cookie set:`, document.cookie);
        toast.success('Login successful');
        router.push('/dashboard');
      } catch (error) {
        let message = error.response?.data?.message || 'Login failed. Please check your credentials.';
        if (error.code === 'ERR_NETWORK') {
          message = 'Network error. Please check your internet connection.';
        } else if (error.code === 'ECONNABORTED') {
          message = 'Request timed out. Please try again later.';
        }
        console.error(`[${new Date().toISOString()}] Login error:`, error.response || error);
        setAuthError(message);
        toast.error(message);
      } finally {
        setIsLoginLoading(false);
      }
    },
    [formData, router, validateField]
  );

  const handleForgotPasswordSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setForgotAuthMessage('');
      const formErrors = validateField(
        forgotPasswordStep === 1 ? 'email' : forgotPasswordStep === 2 ? 'otp' : 'newPassword',
        forgotPasswordData[forgotPasswordStep === 1 ? 'email' : forgotPasswordStep === 2 ? 'otp' : 'newPassword'],
        forgotPasswordStep,
        forgotPasswordData.newPassword
      );
      if (forgotPasswordStep === 3) {
        Object.assign(formErrors, validateField('confirmNewPassword', forgotPasswordData.confirmNewPassword, forgotPasswordStep, forgotPasswordData.newPassword));
      }
      setForgotPasswordErrors(formErrors);
      if (Object.keys(formErrors).length > 0) {
        toast.error('Please fix the form errors');
        return;
      }

      setIsModalLoading(true);
      try {
        if (forgotPasswordStep === 1) {
          await api.post('/api/users/forgot-password', {
            email: forgotPasswordData.email.trim(),
          });
          console.log(`[${new Date().toISOString()}] Forgot Password - OTP sent for email:`, forgotPasswordData.email);
          setForgotAuthMessage('OTP sent successfully. Check your inbox or spam folder.');
          toast.success('OTP sent successfully');
          setForgotPasswordStep(2);
          setResendTimer(60);
        } else if (forgotPasswordStep === 2) {
          await api.post('/api/users/verify-otp', {
            email: forgotPasswordData.email.trim(),
            otp: forgotPasswordData.otp,
          });
          console.log(`[${new Date().toISOString()}] Forgot Password - OTP verified for email:`, forgotPasswordData.email);
          setForgotAuthMessage('OTP verified successfully.');
          toast.success('OTP verified successfully');
          setForgotPasswordStep(3);
        } else if (forgotPasswordStep === 3) {
          await api.post('/api/users/reset-password', {
            email: forgotPasswordData.email.trim(),
            otp: forgotPasswordData.otp,
            newPassword: forgotPasswordData.newPassword,
          });
          console.log(`[${new Date().toISOString()}] Forgot Password - Password reset for email:`, forgotPasswordData.email);
          setForgotPasswordStep(0);
          setAuthError('Password reset successfully. Please log in with your new password.');
          toast.success('Password reset successfully');
          setForgotPasswordData({ email: '', otp: '', newPassword: '', confirmNewPassword: '' });
          emailInputRef.current?.focus();
        }
      } catch (error) {
        let message = error.response?.data?.message || `Error in ${forgotPasswordStep === 1 ? 'sending OTP' : forgotPasswordStep === 2 ? 'verifying OTP' : 'resetting password'}.`;
        if (error.code === 'ERR_NETWORK') {
          message = 'Network error. Please check your internet connection.';
        } else if (error.code === 'ECONNABORTED') {
          message = 'Request timed out. Please try again later.';
        }
        console.error(`[${new Date().toISOString()}] Forgot Password error:`, error.response || error);
        setForgotAuthMessage(message);
        toast.error(message);
      } finally {
        setIsModalLoading(false);
      }
    },
    [forgotPasswordStep, forgotPasswordData, validateField]
  );

  const handleResendOtp = useCallback(
    async () => {
      if (resendTimer > 0 || isModalLoading) return;
      setIsModalLoading(true);
      setForgotAuthMessage('');
      try {
        await api.post('/api/users/forgot-password', {
          email: forgotPasswordData.email.trim(),
        });
        console.log(`[${new Date().toISOString()}] Forgot Password - OTP resent for email:`, forgotPasswordData.email);
        setForgotAuthMessage('OTP resent successfully. Check your inbox or spam folder.');
        toast.success('OTP resent successfully');
        setResendTimer(60);
      } catch (error) {
        let message = error.response?.data?.message || 'Failed to resend OTP.';
        if (error.code === 'ERR_NETWORK') {
          message = 'Network error. Please check your internet connection.';
        } else if (error.code === 'ECONNABORTED') {
          message = 'Request timed out. Please try again later.';
        }
        console.error(`[${new Date().toISOString()}] Resend OTP error:`, error.response || error);
        setForgotAuthMessage(message);
        toast.error(message);
      } finally {
        setIsModalLoading(false);
      }
    },
    [resendTimer, isModalLoading, forgotPasswordData.email]
  );

  const handleCloseDialog = useCallback(() => {
    setForgotPasswordStep(0);
    setForgotAuthMessage('');
    setForgotPasswordErrors({});
    setForgotPasswordData({ email: '', otp: '', newPassword: '', confirmNewPassword: '' });
    setResendTimer(0);
    emailInputRef.current?.focus();
  }, []);

  const handleBack = useCallback(() => {
    if (forgotPasswordStep > 1) {
      setForgotPasswordStep(prev => prev - 1);
      setForgotAuthMessage('');
      setForgotPasswordErrors({});
    }
  }, [forgotPasswordStep]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-xs">
        {/* Floating Gradient Orbs */}
        <div className="fixed -top-16 -left-16 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-10 blur-2xl animate-float-slow z-0" />
        <div className="fixed bottom-4 right-4 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 opacity-10 blur-2xl animate-float-medium z-0" />

        <main className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900">Welcome Back</h2>
            <p className="mt-2 text-xs text-slate-600 max-w-md mx-auto leading-5">
              Sign in to access your QR sticker dashboard
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="bg-white py-8 px-6 sm:px-8 rounded-xl shadow-sm border border-slate-200"
          >
            {authError && (
              <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-xs" aria-live="polite">
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {authError}
                </div>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">
                  Email address
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    ref={emailInputRef}
                    disabled={isLoginLoading}
                    className={`block w-full pl-10 pr-3 py-2 border text-xs rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.email ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-slate-300'
                    } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-label="Your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600" id="email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoginLoading}
                    className={`block w-full pl-10 pr-10 py-2 border text-xs rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.password ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-slate-300'
                    } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    aria-label="Your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-500 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      disabled={isLoginLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600" id="password-error">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isLoginLoading}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded disabled:cursor-not-allowed"
                    aria-label="Remember me"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-700">
                    Remember me
                  </label>
                </div>

                <div className="text-xs">
                  <button
                    type="button"
                    onClick={() => setForgotPasswordStep(1)}
                    disabled={isLoginLoading}
                    className="font-medium text-indigo-600 hover:text-indigo-500 disabled:text-slate-400 disabled:cursor-not-allowed"
                    aria-label="Reset your password"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  type="submit"
                  disabled={isLoginLoading}
                  className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-xs font-semibold text-white ${
                    isLoginLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  } transition-all duration-300`}
                  aria-label="Sign in to your account"
                >
                  Sign in
                  <ChevronRight className="ml-2 h-3 w-3" />
                </button>
              </motion.div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <SocialButton
                  provider="GitHub"
                  icon={
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                  onClick={() => console.log('GitHub login')}
                />
                <SocialButton
                  provider="Google"
                  icon={
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  }
                  onClick={() => console.log('Google login')}
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-600">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </main>

        <Transition appear show={forgotPasswordStep > 0} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={handleCloseDialog} initialFocus={forgotEmailInputRef}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            </Transition.Child>

            <FocusLock>
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm border border-slate-200">
                      <div className="flex items-center mb-4">
                        {forgotPasswordStep > 1 && (
                          <motion.button
                            type="button"
                            onClick={handleBack}
                            className="mr-2 p-1 rounded-full hover:bg-slate-100"
                            disabled={isModalLoading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Go back to previous step"
                          >
                            <ArrowLeft className="h-4 w-4 text-slate-600" />
                          </motion.button>
                        )}
                        <Dialog.Title as="h3" className="text-sm sm:text-base font-semibold text-slate-900">
                          {forgotPasswordStep === 1 && 'Reset Your Password'}
                          {forgotPasswordStep === 2 && 'Verify OTP'}
                          {forgotPasswordStep === 3 && 'Set New Password'}
                        </Dialog.Title>
                      </div>

                      {forgotAuthMessage && (
                        <div
                          className={`mb-4 p-3 rounded text-xs ${
                            forgotAuthMessage.includes('successfully') ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'
                          }`}
                          aria-live="polite"
                        >
                          {forgotAuthMessage}
                        </div>
                      )}

                      <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                        {forgotPasswordStep === 1 && (
                          <div>
                            <label htmlFor="forgot-email" className="block text-xs font-medium text-slate-700 mb-1">
                              Email address
                            </label>
                            <div className="relative rounded-lg shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-4 w-4 text-slate-400" />
                              </div>
                              <input
                                id="forgot-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                value={forgotPasswordData.email}
                                onChange={(e) => debouncedForgotPasswordChange(e.target.name, e.target.value, forgotPasswordStep, forgotPasswordData.newPassword)}
                                ref={forgotEmailInputRef}
                                disabled={isModalLoading}
                                className={`block w-full pl-10 pr-3 py-2 border text-xs rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                                  forgotPasswordErrors.email ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-slate-300'
                                } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                                aria-invalid={!!forgotPasswordErrors.email}
                                aria-describedby={forgotPasswordErrors.email ? 'forgot-email-error' : undefined}
                                aria-label="Your email address for password reset"
                              />
                            </div>
                            {forgotPasswordErrors.email && (
                              <p className="mt-1 text-xs text-red-600" id="forgot-email-error">
                                {forgotPasswordErrors.email}
                              </p>
                            )}
                            <p className="mt-2 text-xs text-slate-500">
                              We&apos;ll send a one-time password (OTP) to this email to verify your identity.
                            </p>
                          </div>
                        )}

                        {forgotPasswordStep === 2 && (
                          <div>
                            <label htmlFor="otp" className="block text-xs font-medium text-slate-700 mb-1">
                              One-Time Password (OTP)
                            </label>
                            <div className="relative rounded-lg shadow-sm">
                              <input
                                id="otp"
                                name="otp"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="Enter 6-digit OTP"
                                value={forgotPasswordData.otp}
                                onChange={(e) => debouncedForgotPasswordChange(e.target.name, e.target.value.replace(/\D/g, '').slice(0, 6), forgotPasswordStep, forgotPasswordData.newPassword)}
                                ref={otpInputRef}
                                disabled={isModalLoading}
                                className={`block w-full px-3 py-2 border text-xs rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                                  forgotPasswordErrors.otp ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-slate-300'
                                } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                                aria-invalid={!!forgotPasswordErrors.otp}
                                aria-describedby={forgotPasswordErrors.otp ? 'otp-error' : undefined}
                                aria-label="Enter your 6-digit OTP"
                              />
                            </div>
                            {forgotPasswordErrors.otp && (
                              <p className="mt-1 text-xs text-red-600" id="otp-error">
                                {forgotPasswordErrors.otp}
                              </p>
                            )}
                            <p className="mt-2 text-xs text-slate-500">
                              Enter the 6-digit code sent to your email. It expires in 10 minutes.
                            </p>
                            <div className="mt-3">
                              <motion.button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={resendTimer > 0 || isModalLoading}
                                className={`inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg shadow-sm text-xs font-semibold text-white ${
                                  resendTimer > 0 || isModalLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                } transition-all duration-300`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Resend OTP"
                              >
                                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                              </motion.button>
                            </div>
                          </div>
                        )}

                        {forgotPasswordStep === 3 && (
                          <>
                            <div>
                              <label htmlFor="newPassword" className="block text-xs font-medium text-slate-700 mb-1">
                                New Password
                              </label>
                              <div className="relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Lock className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                  id="newPassword"
                                  name="newPassword"
                                  type={showNewPassword ? 'text' : 'password'}
                                  placeholder="Enter new password"
                                  value={forgotPasswordData.newPassword}
                                  onChange={(e) => debouncedForgotPasswordChange(e.target.name, e.target.value, forgotPasswordStep, forgotPasswordData.newPassword)}
                                  ref={newPasswordInputRef}
                                  disabled={isModalLoading}
                                  className={`block w-full pl-10 pr-10 py-2 border text-xs rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                                    forgotPasswordErrors.newPassword ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-slate-300'
                                  } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                                  aria-invalid={!!forgotPasswordErrors.newPassword}
                                  aria-describedby={forgotPasswordErrors.newPassword ? 'newPassword-error' : undefined}
                                  aria-label="Your new password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                  <button
                                    type="button"
                                    className="text-slate-400 hover:text-slate-500 focus:outline-none"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                                    disabled={isModalLoading}
                                  >
                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </button>
                                </div>
                              </div>
                              {forgotPasswordErrors.newPassword && (
                                <p className="mt-1 text-xs text-red-600" id="newPassword-error">
                                  {forgotPasswordErrors.newPassword}
                                </p>
                              )}
                              <PasswordStrengthIndicator password={forgotPasswordData.newPassword} />
                            </div>

                            <div>
                              <label htmlFor="confirmNewPassword" className="block text-xs font-medium text-slate-700 mb-1">
                                Confirm New Password
                              </label>
                              <div className="relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Lock className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                  id="confirmNewPassword"
                                  name="confirmNewPassword"
                                  type={showConfirmNewPassword ? 'text' : 'password'}
                                  placeholder="Confirm new password"
                                  value={forgotPasswordData.confirmNewPassword}
                                  onChange={(e) => debouncedForgotPasswordChange(e.target.name, e.target.value, forgotPasswordStep, forgotPasswordData.newPassword)}
                                  disabled={isModalLoading}
                                  className={`block w-full pl-10 pr-10 py-2 border text-xs rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                                    forgotPasswordErrors.confirmNewPassword ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-slate-300'
                                  } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                                  aria-invalid={!!forgotPasswordErrors.confirmNewPassword}
                                  aria-describedby={forgotPasswordErrors.confirmNewPassword ? 'confirmNewPassword-error' : undefined}
                                  aria-label="Confirm your new password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                  <button
                                    type="button"
                                    className="text-slate-400 hover:text-slate-500 focus:outline-none"
                                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                    aria-label={showConfirmNewPassword ? 'Hide confirm password' : 'Show confirm password'}
                                    disabled={isModalLoading}
                                  >
                                    {showConfirmNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </button>
                                </div>
                              </div>
                              {forgotPasswordErrors.confirmNewPassword && (
                                <p className="mt-1 text-xs text-red-600" id="confirmNewPassword-error">
                                  {forgotPasswordErrors.confirmNewPassword}
                                </p>
                              )}
                            </div>
                          </>
                        )}

                        <div className="flex justify-between space-x-3 pt-2">
                          <motion.button
                            type="button"
                            className="px-4 py-2 border border-slate-200 rounded-lg shadow-sm text-xs font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-100 disabled:cursor-not-allowed transition-all duration-300"
                            onClick={handleCloseDialog}
                            disabled={isModalLoading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Cancel password reset"
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            type="submit"
                            disabled={isModalLoading}
                            className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={forgotPasswordStep === 1 ? 'Send OTP' : forgotPasswordStep === 2 ? 'Verify OTP' : 'Reset Password'}
                          >
                            {forgotPasswordStep === 1 ? 'Send OTP' : forgotPasswordStep === 2 ? 'Verify OTP' : 'Reset Password'}
                            <ChevronRight className="ml-2 h-3 w-3 inline" />
                          </motion.button>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </FocusLock>
          </Dialog>
        </Transition>
      </div>
    </ErrorBoundary>
  );
}
