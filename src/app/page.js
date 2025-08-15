import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Lost & Found Logo" width={40} height={40} />
            <h1 className="ml-3 text-2xl font-bold text-gray-800">Lost & Found Tracker</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/post" className="text-gray-600 hover:text-blue-600">Post Lost/Found</Link>
            <Link href="/search" className="text-gray-600 hover:text-blue-600">Search</Link>
            <Link href="/qr-code" className="text-gray-600 hover:text-blue-600">QR Tags</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
          </nav>
          <div className="md:hidden">
            <button className="text-gray-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Reunite with Your Lost Belongings</h2>
          <p className="text-lg md:text-xl mb-8">Post, track, and recover lost items or help others with our QR code-based platform.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/post" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Report Lost/Found
            </Link>
            <Link href="/qr-code" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
              Get QR Tags
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image src="/post-icon.png" alt="Post Icon" width={48} height={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Post Lost/Found</h3>
              <p className="text-gray-600">Easily create posts with images and location details to report lost or found items.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image src="/qr-icon.png" alt="QR Icon" width={48} height={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">QR Code Tags</h3>
              <p className="text-gray-600">Print custom QR code stickers for your belongings to connect finders with owners.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image src="/filter-icon.png" alt="Filter Icon" width={48} height={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">City-Wise Filters</h3>
              <p className="text-gray-600">Search for lost or found items by city and category for quick results.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image src="/anonymous-icon.png" alt="Anonymous Icon" width={48} height={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Anonymous Contact</h3>
              <p className="text-gray-600">Communicate safely with finders or owners without revealing personal details.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">01</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Report an Item</h3>
              <p className="text-gray-600">Post details of lost or found items with images and location for quick identification.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">02</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Use QR Tags</h3>
              <p className="text-gray-600">Attach QR code stickers to your belongings for easy contact if they’re found.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">03</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect Safely</h3>
              <p className="text-gray-600">Use our anonymous contact system to coordinate recovery securely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find or Recover Your Items?</h2>
          <p className="text-lg mb-8">Join our community and make lost and found easier with QR tags and secure communication.</p>
          <Link href="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Lost & Found Tracker</h3>
              <p className="text-gray-400">Helping you reunite with your lost belongings using QR technology.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/post" className="text-gray-400 hover:text-white">Post Lost/Found</Link></li>
                <li><Link href="/qr-code" className="text-gray-400 hover:text-white">QR Tags</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">Email: support@lostfoundtracker.com</p>
              <p className="text-gray-400">Phone: +91 123 456 7890</p>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            &copy; 2025 Lost & Found Tracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}