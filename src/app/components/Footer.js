import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from './WhatsApp Image 2025-09-02 at 07.23.36_c0a1b5be.jpg';

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 mt-auto">
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
              <span className="text-[14px] font-semibold text-gray-800">Lost & Found Tracker</span>
            </Link>
            <p className="text-xs text-gray-600 mb-4 leading-5">
              Reuniting you with your lost belongings using advanced QR technology and secure communication features.
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
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-gray-800 mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((item, index) => (
                <motion.li
                  key={item.href}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="text-xs text-gray-600 hover:text-[#00BFFF] transition-colors duration-200 flex items-center"
                    aria-label={item.label}
                  >
                    <span className="w-1 h-1 bg-[#00BFFF] rounded-full mr-2"></span>
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
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-3 w-3 text-[#00BFFF] mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-xs text-gray-600">support@lostfoundtracker.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-3 w-3 text-[#00BFFF] mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-xs text-gray-600">+91 123 456 7890</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-3 w-3 text-[#00BFFF] mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-xs text-gray-600">Mumbai, India</span>
              </li>
            </ul>
            <motion.div
              className="mt-6 p-3 bg-white border border-gray-200 rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs text-yellow-600 flex items-center">
                <Heart className="h-3 w-3 text-[yellow] mr-1" />
                <span>Join our community of helpful finders</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-600">
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
                    className="text-xs text-gray-600 hover:text-[#00BFFF] transition-colors duration-200"
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
