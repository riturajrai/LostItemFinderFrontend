
'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import dynamic from 'next/dynamic';
import FocusLock from 'react-focus-lock';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Validation Hook
const useFormValidation = () => {
  const validateField = useCallback((name, value) => {
    const errors = {};
    if (name === 'name' && !value.trim()) {
      errors.name = 'Name is required';
    }
    if (name === 'email') {
      if (!value.trim()) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) errors.email = 'Please enter a valid email address';
    }
    if (name === 'message' && !value.trim()) {
      errors.message = 'Message is required';
    }
    return errors;
  }, []);
  return { validateField };
};

// Client-only Contact Form Component
const ContactForm = dynamic(
  () =>
    Promise.resolve(function ContactForm() {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
      const [errors, setErrors] = useState({});
      const [isLoading, setIsLoading] = useState(false);
      const [successMessage, setSuccessMessage] = useState('');
      const nameInputRef = useRef(null);
      const { validateField } = useFormValidation();

      const handleChange = useCallback(
        (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
          setErrors((prev) => ({ ...prev, ...validateField(name, value) }));
          setSuccessMessage('');
        },
        [validateField]
      );

      const handleSubmit = useCallback(
        async (e) => {
          e.preventDefault();
          setSuccessMessage('');
          const formErrors = {};
          Object.keys(formData).forEach((key) => {
            Object.assign(formErrors, validateField(key, formData[key]));
          });
          setErrors(formErrors);
          if (Object.keys(formErrors).length > 0) {
            toast.error('Please fix the form errors');
            return;
          }

          setIsLoading(true);
          try {
            await api.post('/api/contact', {
              name: formData.name.trim(),
              email: formData.email.trim(),
              message: formData.message.trim(),
            });
            console.log(`[${new Date().toISOString()}] Contact - Form submitted:`, formData);
            setSuccessMessage('Your message has been sent successfully!');
            toast.success('Message sent successfully');
            setFormData({ name: '', email: '', message: '' });
            setErrors({});
            nameInputRef.current?.focus();
          } catch (error) {
            let message = error.response?.data?.message || 'Failed to send message. Please try again.';
            if (error.code === 'ERR_NETWORK') {
              message = 'Network error. Please check your internet connection.';
            } else if (error.code === 'ECONNABORTED') {
              message = 'Request timed out. Please try again later.';
            }
            console.error(`[${new Date().toISOString()}] Contact error:`, error.response || error);
            toast.error(message);
          } finally {
            setIsLoading(false);
          }
        },
        [formData, validateField]
      );

      return (
        <FocusLock>
          <div className="bg-white py-8 px-6 rounded-md border border-gray-200">
            {successMessage && (
              <div
                className="mb-4 p-3 bg-green-50 border-l-2 border-green-500 text-green-600 rounded-md text-xs"
                aria-live="polite"
              >
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-1">
                  Name
                </label>
                <div className="relative rounded-md">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    ref={nameInputRef}
                    disabled={isLoading}
                    className={`block w-full px-3 py-2 border text-xs rounded-md focus:outline-none focus:ring-[#00BFFF] focus:border-[#00BFFF] ${
                      errors.name ? 'border-red-300 text-red-600 placeholder-red-300' : 'border-gray-200'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-label="Your name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600" id="name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">
                  Email address
                </label>
                <div className="relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`block w-full pl-10 pr-3 py-2 border text-xs rounded-md focus:outline-none focus:ring-[#00BFFF] focus:border-[#00BFFF] ${
                      errors.email ? 'border-red-300 text-red-600 placeholder-red-300' : 'border-gray-200'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
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
                <label htmlFor="message" className="block text-xs font-medium text-gray-600 mb-1">
                  Message
                </label>
                <div className="relative rounded-md">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`block w-full px-3 py-2 border text-xs rounded-md focus:outline-none focus:ring-[#00BFFF] focus:border-[#00BFFF] ${
                      errors.message ? 'border-red-300 text-red-600 placeholder-red-300' : 'border-gray-200'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-label="Your message"
                  />
                </div>
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600" id="message-error">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md text-xs font-medium text-white ${
                  isLoading ? 'bg-[#00BFFF]/50 cursor-not-allowed' : 'bg-[#00BFFF] hover:bg-[#00BFFF]/80 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]'
                }`}
                aria-label="Send message"
              >
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </FocusLock>
      );
    }),
  { ssr: false }
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-xs">
      <main className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-[14px] font-medium text-gray-800">Contact Us</h2>
          <p className="mt-2 text-xs text-gray-600 max-w-md mx-auto leading-5">
            We’re here to assist you with all your needs at Lost & Found Tracker. Whether you’ve lost an item, found something that belongs to someone else, or have questions about our QR-based tracking system, our dedicated team is ready to help. Reach out to us for support, provide feedback on how we can improve, or explore partnership opportunities to expand our mission of reuniting people with their belongings. Fill out the form below, and we’ll get back to you as soon as possible!
          </p>
        </motion.div>
        <ContactForm />
      </main>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-gray-800 mb-4">Contact Information</h3>
            <p className="text-xs text-gray-600 mb-4 leading-5">
              Our team is available to assist you with any inquiries or support needs. Contact us through your preferred method below, and we’ll respond promptly to help you resolve issues or answer questions about our platform.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-3 w-3 text-[#00BFFF] mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-xs text-gray-600">
                  Email us at <a href="mailto:support@lostfoundtracker.com" className="hover:text-[#00BFFF] transition-colors duration-200">support@lostfoundtracker.com</a> for general inquiries, technical support, or feedback about our services.
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="h-3 w-3 text-[#00BFFF] mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-xs text-gray-600">
                  Call us at <a href="tel:+911234567890" className="hover:text-[#00BFFF] transition-colors duration-200">+91 123 456 7890</a> for urgent assistance or to speak directly with our support team. Available Monday to Friday, 9 AM to 6 PM IST.
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-3 w-3 text-[#00BFFF] mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-xs text-gray-600">
                  Visit our office at Mumbai, India, for in-person support or to learn more about our QR technology. Please schedule an appointment via email or phone.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-gray-800 mb-4">Follow Us</h3>
            <p className="text-xs text-gray-600 mb-4 leading-5">
              Join our vibrant community on social media to stay updated on the latest news, tips for recovering lost items, and heartwarming success stories from users of Lost & Found Tracker.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com"
                className="text-gray-400 hover:text-[#00BFFF] transition-colors duration-200"
                aria-label="Follow us on Facebook"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                className="text-gray-400 hover:text-[#00BFFF] transition-colors duration-200"
                aria-label="Follow us on Twitter"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                className="text-gray-400 hover:text-[#00BFFF] transition-colors duration-200"
                aria-label="Follow us on Instagram"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
