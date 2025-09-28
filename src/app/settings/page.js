'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { LuUser, LuMail, LuLock, LuBell, LuSave, LuLogOut, LuTriangleAlert } from 'react-icons/lu';

// Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [qrTags, setQrTags] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Fetch user data and QR tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`[${new Date().toISOString()}] SettingsPage: Fetching user data...`);
        const userResponse = await api.get('/api/users/verify-token');
        if (userResponse.status === 200) {
          setUser(userResponse.data.user);
          setName(userResponse.data.user.name || '');
          setEmail(userResponse.data.user.email || '');
          setNotifications(userResponse.data.user.notifications || true);
        }

        console.log(`[${new Date().toISOString()}] SettingsPage: Fetching QR tags...`);
        const tagsResponse = await api.get('/api/users/qr-tags');
        setQrTags(tagsResponse.data.tags || []);

        console.log(`[${new Date().toISOString()}] SettingsPage: Fetching active sessions...`);
        const sessionsResponse = await api.get('/api/users/sessions');
        setSessions(sessionsResponse.data.sessions || []);
      } catch (err) {
        console.error('SettingsPage: Error fetching data:', err.message);
        if (err.response?.status === 401) {
          router.push('/login?redirect=/settings');
        } else {
          setError('Failed to load settings. Please try again.');
          toast.error('Failed to load settings');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Handle settings submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const formErrors = {};

    if (!name.trim()) formErrors.name = 'Name is required';
    if (!email.trim()) formErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) formErrors.email = 'Invalid email format';
    if (password && password.length < 8) formErrors.password = 'Password must be at least 8 characters';
    if (password && password !== confirmPassword) formErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(formErrors).length > 0) {
      setError('Please fix the form errors');
      toast.error('Please fix the form errors');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.put('/api/users/update', {
        name: name.trim(),
        email: email.trim(),
        password: password || undefined,
        notifications,
      });
      setSuccess('Settings updated successfully!');
      toast.success('Settings updated successfully!');
      console.log(`[${new Date().toISOString()}] SettingsPage: Settings updated`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update settings');
      toast.error(err.response?.data?.message || 'Failed to update settings');
      console.error('SettingsPage: Update error:', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle QR tag toggle
  const handleQrTagToggle = async (tagId, enabled) => {
    setIsSubmitting(true);
    try {
      console.log(`[${new Date().toISOString()}] SettingsPage: Toggling QR tag ${tagId}...`);
      const response = await api.patch(`/api/users/qr-tags/${tagId}`, { enabled });
      setQrTags((prev) =>
        prev.map((tag) => (tag.id === tagId ? { ...tag, enabled: response.data.tag.enabled } : tag))
      );
      toast.success(`QR tag ${enabled ? 'enabled' : 'disabled'} successfully!`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update QR tag');
      toast.error(err.response?.data?.message || 'Failed to update QR tag');
      console.error('SettingsPage: QR tag update error:', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle session termination
  const handleTerminateSession = async (sessionId) => {
    setIsSubmitting(true);
    try {
      console.log(`[${new Date().toISOString()}] SettingsPage: Terminating session ${sessionId}...`);
      await api.delete(`/api/users/sessions/${sessionId}`);
      setSessions((prev) => prev.filter((session) => session.id !== sessionId));
      toast.success('Session terminated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to terminate session');
      toast.error(err.response?.data?.message || 'Failed to terminate session');
      console.error('SettingsPage: Session termination error:', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate QR code URL
  const settingsQrUrl = user ? `${window.location.origin}/settings?userId=${encodeURIComponent(user.email)}` : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Account Settings</h2>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm flex items-center">
            <LuTriangleAlert size={20} className="mr-2" />
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg text-sm flex items-center">
            <LuTriangleAlert size={20} className="mr-2" />
            {success}
          </div>
        )}
        {isLoading ? (
          <div className="text-center py-12">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-3 text-gray-600 text-sm">Loading settings...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Settings Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1 flex items-center">
                  <LuUser size={20} className="text-gray-400 mr-2" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 flex items-center">
                  <LuMail size={20} className="text-gray-400 mr-2" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="john.doe@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 flex items-center">
                  <LuLock size={20} className="text-gray-400 mr-2" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 flex items-center">
                  <LuLock size={20} className="text-gray-400 mr-2" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notifications
                </label>
                <div className="mt-1 flex items-center">
                  <LuBell size={20} className="text-gray-400 mr-2" />
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      disabled={isSubmitting}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 disabled:cursor-not-allowed"
                    />
                    <span className="ml-2 text-sm text-gray-600">Enable email notifications</span>
                  </label>
                </div>
              </div>
              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isSubmitting
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  } transition-all duration-300`}
                >
                  <LuSave size={20} className="mr-2" />
                  Save Settings
                </motion.button>
              </div>
            </form>

            {/* QR Tags and Sessions */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Tags</h3>
                {qrTags.length === 0 ? (
                  <p className="text-sm text-gray-600">No QR tags available.</p>
                ) : (
                  <ul className="space-y-3">
                    {qrTags.map((tag) => (
                      <li key={tag.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{tag.name}</p>
                          <p className="text-sm text-gray-600">{tag.url}</p>
                        </div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={tag.enabled}
                            onChange={() => handleQrTagToggle(tag.id, !tag.enabled)}
                            disabled={isSubmitting}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 disabled:cursor-not-allowed"
                          />
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
                {sessions.length === 0 ? (
                  <p className="text-sm text-gray-600">No active sessions.</p>
                ) : (
                  <ul className="space-y-3">
                    {sessions.map((session) => (
                      <li key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{session.device}</p>
                          <p className="text-sm text-gray-600">Last active: {new Date(session.lastActive).toLocaleString()}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTerminateSession(session.id)}
                          disabled={isSubmitting}
                          className="py-1 px-3 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed"
                        >
                          Terminate
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings QR Code</h3>
                <p className="text-sm text-gray-600 mb-4">Scan this QR code to share your settings:</p>
                <div className="flex justify-center">
                  <QRCodeSVG
                    value={settingsQrUrl}
                    size={120}
                    fgColor="#4F46E5"
                    bgColor="#F3E8FF"
                    level="H"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}