"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';

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
        queue.forEach(item => console.log(`%c${item.event}`, 'color: #4CAF50', item));
        console.groupEnd();
        queue.length = 0;
        timeoutId = null;
      }, 1000);
    }
  };
})();

// Client Component to handle useSearchParams
function VerifyEmailContent({ children }) {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  return children({ email });
}

function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent>
        {({ email }) => <VerifyEmailForm email={email} />}
      </VerifyEmailContent>
    </Suspense>
  );
}

function VerifyEmailForm({ email }) {
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const router = useRouter();
  const otpInputRef = useRef(null);

  // Auto-focus OTP input on mount
  useEffect(() => {
    if (!email) {
      setAuthMessage('No email provided. Please go back to signup.');
      toast.error('No email provided. Please go back to signup.');
      return;
    }
    otpInputRef.current?.focus();
  }, [email]);

  // Timer for resend OTP
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Cleanup localStorage on component unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem('pendingSignup');
    };
  }, []);

  // Memoized OTP validation
  const validateOtp = useCallback((value) => {
    const errors = {};
    if (!value.trim()) errors.otp = 'OTP is required';
    else if (!/^\d{6}$/.test(value)) errors.otp = 'OTP must be a 6-digit number';
    return errors;
  }, []);

  // Handle OTP input change
  const handleOtpChange = useCallback((e) => {
    const value = e.target.value;
    setOtp(value);
    setErrors(validateOtp(value));
    setAuthMessage('');
  }, [validateOtp]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setAuthMessage('');

      if (!email) {
        setAuthMessage('No email provided. Please go back to signup.');
        toast.error('No email provided. Please go back to signup.');
        return;
      }

      const otpErrors = validateOtp(otp);
      setErrors(otpErrors);

      if (Object.keys(otpErrors).length > 0) {
        toast.error('Please enter a valid OTP');
        otpInputRef.current?.focus();
        return;
      }

      setIsLoading(true);
      trackEvent('otp_verify_attempt', { email });

      try {
        const response = await api.post('/api/users/verify-signup-otp', {
          email: email.trim(),
          otp,
        });

        if (response.status === 201) {
          toast.success('Email verified successfully! Redirecting to login...');
          trackEvent('otp_verified_signup', { email });
          localStorage.removeItem('pendingSignup');
          setTimeout(() => router.push('/login'), 1500);
        }
      } catch (error) {
        console.error('OTP verification error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          code: error.code,
        });
        let message = error.response?.data?.message || 'OTP verification failed. Please try again.';
        if (error.code === 'ERR_NETWORK') {
          message = 'Network error. Please check your internet connection.';
        } else if (error.code === 'ECONNABORTED') {
          message = 'Request timed out. Please try again later.';
        }
        setAuthMessage(message);
        toast.error(message);
        trackEvent('otp_verification_error', { email, error: message });
      } finally {
        setIsLoading(false);
      }
    },
    [otp, email, router, validateOtp]
  );

  // Handle resend OTP
  const handleResendOtp = useCallback(
    async () => {
      if (resendTimer > 0 || isLoading) return;
      if (!email) {
        setAuthMessage('No email provided. Please go back to signup.');
        toast.error('No email provided. Please go back to signup.');
        return;
      }

      setIsLoading(true);
      setAuthMessage('');
      trackEvent('resend_otp_attempt', { email });

      try {
        const pendingSignup = JSON.parse(localStorage.getItem('pendingSignup') || '{}');
        if (!pendingSignup.name || !pendingSignup.email || !pendingSignup.password || !pendingSignup.confirmPassword) {
          setAuthMessage('Signup data missing. Please go back to signup.');
          toast.error('Signup data missing. Please go back to signup.');
          router.push('/signup');
          return;
        }

        const response = await api.post('/api/users/signup', {
          name: pendingSignup.name,
          email: pendingSignup.email,
          password: pendingSignup.password,
          confirmPassword: pendingSignup.confirmPassword,
        });

        if (response.status === 201) {
          setAuthMessage('OTP resent successfully. Check your inbox or spam folder.');
          toast.success('OTP resent successfully');
          trackEvent('resend_otp_success', { email });
          setResendTimer(30);
        }
      } catch (error) {
        console.error('Resend OTP error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          code: error.code,
        });
        let message = error.response?.data?.message || 'Failed to resend OTP. Please try again.';
        if (error.code === 'ERR_NETWORK') {
          message = 'Network error. Please check your internet connection.';
        } else if (error.code === 'ECONNABORTED') {
          message = 'Request timed out. Please try again later.';
        }
        setAuthMessage(message);
        toast.error(message);
        trackEvent('resend_otp_error', { email, error: message });
      } finally {
        setIsLoading(false);
      }
    },
    [resendTimer, isLoading, email, router]
  );

  // Fallback UI if no email is provided
  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-6 sm:pt-10 sm:pb-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-[28rem] space-y-6">
          <div className="text-center">
            <Link href="/" onClick={() => trackEvent('click_logo', {})}>
              <div className="mx-auto h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-teal-600 flex items-center justify-center cursor-pointer hover:bg-teal-700 transition-all duration-300 shadow-md">
                <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
            </Link>
            <h2 className="mt-4 text-[clamp(18px,5vw,22px)] font-bold text-gray-800">Error</h2>
            <p className="mt-2 text-[clamp(12px,3vw,13px)] text-gray-600">
              No email provided. Please go back to the signup page.
            </p>
          </div>
          <div className="bg-white py-6 px-4 sm:px-6 lg:px-8 shadow-xl rounded-lg text-center">
            <button
              type="button"
              className="py-1.5 px-4 border border-transparent rounded-md shadow-sm text-[clamp(12px,3vw,13px)] font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300"
              onClick={() => router.push('/register')}
            >
              Back to Signup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-6 sm:pt-10 sm:pb-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[28rem] space-y-6 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg z-10" aria-hidden="true">
            <svg className="animate-spin h-8 w-8 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        )}
        <div className="text-center">
          <Link href="/" onClick={() => trackEvent('click_logo', {})}>
            <div className="mx-auto h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-teal-600 flex items-center justify-center cursor-pointer hover:bg-teal-700 transition-all duration-300 shadow-md">
              <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
          </Link>
          <h2 className="mt-4 text-[clamp(18px,5vw,22px)] font-bold text-gray-800">Verify Your Email</h2>
          <p className="mt-2 text-[clamp(12px,3vw,13px)] text-gray-600">
            We sent a 6-digit OTP to <span className="font-medium">{email}</span>. Please check your inbox or spam folder.
          </p>
        </div>

        <div className="bg-white py-6 px-4 sm:px-6 lg:px-8 shadow-xl rounded-lg">
          {authMessage && (
            <div
              className={`mb-4 p-3 rounded text-[clamp(12px,3vw,13px)] animate-fade-in ${
                authMessage.includes('successfully')
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'bg-red-50 text-red-700 border-l-4 border-red-500'
              }`}
              aria-live="polite"
            >
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  {authMessage.includes('successfully') ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  )}
                </svg>
                {authMessage}
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="otp" className="block text-[clamp(12px,3vw,13px)] font-medium text-gray-700">
                One-Time Password (OTP)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  ref={otpInputRef}
                  className={`block w-full py-2 px-3 border text-[clamp(12px,3vw,13px)] ${
                    errors.otp
                      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
                  } rounded-md shadow-sm focus:outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  disabled={isLoading}
                  aria-invalid={!!errors.otp}
                  aria-describedby={errors.otp ? "otp-error" : undefined}
                />
                {!errors.otp && otp && /^\d{6}$/.test(otp) && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {errors.otp && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {errors.otp && (
                <p className="mt-1 text-[clamp(11px,2.5vw,12px)] text-red-600" id="otp-error">
                  {errors.otp}
                </p>
              )}
              <p className="mt-2 text-[clamp(11px,2.5vw,12px)] text-gray-500">
                Enter the 6-digit code sent to your email. It expires in 10 minutes.
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                className="py-1.5 px-4 border border-gray-300 rounded-md shadow-sm text-[clamp(12px,3vw,13px)] font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                onClick={() => {
                  trackEvent('back_to_signup', { email });
                  router.push('/signup');
                }}
                disabled={isLoading}
              >
                Back
              </button>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || isLoading}
                  className={`py-1.5 px-4 border border-transparent rounded-md shadow-sm text-[clamp(12px,3vw,13px)] font-medium text-white transition-all duration-300 ${
                    resendTimer > 0 || isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
                  }`}
                  aria-label="Resend OTP"
                >
                  {isLoading && resendTimer === 0 ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Resending...
                    </>
                  ) : resendTimer > 0 ? (
                    `Resend OTP in ${resendTimer}s`
                  ) : (
                    'Resend OTP'
                  )}
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`py-1.5 px-4 border border-transparent rounded-md shadow-sm text-[clamp(12px,3vw,13px)] font-medium text-white transition-all duration-300 ${
                    isLoading
                      ? 'bg-teal-400 cursor-not-allowed animate-pulse'
                      : 'bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default VerifyEmailPage;