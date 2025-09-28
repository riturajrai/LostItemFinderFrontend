'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingCart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

// Mock cart data (replace with API fetch in production)
const initialCartItems = [
  {
    id: 1,
    name: 'Premium QR Tag Sticker',
    price: 299,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'QR Keychain',
    price: 499,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop',
  },
];

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder for fetching cart data from API
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        // Uncomment to fetch from API
        // const response = await api.get('/api/cart');
        // setCartItems(response.data.items);
      } catch (error) {
        console.error(`[${new Date().toISOString()}] Cart fetch error:`, error);
        // Optionally use toast for error notification
      } finally {
        setIsLoading(false);
      }
    };
    // fetchCart(); // Uncomment to enable API call
  }, []);

  // Update quantity
  const updateQuantity = useCallback(async (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    // Placeholder for API update
    try {
      // await api.put(`/api/cart/${id}`, { quantity: newQuantity });
      console.log(`[${new Date().toISOString()}] Cart - Updated quantity for item ${id}:`, newQuantity);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Cart update error:`, error);
    }
  }, []);

  // Remove item
  const removeItem = useCallback(async (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    // Placeholder for API delete
    try {
      // await api.delete(`/api/cart/${id}`);
      console.log(`[${new Date().toISOString()}] Cart - Removed item ${id}`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Cart remove error:`, error);
    }
  }, []);

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 text-xs">
      {/* Floating Gradient Orbs */}
      <div className="fixed -top-16 -left-16 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-10 blur-2xl animate-float-slow z-0" />
      <div className="fixed bottom-4 right-4 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 opacity-10 blur-2xl animate-float-medium z-0" />

      <main className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900">Your Cart</h2>
          <p className="mt-2 text-xs text-slate-600 leading-5">
            Review your items before proceeding to checkout
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8"
        >
          {isLoading ? (
            <div className="text-center text-xs text-slate-600">Loading cart...</div>
          ) : cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-4">Your cart is empty</p>
              <Link
                href="/qr-code"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Shop QR Tags"
              >
                Shop QR Tags
                <ChevronRight className="ml-2 h-3 w-3" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-xs font-semibold text-slate-900">{item.name}</h3>
                        <p className="text-xs text-slate-600">₹{item.price.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isLoading}
                            className="p-1 rounded-full bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="h-3 w-3 text-slate-600" />
                          </motion.button>
                          <span className="mx-3 text-xs text-slate-900">{item.quantity}</span>
                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="p-1 rounded-full bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="h-3 w-3 text-slate-600" />
                          </motion.button>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => removeItem(item.id)}
                        disabled={isLoading}
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-600">Subtotal</span>
                      <span className="text-xs font-semibold text-slate-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-600">Shipping</span>
                      <span className="text-xs text-slate-600">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-xs font-semibold text-slate-900">Total</span>
                        <span className="text-xs font-semibold text-slate-900">₹{subtotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6"
                  >
                    <Link
                      href="/checkout"
                      className="flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      aria-label="Proceed to checkout"
                    >
                      Proceed to Checkout
                      <ChevronRight className="ml-2 h-3 w-3" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
