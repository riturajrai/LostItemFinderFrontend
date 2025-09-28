
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';
import ProtectedLayout from '../components/ProtectedLayout';

// Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Custom SVG Icons (adjusted for 12px base)
const PlusIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1m-17 4h14m-5 4h5m-9 4h1" />
  </svg>
);

const QRIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m-3 4h3M6 12H4v2m0-6h2m-2 0V6m6 6v6m2-10V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v2M4 4a1 1 0 011-1h2a1 1 0 011 1v2m0 14v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2m14-2v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
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
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900 bg-opacity-60 transition-opacity"
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

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Documents',
    city: '',
    image: null,
    isAnonymous: false,
    isLost: true,
  });
  const [qrCode, setQrCode] = useState('');
  const [filters, setFilters] = useState({ city: '', category: '' });
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Cities and categories for filtering
  const cities = ['All', 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const categories = ['All', 'Documents', 'Bags', 'Pets', 'Phones', 'Others'];

  // Validate form inputs
  const validateField = useCallback((name, value) => {
    const errors = {};
    if (name === 'title' && !value.trim()) {
      errors.title = 'Title is required';
    }
    if (name === 'description' && !value.trim()) {
      errors.description = 'Description is required';
    }
    if (name === 'city' && !value.trim()) {
      errors.city = 'City is required';
    }
    return errors;
  }, []);

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/api/posts', {
          params: { city: filters.city, category: filters.category },
        });
        setPosts(response.data.posts || []);
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Fetch posts error:`, err);
        toast.error('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [filters]);

  // Handle form input changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, ...validateField(name, value) }));
  }, [validateField]);

  // Handle filter changes
  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === 'All' ? '' : value,
    }));
  }, []);

  // Handle post submission
  const handlePostSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrors({});
    const formErrors = {};
    ['title', 'description', 'city'].forEach((key) => {
      Object.assign(formErrors, validateField(key, formData[key]));
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error('Please fix the form errors');
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('isAnonymous', formData.isAnonymous);
      formDataToSend.append('isLost', formData.isLost);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await api.post('/api/posts', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPosts((prev) => [response.data.post, ...prev]);
      setFormData({ title: '', description: '', category: 'Documents', city: '', image: null, isAnonymous: false, isLost: true });
      setShowPostDialog(false);
      toast.success('Post created successfully');
    } catch (err) {
      console.error(`[${new Date().toISOString()}] Post creation error:`, err);
      toast.error(err.response?.data?.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // Generate QR code
  const handleGenerateQR = useCallback(async (postId) => {
    try {
      const response = await api.post('/api/qr/generate', { postId });
      const qrUrl = await QRCode.toDataURL(response.data.qrLink);
      setQrCode(qrUrl);
      setShowQrDialog(true);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] QR code generation error:`, err);
      toast.error('Failed to generate QR code');
    }
  }, []);

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8 text-xs relative overflow-hidden">
        {/* Floating Gradient Orbs */}
        <div className="fixed -top-16 -left-16 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-10 blur-2xl animate-float-slow z-0" aria-hidden="true" />
        <div className="fixed bottom-4 right-4 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 opacity-10 blur-2xl animate-float-medium z-0" aria-hidden="true" />

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-base sm:text-lg font-bold text-slate-900">Lost & Found Dashboard</h1>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={() => setShowPostDialog(true)}
                className="flex items-center py-2 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                aria-label="Create new lost or found post"
              >
                <PlusIcon />
                Create New Post
              </button>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label htmlFor="city" className="block text-xs font-medium text-slate-700 mb-1">City</label>
              <select
                id="city"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="block w-40 px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Filter by city"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-xs font-medium text-slate-700 mb-1">Category</label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="block w-40 px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Filter by category"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-3 text-xs text-slate-600 leading-5">Loading posts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.length === 0 ? (
                <p className="text-xs text-slate-600 col-span-full text-center leading-5">No posts found. Create a new post to get started!</p>
              ) : (
                posts.map((post) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-5 bg-white rounded-lg shadow-sm border ${post.isPremium ? 'border-indigo-200 bg-indigo-50' : 'border-slate-200'}`}
                  >
                    {post.isPremium && (
                      <span className="inline-block px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full mb-2">Premium</span>
                    )}
                    <h3 className="text-sm font-semibold text-slate-900">{post.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-5">{post.description}</p>
                    <p className="text-xs text-slate-500 mt-2 leading-5"><span className="font-medium">Category:</span> {post.category}</p>
                    <p className="text-xs text-slate-500 leading-5"><span className="font-medium">City:</span> {post.city}</p>
                    <p className="text-xs text-slate-500 leading-5"><span className="font-medium">Status:</span> {post.isLost ? 'Lost' : 'Found'}</p>
                    {post.image && (
                      <img src={post.image} alt={post.title} className="mt-3 w-full h-32 object-cover rounded-lg" />
                    )}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4">
                      <button
                        onClick={() => handleGenerateQR(post._id)}
                        className="flex items-center py-2 px-4 bg-indigo-600 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                        aria-label={`Generate QR code for ${post.title}`}
                      >
                        <QRIcon />
                        Generate QR Code
                      </button>
                    </motion.div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Monetization: Ad Placeholder */}
          <div className="mt-8 p-5 bg-slate-100 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Sponsored</h3>
            <p className="text-xs text-slate-600 leading-5">Ad: Visit PetShop XYZ for premium pet supplies!</p>
            <a href="#" className="text-xs text-indigo-600 hover:text-indigo-500 mt-2 inline-block" aria-label="Learn more about PetShop XYZ">Learn More</a>
          </div>

          {/* Create Post Dialog */}
          <Dialog
            isOpen={showPostDialog}
            onClose={() => setShowPostDialog(false)}
            title="Create New Post"
          >
            <form className="space-y-4" onSubmit={handlePostSubmit}>
              <div>
                <label htmlFor="title" className="block text-xs font-medium text-slate-700 mb-1">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter item title"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`block w-full px-3 py-2 border text-xs rounded-lg shadow-sm focus:outline-none transition-all duration-300 ${
                    errors.title
                      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.title}
                  aria-describedby={errors.title ? 'title-error' : undefined}
                  aria-label="Item title"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-600 leading-5" id="title-error">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Describe the item"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`block w-full px-3 py-2 border text-xs rounded-lg shadow-sm focus:outline-none transition-all duration-300 ${
                    errors.description
                      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.description}
                  aria-describedby={errors.description ? 'description-error' : undefined}
                  aria-label="Item description"
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-600 leading-5" id="description-error">{errors.description}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-xs font-medium text-slate-700 mb-1">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="block w-full px-3 py-2 border text-xs rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  aria-label="Select item category"
                >
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="city" className="block text-xs font-medium text-slate-700 mb-1">City</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LocationIcon />
                  </div>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`block w-full pl-10 pr-3 py-2 border text-xs rounded-lg shadow-sm focus:outline-none transition-all duration-300 ${
                      errors.city
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                    } disabled:bg-slate-100 disabled:cursor-not-allowed`}
                    aria-invalid={!!errors.city}
                    aria-describedby={errors.city ? 'city-error' : undefined}
                    aria-label="City of lost or found item"
                  />
                </div>
                {errors.city && (
                  <p className="mt-1 text-xs text-red-600 leading-5" id="city-error">{errors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="image" className="block text-xs font-medium text-slate-700 mb-1">Image (Optional)</label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  aria-label="Upload item image"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="isAnonymous"
                  name="isAnonymous"
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                  aria-label="Post anonymously"
                />
                <label htmlFor="isAnonymous" className="ml-2 text-xs text-slate-700 leading-5">
                  Post anonymously (hide contact details)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="isLost"
                  name="isLost"
                  type="checkbox"
                  checked={formData.isLost}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                  aria-label="Mark as lost"
                />
                <label htmlFor="isLost" className="ml-2 text-xs text-slate-700 leading-5">
                  Mark as Lost (uncheck for Found)
                </label>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPostDialog(false)}
                  className="flex-1 py-2 px-4 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                  aria-label="Cancel post creation"
                >
                  Cancel
                </button>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 border border-transparent rounded-lg text-xs font-semibold text-white flex items-center justify-center ${
                      isSubmitting
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    } transition-all duration-300`}
                    aria-label="Create new post"
                  >
                    <PlusIcon />
                    Create Post
                  </button>
                </motion.div>
              </div>
            </form>
          </Dialog>

          {/* QR Code Dialog */}
          <Dialog
            isOpen={showQrDialog}
            onClose={() => setShowQrDialog(false)}
            title="Your QR Code"
          >
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-5">
                Scan this QR code to view the item details or print it for your QR sticker.
              </p>
              {qrCode && (
                <img src={qrCode} alt="QR Code for item" className="w-48 h-48 mx-auto" />
              )}
              <div className="flex justify-center">
                <a
                  href={qrCode}
                  download="qr-code.png"
                  className="py-2 px-4 bg-indigo-600 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                  aria-label="Download QR code"
                >
                  Download QR Code
                </a>
              </div>
            </div>
          </Dialog>

          {/* Monetization: QR Tag Sales Placeholder */}
          <div className="max-w-7xl mx-auto mt-8">
            <div className="p-5 bg-indigo-50 rounded-lg shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Order QR Stickers</h3>
              <p className="text-xs text-slate-600 leading-5">Purchase custom QR stickers for your items to ensure easy recovery!</p>
              <a href="/order-qr" className="text-xs text-indigo-600 hover:text-indigo-500 mt-2 inline-block" aria-label="Shop QR stickers">Shop Now</a>
            </div>
          </div>
        </div>
        </div>   {/* max-w-7xl mx-auto */}
      </ProtectedLayout>
  );
}
