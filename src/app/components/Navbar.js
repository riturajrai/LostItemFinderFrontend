'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  User, 
  Bell, 
  Menu, 
  X, 
  LogOut, 
  Settings, 
  ChevronDown,
  MessageSquare,
  CheckCircle,
  Clock,
  Info,
  Tag,
  MapPin,
  UserPlus,
  ShoppingCart,
  DollarSign
} from 'lucide-react';
import { toast } from 'react-toastify';
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

  // Mock cart item count (replace with actual cart state or API)
  const cartItemCount = 3; // Example: 3 items in cart

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log(`[${new Date().toISOString()}] Navbar: Checking authentication...`);
        console.log(`[${new Date().toISOString()}] Navbar: Cookies:`, document.cookie);
        const response = await fetch('https://lostitemfinder.onrender.com/api/users/verify-token', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Authentication failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Navbar: Auth success:', data);
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        console.error('Navbar: Auth check failed:', error.message);
        setIsAuthenticated(false);
        setUser(null);
        const protectedRoutes = ['/dashboard', '/profile', '/my-qr-tags', '/premium-services', '/explore-local'];
        const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
        if (isProtectedRoute) {
          console.log(`[${new Date().toISOString()}] Navbar: Redirecting to /login from ${pathname}`);
          router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        } else {
          console.log(`[${new Date().toISOString()}] Navbar: No redirect needed for public route ${pathname}`);
        }
      }
    };

    checkAuth();
  }, [router, pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      console.log(`[${new Date().toISOString()}] Navbar: Logging out...`);
      const response = await fetch('https://lostitemfinder.onrender.com/api/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        console.log('Navbar: Logout successful');
        setIsAuthenticated(false);
        setUser(null);
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Navbar: Logout error:', error.message);
      toast.error('Failed to log out. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'text-xs',
      });
    }
  };

  const handleCartClick = () => {
    if (cartItemCount > 0) {
      toast.info(`Viewing cart with ${cartItemCount} item${cartItemCount > 1 ? 's' : ''}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'text-xs',
      });
      router.push('/cart');
    } else {
      toast.info('Your cart is empty', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'text-xs',
      });
    }
  };

  // Navigation items
  const publicNavItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/qr-tags', label: 'Shop', icon: Tag },
    { href: '/contact-us', label: 'Contact Us', icon: MessageSquare },
    { href: '/login', label: 'Login', icon: User },
    { href: '/signup', label: 'Signup', icon: UserPlus },
  ];

  const privateNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/my-qr', label: 'My QR', icon: Tag },
    { href: '/qr-tags', label: 'Shop', icon: Tag },
  ];

  const profileItems = [
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/logout', label: 'Logout', icon: LogOut, isLogout: true },
  ];

  // Mock notification data
  const notifications = [
    { id: 1, type: 'message', text: 'Your lost item has been reported!', time: '10 min ago', read: false },
    { id: 2, type: 'message', text: 'New message from a finder', time: '1 hour ago', read: false },
    { id: 3, type: 'success', text: 'QR Tag activated successfully', time: '2 hours ago', read: true },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-3 w-3 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'reminder':
        return <Clock className="h-3 w-3 text-amber-500" />;
      default:
        return <Bell className="h-3 w-3 text-gray-500" />;
    }
  };

  const navItems = isAuthenticated ? privateNavItems : publicNavItems;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={isAuthenticated ? '/dashboard' : '/'} className="flex items-center">
              <Image
                src={logo}
                alt="Lost & Found Tracker Logo"
                width={40}
                height={40}
                className="rounded-sm mr-2 object-cover"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center ml-8 space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  pathname === item.href 
                    ? 'text-gray-900 bg-gray-100' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-3 w-3 mr-1.5 text-gray-700" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <div className="relative">
              <button
                onClick={handleCartClick}
                className="p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                )}
              </button>
            </div>

            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsProfileOpen(false);
                  }}
                  className="p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <Bell className="h-4 w-4" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute -right-20 mt-2 w-80 rounded-lg shadow-lg bg-white border border-gray-200 focus:outline-none z-50 max-h-[calc(100vh-80px)]">
                    <div className="py-3 px-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="text-xs font-semibold text-gray-900">Notifications</h3>
                      <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-200 last:border-b-0 ${
                              !notification.read ? 'bg-indigo-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 pt-0.5">{getNotificationIcon(notification.type)}</div>
                              <div className="ml-3 flex-1">
                                <p className="text-xs text-gray-800">{notification.text}</p>
                                <p className="text-[11px] text-gray-500">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center">
                          <Bell className="h-6 w-6 text-gray-300 mx-auto" />
                          <p className="mt-2 text-xs text-gray-500">No notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="py-3 px-4 border-t border-gray-200">
                      <Link
                        href="/notifications"
                        className="block text-center text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile dropdown */}
            {isAuthenticated && user && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotificationsOpen(false);
                  }}
                  className="flex items-center rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 font-semibold shadow-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'JD'}
                  </div>
                  <div className="ml-2 hidden md:block">
                    <p className="text-xs font-medium text-gray-900">{user.name || 'John Doe'}</p>
                  </div>
                  <ChevronDown className="ml-1 h-3 w-3 text-gray-700 hidden md:block" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white border border-gray-200 focus:outline-none z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-xs font-semibold text-gray-900">{user.name || 'John Doe'}</p>
                        <p className="text-[11px] text-gray-500">{user.email || 'john.doe@example.com'}</p>
                      </div>
                      {profileItems.map((item) =>
                        item.isLogout ? (
                          <button
                            key={item.label}
                            onClick={handleLogout}
                            className="flex items-center w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
                          >
                            <item.icon className="h-3 w-3 mr-2 text-gray-500" />
                            {item.label}
                          </button>
                        ) : (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
                          >
                            <item.icon className="h-3 w-3 mr-2 text-gray-500" />
                            {item.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="block h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/10 bg-opacity-50 z-[550] lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Sliding Menu */}
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-[560] lg:hidden overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-xs font-bold text-gray-900">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-2.5 rounded-md text-xs font-medium transition-colors duration-200 ${
                    pathname === item.href 
                      ? 'text-indigo-600 bg-indigo-50' 
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2 text-gray-700" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
