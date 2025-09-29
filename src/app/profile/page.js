'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://lostitemfinder.onrender.com',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Custom SVG Icons (adjusted for 12px base)
const ShieldIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 3c-2.616 0-5.13.815-7.147 2.32A11.956 11.956 0 003 12c0 5.256 3.364 9.727 8.06 11.316.55.188 1.13.188 1.68 0C17.636 21.727 21 17.256 21 12c0-2.616-.815-5.13-2.382-7.016z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h4l1 7H6m5 0h10l-2-7H9m-6 9a2 2 0 100 4 2 2 0 000-4zm18 0a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SaveIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SecurityIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

// Dialog Component (updated for text-xs)
const Dialog = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 bg-opacity-60 transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-xl shadow-md border border-slate-200 p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-slate-500 hover:text-slate-700 transition-colors"
                aria-label="Close dialog"
              >
                <CloseIcon />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

// Tab Component (updated for text-xs)
const Tab = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
      active
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`}
    aria-label={`Switch to ${children} tab`}
  >
    <Icon />
    <span className="ml-2">{children}</span>
  </button>
);

export default function ProfilePage() {
  const [profile, setProfile] = useState({ name: '', number: '', address: '', email: '', newEmail: '' });
  const [otp, setOtp] = useState('');
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const router = useRouter();
  const nameInputRef = useRef(null);

  // Validate input fields
  const validateField = useCallback((name, value) => {
    const errors = {};
    if (name === 'name' && !value.trim()) {
      errors.name = 'Name is required';
    }
    if (name === 'number') {
      if (!value.trim()) {
        errors.number = 'Phone number is required';
      } else if (!/^\+?[1-9]\d{1,14}$/.test(value)) {
        errors.number = 'Invalid phone number format';
      }
    }
    if (name === 'address') {
      if (!value.trim()) {
        errors.address = 'Address is required';
      } else if (value.length > 500) {
        errors.address = 'Address is too long (max 500 characters)';
      }
    }
    if (name === 'email') {
      if (!value.trim()) {
        errors.email = 'Current email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = 'Invalid current email format';
      }
    }
    if (name === 'newEmail') {
      if (!value.trim()) {
        errors.newEmail = 'New email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.newEmail = 'Invalid new email format';
      }
    }
    if (name === 'otp' && !/^\d{6}$/.test(value)) {
      errors.otp = 'OTP must be a 6-digit number';
    }
    return errors;
  }, []);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log(`[${new Date().toISOString()}] Client - Fetching profile...`);
        const response = await api.get('/api/users/profile');
        console.log(`[${new Date().toISOString()}] Profile fetch response:`, response.data);
        if (response.status === 200) {
          setProfile({
            name: response.data.profile.name || '',
            number: response.data.profile.number || '',
            address: response.data.profile.address || '',
            email: response.data.user.email || '',
            newEmail: '',
          });
        }
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Fetch profile error:`, err.response || err);
        if (err.response?.status === 401) {
          router.push('/login?redirect=/profile');
        } else if (err.response?.status === 404) {
          setProfile({ name: '', number: '', address: '', email: '', newEmail: '' });
        } else {
          setError('Failed to load profile. Please try again later.');
          toast.error('Failed to load profile');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  // Handle input changes
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === 'otp') {
        setOtp(value);
        setErrors((prev) => ({ ...prev, ...validateField(name, value) }));
      } else {
        setProfile((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, ...validateField(name, value) }));
      }
      setError('');
      setSuccess('');
    },
    [validateField]
  );

  // Handle profile submission
  const handleProfileSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      const formErrors = {};

      ['name', 'number', 'address'].forEach((key) => {
        Object.assign(formErrors, validateField(key, profile[key]));
      });

      setErrors(formErrors);
      if (Object.keys(formErrors).length > 0) {
        toast.error('Please fix the form errors');
        return;
      }

      setIsSubmitting(true);
      try {
        console.log(`[${new Date().toISOString()}] Client - Updating profile...`);
        const response = await api.patch('/api/users/profile', {
          name: profile.name.trim(),
          number: profile.number.trim(),
          address: profile.address.trim(),
        });

        console.log(`[${new Date().toISOString()}] Profile update response:`, response.data);
        setProfile((prev) => ({
          ...prev,
          name: response.data.profile.name,
          number: response.data.profile.number,
          address: response.data.profile.address,
        }));
        setSuccess(response.data.message);
        toast.success(response.data.message);
        setShowEditDialog(false);
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Profile update error:`, err.response || err);
        if (err.response?.status === 401) {
          router.push('/login?redirect=/profile');
        } else {
          setError(err.response?.data?.message || 'Failed to update profile');
          toast.error(err.response?.data?.message || 'Failed to update profile');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [profile, router]
  );

  // Handle email update initiation
  const handleEmailUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      const formErrors = {};
      ['email', 'newEmail'].forEach((key) => {
        Object.assign(formErrors, validateField(key, profile[key]));
      });

      setErrors(formErrors);
      if (Object.keys(formErrors).length > 0) {
        toast.error('Please fix the email errors');
        return;
      }

      setIsSubmitting(true);
      try {
        console.log(`[${new Date().toISOString()}] Client - Initiating email update...`);
        const response = await api.post('/api/users/profile/email', { email: profile.newEmail.trim() });
        console.log(`[${new Date().toISOString()}] Email update initiation response:`, response.data);
        setShowOtpDialog(true);
        setSuccess(response.data.message);
        toast.success(response.data.message);
        setShowEmailDialog(false);
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Email update initiation error:`, err.response || err);
        if (err.response?.status === 401) {
          router.push('/login?redirect=/profile');
        } else {
          setError(err.response?.data?.message || 'Failed to initiate email update');
          toast.error(err.response?.data?.message || 'Failed to initiate email update');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [profile.email, profile.newEmail, router]
  );

  // Handle OTP verification
  const handleOtpSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      const formErrors = validateField('otp', otp);

      setErrors(formErrors);
      if (Object.keys(formErrors).length > 0) {
        toast.error('Please fix the OTP error');
        return;
      }

      setIsSubmitting(true);
      try {
        console.log(`[${new Date().toISOString()}] Client - Verifying OTP...`);
        const response = await api.post('/api/users/profile/verify-email-otp', { otp });
        console.log(`[${new Date().toISOString()}] OTP verification response:`, response.data);
        setProfile((prev) => ({ ...prev, email: response.data.email, newEmail: '' }));
        setShowOtpDialog(false);
        setOtp('');
        setSuccess(response.data.message);
        toast.success(response.data.message);
      } catch (err) {
        console.error(`[${new Date().toISOString()}] OTP verification error:`, err.response || err);
        if (err.response?.status === 401) {
          router.push('/login?redirect=/profile');
        } else {
          setError(err.response?.data?.message || 'Failed to verify OTP');
          toast.error(err.response?.data?.message || 'Failed to verify OTP');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [otp, router]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-xs relative overflow-hidden">
      {/* Floating Gradient Orbs */}
      <div className="fixed -top-16 -left-16 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-10 blur-2xl animate-float-slow z-0" aria-hidden="true" />
      <div className="fixed bottom-4 right-4 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 opacity-10 blur-2xl animate-float-medium z-0" aria-hidden="true" />

      <main className="flex-grow flex items-center justify-center w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full bg-white rounded-xl shadow-sm border border-slate-200 z-10"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-md mr-4">
                <ShieldIcon />
              </div>
              <div>
                <h2 className="text-sm sm:text-base md:text-lg font-bold">Your Profile</h2>
                <p className="mt-1 text-xs text-indigo-100 leading-5">
                  Manage your personal information and account settings
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-xs flex items-center"
                aria-live="polite"
              >
                <AlertIcon />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded text-xs flex items-center"
                aria-live="polite"
              >
                <AlertIcon />
                {success}
              </motion.div>
            )}

            {isLoading ? (
              <div className="text-center py-12">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-5">Loading your profile...</p>
              </div>
            ) : (
              <>
                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-3 mb-6 border-b border-slate-200 pb-2">
                  <Tab 
                    active={activeTab === 'personal'} 
                    onClick={() => setActiveTab('personal')}
                    icon={UserIcon}
                  >
                    Personal Info
                  </Tab>
                  <Tab 
                    active={activeTab === 'security'} 
                    onClick={() => setActiveTab('security')}
                    icon={SecurityIcon}
                  >
                    Email & Security
                  </Tab>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                  {activeTab === 'personal' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-slate-50 p-5 rounded-lg">
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">Personal Information</h3>
                        <p className="text-xs text-slate-600 leading-5"><span className="font-medium">Name:</span> {profile.name || 'Not set'}</p>
                        <p className="text-xs text-slate-600 mt-2 leading-5"><span className="font-medium">Phone:</span> {profile.number || 'Not set'}</p>
                        <p className="text-xs text-slate-600 mt-2 leading-5"><span className="font-medium">Address:</span> {profile.address || 'Not set'}</p>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4">
                          <button
                            onClick={() => setShowEditDialog(true)}
                            className="flex items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                            aria-label="Edit personal information"
                          >
                            <EditIcon />
                            <span className="ml-2">Edit Profile</span>
                          </button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'security' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-slate-50 p-5 rounded-lg">
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">Email & Security</h3>
                        <p className="text-xs text-slate-600 leading-5"><span className="font-medium">Current Email:</span> {profile.email || 'Not set'}</p>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4">
                          <button
                            onClick={() => setShowEmailDialog(true)}
                            className="flex items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                            aria-label="Update email address"
                          >
                            <EditIcon />
                            <span className="ml-2">Update Email</span>
                          </button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Edit Profile Dialog */}
        <Dialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          title="Edit Profile"
        >
          <form className="space-y-4" onSubmit={handleProfileSubmit}>
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative rounded-lg shadow-sm">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={profile.name}
                  onChange={handleChange}
                  ref={nameInputRef}
                  disabled={isSubmitting}
                  className={`block w-full px-3 py-2 border text-xs rounded-lg shadow-sm focus:outline-none transition-all duration-300 ${
                    errors.name
                      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  aria-label="Full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-600 leading-5" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="number" className="block text-xs font-medium text-slate-700 mb-1">
                Phone Number
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon />
                </div>
                <input
                  id="number"
                  name="number"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1234567890"
                  value={profile.number}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`block w-full pl-10 pr-3 py-2 border text-xs rounded-lg shadow-sm focus:outline-none transition-all duration-300 ${
                    errors.number
                      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.number}
                  aria-describedby={errors.number ? 'number-error' : undefined}
                  aria-label="Phone number"
                />
              </div>
              {errors.number && (
                <p className="mt-1 text-xs text-red-600 leading-5" id="number-error">
                  {errors.number}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-xs font-medium text-slate-700 mb-1">
                Address
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 pt-2 flex items-start pointer-events-none">
                  <MapPinIcon />
                </div>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  placeholder="Enter your address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`block w-full pl-10 pr-3 py-2 border text-xs rounded-lg shadow-sm focus:outline-none transition-all duration-300 ${
                    errors.address
                      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.address}
                  aria-describedby={errors.address ? 'address-error' : undefined}
                  aria-label="Address"
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-xs text-red-600 leading-5" id="address-error">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowEditDialog(false)}
                className="flex-1 py-2 px-4 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                aria-label="Cancel profile edit"
              >
                Cancel
              </button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 border border-transparent rounded-lg text-xs font-semibold text-white ${
                    isSubmitting
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  } transition-all duration-300 flex items-center justify-center`}
                  aria-label="Save profile"
                >
                  <SaveIcon />
                  Save Profile
                </button>
              </motion.div>
            </div>
          </form>
        </Dialog>

        {/* Email Update Dialog */}
        <Dialog
          isOpen={showEmailDialog}
          onClose={() => setShowEmailDialog(false)}
          title="Update Email"
        >
          <form className="space-y-4" onSubmit={handleEmailUpdate}>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">
                Current Email Address
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EmailIcon />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={profile.email}
                  disabled
                  className="block w-full pl-10 pr-3 py-2 border text-xs rounded-lg shadow-sm bg-slate-100 cursor-not-allowed"
                  aria-describedby="email-desc"
                  aria-label="Current email address"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500 leading-5" id="email-desc">
                Your current registered email address.
              </p>
            </div>

            <div>
              <label htmlFor="newEmail" className="block text-xs font-medium text-slate-700 mb-1">
                New Email Address
              </label>
              <p className="text-xs text-slate-500 mb-3 leading-5">
                Enter your new email address. We'll send a verification code to confirm.
              </p>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EmailIcon />
                </div>
                <input
                  id="newEmail"
                  name="newEmail"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter new email"
                  value={profile.newEmail}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`block w-full pl-10 pr-3 py-2 border text-xs rounded-lg shadow-sm focus:outline-none transition-all duration-300 ${
                    errors.newEmail
                      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.newEmail}
                  aria-describedby={errors.newEmail ? 'newEmail-error' : undefined}
                  aria-label="New email address"
                />
              </div>
              {errors.newEmail && (
                <p className="mt-1 text-xs text-red-600 leading-5" id="newEmail-error">
                  {errors.newEmail}
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowEmailDialog(false)}
                className="flex-1 py-2 px-4 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                aria-label="Cancel email update"
              >
                Cancel
              </button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 border border-transparent rounded-lg text-xs font-semibold text-white ${
                    isSubmitting
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  } transition-all duration-300 flex items-center justify-center`}
                  aria-label="Update email"
                >
                  <SaveIcon />
                  Update Email
                </button>
              </motion.div>
            </div>
          </form>
        </Dialog>

        {/* OTP Verification Dialog */}
        <Dialog
          isOpen={showOtpDialog}
          onClose={() => setShowOtpDialog(false)}
          title="Verify Email Address"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600 leading-5">
              We've sent a 6-digit verification code to your new email address. Please enter it below to confirm.
            </p>
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-xs font-medium text-slate-700 mb-1">
                  Verification Code
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`block w-full px-3 py-2 border text-xs rounded-lg shadow-sm focus:outline-none transition-all duration-300 ${
                    errors.otp
                      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.otp}
                  aria-describedby={errors.otp ? 'otp-error' : undefined}
                  aria-label="Verification code"
                />
                {errors.otp && (
                  <p className="mt-1 text-xs text-red-600 leading-5" id="otp-error">
                    {errors.otp}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowOtpDialog(false)}
                  className="flex-1 py-2 px-4 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                  aria-label="Cancel OTP verification"
                >
                  Cancel
                </button>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-2 px-4 border border-transparent rounded-lg text-xs font-semibold text-white ${
                      isSubmitting
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    } transition-all duration-300`}
                    aria-label="Verify OTP"
                  >
                    Verify
                  </button>
                </motion.div>
              </div>
            </form>
          </div>
        </Dialog>
      </main>
    </div>
  );
}
