'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { 
  Home, User, Bell, Menu, X, LogOut, Settings, ChevronDown,
  MessageSquare, CheckCircle, Clock, Info, Tag, ShoppingCart, UserPlus
} from 'lucide-react';
import logo from './ChatGPT Image Sep 2, 2025, 07_41_58 AM.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  // Cart count (replace with API)
  const cartItemCount = 3;

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('https://lostitemfinder.onrender.com/api/users/verify-token', {
          method: 'GET',
          credentials: 'include', // important for HttpOnly cookie
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Unauthorized');

        const data = await res.json();
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);

        const protectedRoutes = ['/dashboard', '/profile', '/my-qr-tags', '/premium-services', '/explore-local'];
        if (protectedRoutes.some(route => pathname.startsWith(route))) {
          router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) setIsNotificationsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('https://lostitemfinder.onrender.com/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        setIsAuthenticated(false);
        setUser(null);
        router.push('/');
      } else throw new Error('Logout failed');
    } catch (err) {
      toast.error('Failed to log out. Try again.');
    }
  };

  const handleCartClick = () => {
    if (cartItemCount > 0) router.push('/cart');
    else toast.info('Your cart is empty');
  };

  const navItems = isAuthenticated
    ? [
        { href: '/dashboard', label: 'Dashboard', icon: Home },
        { href: '/my-qr', label: 'My QR', icon: Tag },
        { href: '/qr-tags', label: 'Shop', icon: Tag },
      ]
    : [
        { href: '/', label: 'Home', icon: Home },
        { href: '/about', label: 'About Us', icon: Info },
        { href: '/qr-tags', label: 'Shop', icon: Tag },
        { href: '/contact-us', label: 'Contact Us', icon: MessageSquare },
        { href: '/login', label: 'Login', icon: User },
        { href: '/signup', label: 'Signup', icon: UserPlus },
      ];

  const profileItems = [
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/logout', label: 'Logout', icon: LogOut, isLogout: true },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href={isAuthenticated ? '/dashboard' : '/'} className="flex items-center">
          <Image src={logo} alt="Logo" width={40} height={40} className="rounded-sm mr-2 object-cover" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center ml-8 space-x-2">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                pathname === item.href ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-3 w-3 mr-1.5 text-gray-700" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button onClick={handleCartClick} className="relative p-2 rounded-full hover:bg-gray-100">
            <ShoppingCart className="h-4 w-4" />
            {cartItemCount > 0 && <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>}
          </button>

          {/* Profile dropdown */}
          {isAuthenticated && user && (
            <div className="relative" ref={profileRef}>
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center rounded-full hover:bg-gray-100">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 font-semibold shadow-sm">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <ChevronDown className="ml-1 h-3 w-3 text-gray-700 hidden md:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white border border-gray-200 z-50">
                  {profileItems.map(item =>
                    item.isLogout ? (
                      <button key={item.label} onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-indigo-50">
                        <item.icon className="h-3 w-3 mr-2" />
                        {item.label}
                      </button>
                    ) : (
                      <Link key={item.href} href={item.href} className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-indigo-50">
                        <item.icon className="h-3 w-3 mr-2" />
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-full hover:bg-gray-100">
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/10" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-xs font-bold text-gray-900">Menu</span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-2.5 rounded-md text-xs font-medium ${
                    pathname === item.href ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
