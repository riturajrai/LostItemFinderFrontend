'use client';
import React from "react";
import Link from "next/link";
import { Scan, Tag, Search, Lock, Check, Shield, Users, MapPin, Quote } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-xs">
      <main className="flex-grow">
       {/* Hero Section */}
<section className="bg-sky-600 text-white border-b border-gray-200">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center rounded-full bg-yellow-300/20 px-3 py-1 text-xs font-medium text-yellow-400 border border-yellow-300/30 mb-4">
        <Shield className="w-4 h-4 mr-2" aria-hidden="true" />
        Trusted by thousands worldwide
      </div>
      <h1 className="text-sm sm:text-base font-semibold text-gray-100 mb-4">
        Never Lose Your <span className="text-pink-300">Valuables</span> Again
      </h1>
      <p className="text-xs sm:text-sm text-gray-200 max-w-2xl mx-auto mb-6">
        Our secure platform uses QR sticker technology and community collaboration to ensure your lost items are found quickly and safely.
      </p>
     <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-3">
  <Link
    href="/how-it-works"
    aria-label="Learn how our QR sticker system works"
    className="inline-flex items-center px-4 py-2 bg-white text-black border rounded-md font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
  >
    How It Works
    <svg
      className="ml-2 h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </Link>

  <Link
    href="/demo"
    aria-label="Watch a demo of our QR sticker platform"
    className="inline-flex items-center px-4 py-2 bg-white text-black border rounded-md font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
  >
    <svg
      className="mr-2 h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
    Watch Demo
  </Link>
</div>

    </div>
    {/* Stats Bar */}
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-100">15,000+</span>
        <span className="text-xs text-gray-200">Items Recovered</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-100">85+</span>
        <span className="text-xs text-gray-200">Cities Served</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-100">98.7%</span>
        <span className="text-xs text-gray-200">Success Rate</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-100">24/7</span>
        <span className="text-xs text-gray-200">Support</span>
      </div>
    </div>
  </div>
