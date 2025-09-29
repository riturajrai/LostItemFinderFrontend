'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://lostitemfinder.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

// Mock analytics with debounce
const trackEvent = (() => {
  const queue = [];
  let timeoutId = null;

  return (event, data) => {
    queue.push({ event, data, timestamp: Date.now() });
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        console.groupCollapsed(`Analytics Batch (${queue.length} events)`);
        queue.forEach(item => console.log(`%c${item.event}`, 'color: #00BFFF', item));
        console.groupEnd();
        queue.length = 0;
        timeoutId = null;
      }, 1000);
    }
  };
})();

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const router = useRouter();
  const nameInputRef = useRef(null);
  const formRef = useRef(null);

  // Auto-focus name input on mount
  useEffect(() => {
    nameInputRef.current?.focus({ preventScroll: true });
  }, []);

  // Memoized field validation
  const validateField = useCallback((name, value, confirmPassword = '') => {
    const newErrors = {};

    if (name === 'name') {
      if (!value.trim()) newErrors.name = 'Name is required';
      else if (value.length < 3) newErrors.name = 'Name must be at least 3 characters';
    }

    if (name === 'email') {
      if (!value.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = 'Please enter a valid email';
    }

    if (name === 'password') {
      if (!value) newErrors.password = 'Password is required';
      else if (value.length < 8) newErrors.password = 'Password must be at least 8 characters';
      else if (!/[A-Z]/.test(value)) newErrors.password = 'Include at least one uppercase letter';
      else if (!/[0-9]/.test(value)) newErrors.password = 'Include at least one number';
    }

    if (name === 'confirmPassword' && value !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (name === 'terms' && !value) {
      newErrors.terms = 'You must agree to the terms';
    }

    return newErrors;
  }, []);

  // Optimized handleChange with debounced validation
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Debounce validation for better performance
    if (validationTimeout.current) {
      clearTimeout(validationTimeout.current);
    }

    validationTimeout.current = setTimeout(() => {
      setErrors(prev => ({
        ...prev,
        ...validateField(name, type === 'checkbox' ? checked : value, formData.password),
      }));
      setAuthError('');
    }, 300);
  }, [formData.password, validateField]);

  const validationTimeout = useRef(null);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (validationTimeout.current) {
        clearTimeout(validationTimeout.current);
      }
    };
  }, []);

  // Form submission handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setAuthError('');

    // Validate all fields
    const formErrors = {};
    Object.keys(formData).forEach(key => {
      Object.assign(formErrors, validateField(key, formData[key], formData.password));
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      toast.error('Please fix the form errors');
      // Focus first error field
      const firstError = Object.keys(formErrors)[0];
      if (formRef.current && firstError) {
        const errorInput = formRef.current.querySelector(`[name="${firstError}"]`);
        errorInput?.focus({ preventScroll: true });
      }
      return;
    }

    setIsLoading(true);
    trackEvent('signup_attempt', { email: formData.email });

    try {
      const response = await api.post('/api/users/signup', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.status === 201) {
        // Store form data in localStorage for resend OTP
        localStorage.setItem('pendingSignup', JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }));
        toast.success('OTP sent to your email');
        trackEvent('signup_success', { email: formData.email });
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      }
    } catch (error) {
      console.error('Signup error:', error);

      let message = 'Registration failed. Please try again.';
      if (error.response) {
        message = error.response.data?.message || message;
      } else if (error.code === 'ERR_NETWORK') {
        message = 'Network error. Please check your connection.';
      } else if (error.code === 'ECONNABORTED') {
        message = 'Request timed out. Please try again.';
      }

      setAuthError(message);
      toast.error(message);
      trackEvent('signup_error', { error: message });
    } finally {
      setIsLoading(false);
    }
  }, [formData, router, validateField]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-xs">
      <main className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-[14px] font-medium text-gray-800 mb-3">
            Create Your Account
          </h1>
          <p className="text-xs text-gray-600 max-w-md mx-auto">
            Sign up to protect your valuables with our secure QR sticker technology.{' '}
            <Link href="/login" className="font-medium text-[#00BFFF] hover:text-[#00BFFF]/80">
              Already have an account? Sign in
            </Link>
          </p>
        </div>

        <div className="bg-white p-6 rounded-md border border-gray-200">
          {authError && (
            <div className="mb-4 p-3 bg-red-50 border-l-2 border-red-500 text-red-600 rounded text-xs" role="alert">
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {authError}
              </div>
            </div>
          )}

          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                ref={nameInputRef}
                disabled={isLoading}
                className={`block w-full px-3 py-2 border rounded-md focus:outline-none text-xs ${
                  errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-[#00BFFF] focus:border-[#00BFFF]'
                } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                aria-label="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`block w-full px-3 py-2 border rounded-md focus:outline-none text-xs ${
                  errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-[#00BFFF] focus:border-[#00BFFF]'
                } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-label="Your email address"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1">
                Password <span className="text-gray-500 font-normal">(min 8 characters)</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`block w-full px-3 py-2 border rounded-md focus:outline-none text-xs ${
                    errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-[#00BFFF] focus:border-[#00BFFF]'
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  aria-label="Your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600" id="password-error">
                  {errors.password}
                </p>
              )}
              {formData.password && <PasswordStrengthIndicator password={formData.password} />}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-600 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`block w-full px-3 py-2 border rounded-md focus:outline-none text-xs ${
                    errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-[#00BFFF] focus:border-[#00BFFF]'
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                  aria-label="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600" id="confirmPassword-error">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`h-4 w-4 text-[#00BFFF] focus:ring-[#00BFFF] rounded ${
                    errors.terms ? 'border-red-300' : 'border-gray-200'
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.terms}
                  aria-describedby={errors.terms ? "terms-error" : undefined}
                  aria-label="Agree to terms and privacy policy"
                />
              </div>
              <div className="ml-3 text-xs">
                <label htmlFor="terms" className="font-medium text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#00BFFF] hover:text-[#00BFFF]/80">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[#00BFFF] hover:text-[#00BFFF]/80">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            {errors.terms && (
              <p className="mt-1 text-xs text-red-600" id="terms-error">
                {errors.terms}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md text-xs font-medium text-white ${
                isLoading ? 'bg-[#00BFFF]/50 cursor-not-allowed' : 'bg-[#00BFFF] hover:bg-[#00BFFF]/80 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]'
              }`}
              aria-label="Create your account"
            >
              Create Account
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-600">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-3 border border-gray-200 rounded-md bg-white text-xs font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] disabled:bg-gray-100 disabled:cursor-not-allowed"
                onClick={() => {
                  trackEvent('social_signup_attempt', { provider: 'github' });
                  // Implement GitHub OAuth
                }}
                disabled={isLoading}
                aria-label="Sign up with GitHub"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
                GitHub
              </button>

              <button
                type="button"
                className="w-full flex justify-center py-2 px-3 border border-gray-200 rounded-md bg-white text-xs font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] disabled:bg-gray-100 disabled:cursor-not-allowed"
                onClick={() => {
                  trackEvent('social_signup_attempt', { provider: 'google' });
                  // Implement Google OAuth
                }}
                disabled={isLoading}
                aria-label="Sign up with Google"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.166-2.685-6.735-2.685-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z" />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}