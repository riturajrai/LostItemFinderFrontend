
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from './WhatsApp Image 2025-09-02 at 07.23.36_c0a1b5be.jpg';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center mb-4" aria-label="Lost & Found Tracker Home">
              <Image
                src={logo}
                alt="Lost & Found Tracker Logo"
                width={60}
                height={60}
                className="rounded-md mr-2 object-cover"
                priority
              />
              <span className="text-sm font-semibold text-white">Lost & Found Tracker</span>
            </Link>
            <p className="text-xs text-slate-300 mb-4 leading-5">
              Reuniting you with your lost belongings using advanced QR technology and secure communication features.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com"
                className="text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                aria-label="Follow us on Facebook"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                className="text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                aria-label="Follow us on Twitter"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                className="text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                aria-label="Follow us on Instagram"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '/post', label: 'Post Lost/Found Item' },
                { href: '/search', label: 'Search Items' },
                { href: '/qr-code', label: 'QR Tags' },
                { href: '/how-it-works', label: 'How It Works' },
              ].map((item, index) => (
                <motion.li
                  key={item.href}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="text-xs text-slate-300 hover:text-indigo-400 transition-colors duration-200 flex items-center"
                    aria-label={item.label}
                  >
                    <span className="w-1 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mr-2"></span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/blog', label: 'Blog' },
                { href: '/careers', label: 'Careers' },
                { href: '/contact', label: 'Contact' },
              ].map((item, index) => (
                <motion.li
                  key={item.href}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="text-xs text-slate-300 hover:text-indigo-400 transition-colors duration-200 flex items-center"
                    aria-label={item.label}
                  >
                    <span className="w-1 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mr-2"></span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-3 w-3 text-indigo-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-xs text-slate-300">support@lostfoundtracker.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-3 w-3 text-indigo-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-xs text-slate-300">+91 123 456 7890</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-3 w-3 text-indigo-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-xs text-slate-300">Mumbai, India</span>
              </li>
            </ul>
            <motion.div
              className="mt-6 p-3 bg-slate-800 rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs text-slate-300 flex items-center">
                <Heart className="h-3 w-3 text-pink-500 mr-1" />
                <span>Join our community of helpful finders</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-slate-400">
              &copy; 2025 Lost & Found Tracker. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/cookies', label: 'Cookie Policy' },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="text-xs text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                    aria-label={item.label}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