</section>
        {/* Why QR Stickers Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-4">Why Use Our QR Stickers?</h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
                Our QR stickers are the ultimate solution for protecting and recovering your valuables with cutting-edge technology.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Tag className="w-5 h-5 text-[#00BFFF]" aria-hidden="true" />}
                title="Unique QR Identification"
                description="Each QR sticker carries a unique code linked to your account, ensuring instant identification of your lost items."
              />
              <FeatureCard
                icon={<Search className="w-5 h-5 text-[#00BFFF]" aria-hidden="true" />}
                title="Instant Searchability"
                description="Scan a QR sticker to quickly search our database, connecting finders with owners in seconds."
              />
              <FeatureCard
                icon={<Lock className="w-5 h-5 text-[#00BFFF]" aria-hidden="true" />}
                title="Secure and Anonymous"
                description="QR stickers enable anonymous communication through our encrypted platform, protecting your privacy."
              />
              <FeatureCard
                icon={<Check className="w-5 h-5 text-[#00BFFF]" aria-hidden="true" />}
                title="Durable Design"
                description="Our waterproof, UV-resistant QR stickers are built to last, ensuring scannability for years."
              />
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/qr-tags"
                aria-label="Learn more about our QR stickers"
                className="inline-flex items-center px-4 py-2 bg-white border border-[#00BFFF] text-[#00BFFF] rounded-md font-medium text-xs sm:text-sm hover:bg-[#00BFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
              >
                Learn More About QR Stickers
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-4">How We Recover Your Items</h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
                Our platform combines QR technology and community effort for unparalleled recovery success.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Scan className="w-5 h-5 text-[#00BFFF]" aria-hidden="true" />}
                title="Quick Reporting"
                description="Report lost or found items effortlessly with our intuitive interface and image upload features."
              />
              <FeatureCard
                icon={<Tag className="w-5 h-5 text-[#00BFFF]" aria-hidden="true" />}
                title="QR Code Identification"
                description="Attach QR stickers to your valuables for instant identification and recovery."
              />
              <FeatureCard
                icon={<Search className="w-5 h-5 text-[#00BFFF]" aria-hidden="true" />}
                title="Smart Search"
                description="Find items quickly with advanced filters for location, category, and QR code scans."
              />
              <FeatureCard
                icon={<Lock className="w-5 h-5 text-[#00BFFF]" aria-hidden="true" />}
                title="Secure Communication"
                description="Connect anonymously through our encrypted platform to protect your privacy."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-4">Three Simple Steps to Recovery</h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
                Our streamlined process, powered by QR stickers, ensures your lost items are returned quickly and securely.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <ProcessStep
                number="1"
                title="Tag Your Items"
                description="Attach our durable QR stickers to your valuables and register them on our platform."
              />
              <ProcessStep
                number="2"
                title="Report or Search"
                description="Report a lost or found item, or use our search tool with QR code scans to find matches."
              />
              <ProcessStep
                number="3"
                title="Secure Recovery"
                description="Coordinate item return securely via our encrypted messaging platform."
              />
            </div>
          </div>
        </section>

        {/* User Stories Section */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-4">Success Stories with QR Stickers</h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
                Hear from users who recovered their items using our QR sticker technology.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <TestimonialCard
                quote="I lost my laptop bag at the airport, but the QR sticker helped the finder contact me within hours. Amazing system!"
                name="Anjali Sharma"
                location="Delhi"
              />
              <TestimonialCard
                quote="Found a wallet with a QR sticker and used the platform to return it anonymously. It felt great to help someone!"
                name="Vikram Singh"
                location="Mumbai"
              />
              <TestimonialCard
                quote="My lost keys were scanned via the QR sticker, and I got them back the same day. This technology is a game-changer!"
                name="Priya Patel"
                location="Bangalore"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about our QR sticker technology and lost item recovery.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FAQItem
                question="How do QR stickers help recover lost items?"
                answer="QR stickers have unique codes linked to your account. When scanned, they allow finders to report items directly to our platform, connecting them with you anonymously."
              />
              <FAQItem
                question="How do I get QR stickers?"
                answer="Sign up for an account, and order our durable, waterproof QR stickers through your dashboard."
              />
              <FAQItem
                question="What if I find an item with a QR sticker?"
                answer="Scan the QR code with your smartphone or enter the code in our search tool to report the item and connect with the owner securely."
              />
              <FAQItem
                question="Are QR stickers durable?"
                answer="Yes, our QR stickers are waterproof, UV-resistant, and designed to withstand wear and tear, ensuring they remain scannable for years."
              />
              <FAQItem
                question="How accurate is the recovery system?"
                answer="Our platform uses advanced algorithms and QR technology to match items based on scans, descriptions, and locations, ensuring high accuracy."
              />
              <FAQItem
                question="Is my information safe?"
                answer="Yes, all communications are encrypted, and QR stickers enable anonymous interactions to protect your privacy."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 bg-gradient-to-r from-indigo-600 to-blue-500 text-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-4">
              Protect Your Valuables with QR Stickers Today
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of users who trust our QR sticker technology to safeguard their belongings.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/signup"
                aria-label="Get started with our platform for free"
                className="inline-flex items-center px-4 py-2 bg-white border border-[#00BFFF] text-[#00BFFF] rounded-md font-medium text-xs sm:text-sm hover:bg-[#00BFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
              >
                Get Started Free
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                aria-label="Contact our sales team"
                className="inline-flex items-center px-4 py-2 bg-white border border-[#00BFFF] text-[#00BFFF] rounded-md font-medium text-xs sm:text-sm hover:bg-[#00BFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Component: Feature Card
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-md border border-gray-200">
      <div className="mb-4 w-10 h-10 bg-[#00BFFF]/10 rounded-md flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-[14px] font-medium text-gray-800 mb-3">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
}

// Component: Process Step
function ProcessStep({ number, title, description }) {
  return (
    <div className="text-center p-6 bg-white rounded-md border border-gray-200">
      <div className="w-10 h-10 bg-[#00BFFF] text-white text-[14px] font-semibold rounded-full flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-[14px] font-medium text-gray-800 mb-3">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
}

// Component: Testimonial Card
function TestimonialCard({ quote, name, location }) {
  return (
    <div className="bg-white p-6 rounded-md border border-gray-200">
      <div className="mb-4 text-[#00BFFF]">
        <Quote className="w-5 h-5" aria-hidden="true" />
      </div>
      <p className="text-xs text-gray-600 mb-4">{quote}</p>
      <div className="text-[14px] font-medium text-gray-800">{name}</div>
      <div className="text-xs text-gray-600">{location}</div>
    </div>
  );
}

// Component: FAQ Item
function FAQItem({ question, answer }) {
  return (
    <div className="bg-white p-6 rounded-md border border-gray-200">
      <div className="flex items-start">
        <MapPin className="w-5 h-5 text-[#00BFFF] mr-3 flex-shrink-0" aria-hidden="true" />
        <div>
          <h3 className="text-[14px] font-medium text-gray-800 mb-2">{question}</h3>
          <p className="text-xs text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}