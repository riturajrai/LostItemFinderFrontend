
'use client';

import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

// Custom SVG Icons (responsive sizes)
const PremiumIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7m-7-4a9 9 0 100 18 9 9 0 000-18zm0 2a7 7 0 110 14 7 7 0 010-14z" />
  </svg>
);

const StickerIcon = () => (
  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const UpgradeIcon = () => (
  <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

export default function PremiumServicesPage() {
  const handleCtaClick = useCallback((service) => {
    toast.success(`Exploring ${service} premium service!`);
  }, []);

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8 text-[10px] lg:text-xs relative overflow-hidden">
      {/* Floating Gradient Orbs */}
      <div className="fixed -top-16 -left-16 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-10 blur-2xl animate-float-slow z-0" aria-hidden="true" />
      <div className="fixed bottom-4 right-4 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 opacity-10 blur-2xl animate-float-medium z-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white rounded-lg shadow-sm mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-md mr-4">
              <PremiumIcon />
            </div>
            <div>
              <h1 className="text-sm lg:text-base font-bold leading-5 lg:leading-6">Premium Services</h1>
              <p className="mt-1 text-[10px] lg:text-xs text-indigo-100 leading-4 lg:leading-5">
                Unlock exclusive features and enhance your experience
              </p>
            </div>
          </div>
        </div>

        {/* Service Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* SuperGrok Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 bg-white rounded-lg shadow-sm border border-slate-200"
          >
            <h2 className="text-[10px] lg:text-sm font-semibold text-slate-900 mb-2 leading-5">SuperGrok Subscription</h2>
            <p className="text-[10px] lg:text-xs text-slate-600 leading-4 lg:leading-5 mb-4">
              Get higher usage quotas and priority access to Grok's advanced features for a seamless AI experience.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="https://x.ai/grok"
                onClick={() => handleCtaClick('SuperGrok')}
                className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-[10px] lg:text-xs font-semibold rounded-lg shadow-sm hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                aria-label="Learn more about SuperGrok subscription"
              >
                <UpgradeIcon />
                Learn More
              </a>
            </motion.div>
          </motion.div>

          {/* QR Stickers Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-5 bg-white rounded-lg shadow-sm border border-slate-200"
          >
            <h2 className="text-[10px] lg:text-sm font-semibold text-slate-900 mb-2 leading-5">Custom QR Stickers</h2>
            <p className="text-[10px] lg:text-xs text-slate-600 leading-4 lg:leading-5 mb-4">
              Order durable, custom QR stickers to track and recover your items with ease.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="/order-qr"
                onClick={() => handleCtaClick('QR Stickers')}
                className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-[10px] lg:text-xs font-semibold rounded-lg shadow-sm hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                aria-label="Shop custom QR stickers"
              >
                <StickerIcon />
                Shop Now
              </a>
            </motion.div>
          </motion.div>

          {/* Future Service Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="p-5 bg-white rounded-lg shadow-sm border border-slate-200"
          >
            <h2 className="text-[10px] lg:text-sm font-semibold text-slate-900 mb-2 leading-5">Coming Soon</h2>
            <p className="text-[10px] lg:text-xs text-slate-600 leading-4 lg:leading-5 mb-4">
              Stay tuned for more premium services to enhance your experience!
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                disabled
                className="flex items-center justify-center py-2 px-4 bg-gray-300 text-gray-500 text-[10px] lg:text-xs font-semibold rounded-lg shadow-sm cursor-not-allowed"
                aria-label="Coming soon placeholder"
              >
                <UpgradeIcon />
                Coming Soon
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <div className="p-5 bg-indigo-50 rounded-lg shadow-sm text-center">
          <h2 className="text-[10px] lg:text-sm font-semibold text-slate-900 mb-2 leading-5">Why Go Premium?</h2>
          <p className="text-[10px] lg:text-xs text-slate-600 leading-4 lg:leading-5 mb-4">
            Unlock advanced features, priority support, and exclusive benefits to make the most of our platform.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <a
              href="https://x.ai/grok"
              onClick={() => handleCtaClick('Premium Services')}
              className="py-2 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-[10px] lg:text-xs font-semibold rounded-lg shadow-sm hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              aria-label="Explore all premium services"
            >
              Explore Now
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
