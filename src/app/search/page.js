"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, HelpCircle, Quote, ChevronRight, Shield, Clock, MapPin } from "lucide-react";

export default function SearchItemPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-[12px] font-[Inter] overflow-x-hidden">
      {/* Floating Gradient Orbs */}
      <div className="fixed -top-16 -left-16 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-10 blur-2xl animate-float-slow z-0" />
      <div className="fixed bottom-4 right-4 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 opacity-10 blur-2xl animate-float-medium z-0" />
      <div className="fixed top-1/4 left-1/5 w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-gradient-to-r from-indigo-200 to-purple-200 opacity-10 blur-2xl animate-float-fast z-0" />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-16 lg:pb-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-[12px] sm:text-sm font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/30 mb-4 sm:mb-6">
                <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Find Your Lost Items
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 sm:mb-6">
                Search for Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Lost Items</span>
              </h1>
              <p className="text-[12px] sm:text-sm md:text-base text-slate-200 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed font-light">
                Easily search for lost or found items using our powerful platform, designed to reunite you with your valuables quickly and securely.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/signup"
                    className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold text-[12px] sm:text-sm hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Get Started Free
                    <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/demo"
                    className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold text-[12px] sm:text-sm hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    <svg className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Demo
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How Search Works Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-10 sm:mb-12"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
                How Item Search Works
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Our intuitive search system helps you find lost or found items quickly with advanced filtering and matching technology.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <ProcessStep
                number="1"
                title="Enter Item Details"
                description="Input details like item description, location, or QR code ID to search for lost or found items."
                icon={<Search className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                delay={0.1}
              />
              <ProcessStep
                number="2"
                title="Smart Matching"
                description="Our algorithm matches your search with reported items based on description, location, and QR scans."
                icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                delay={0.2}
              />
              <ProcessStep
                number="3"
                title="Connect Securely"
                description="Contact the finder or owner through our encrypted messaging system to arrange a safe return."
                icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Search Features Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-10 sm:mb-12"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
                Powerful Search Features
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Discover the tools that make our search system fast, accurate, and user-friendly.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <FeatureCard
                icon={<Search className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Advanced Filters"
                description="Narrow down results by item type, location, date, or keywords for precise matches."
                delay={0.1}
              />
              <FeatureCard
                icon={<MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Location-Based Search"
                description="Search for items based on where they were lost or found using geolocation."
                delay={0.2}
              />
              <FeatureCard
                icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Real-Time Updates"
                description="Get instant notifications when new matches are found for your search."
                delay={0.3}
              />
              <FeatureCard
                icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Secure Communication"
                description="Connect with finders or owners anonymously through encrypted messaging."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-10 sm:mb-12"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Get answers to common questions about searching for lost or found items on our platform.
              </p>
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              <FAQItem
                question="How do I search for a lost item?"
                answer="Enter details like the item’s description, last known location, or QR code ID in our search tool to find potential matches."
                delay={0.1}
              />
              <FAQItem
                question="What if I find an item with a QR code?"
                answer="Scan the QR code or search for the item on our platform to report it and connect with the owner securely."
                delay={0.2}
              />
              <FAQItem
                question="How accurate is the search system?"
                answer="Our advanced algorithms use item details, location, and QR scans to provide highly accurate matches, updated in real-time."
                delay={0.3}
              />
              <FAQItem
                question="Is my information safe when searching?"
                answer="Yes, all communications are encrypted, and you can remain anonymous when contacting finders or owners."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-10 sm:mb-12"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
                Success Stories
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Hear from users who successfully found their lost items using our search system.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <TestimonialCard
                quote="I searched for my lost phone and found it within hours thanks to the platform’s accurate matching!"
                name="Kiran Malhotra"
                location="Delhi"
                delay={0.1}
              />
              <TestimonialCard
                quote="Found a laptop with a QR code and used the search tool to return it to its owner. So easy!"
                name="Amit Shah"
                location="Mumbai"
                delay={0.2}
              />
              <TestimonialCard
                quote="The location-based search helped me find my bag at a busy airport. This platform is amazing!"
                name="Sneha Rao"
                location="Bangalore"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
                Start Searching for Your Items Today
              </h2>
              <p className="text-[12px] sm:text-sm mb-6 sm:mb-8 max-w-3xl mx-auto text-indigo-100 leading-relaxed">
                Join our platform to search for lost or found items with ease and security.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/signup"
                    className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-white text-indigo-600 rounded-lg font-semibold text-[12px] sm:text-sm hover:bg-slate-100 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Get Started Free
                    <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-transparent border border-white text-white rounded-lg font-semibold text-[12px] sm:text-sm hover:bg-white hover:text-indigo-600 transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Component: Process Step
function ProcessStep({ number, title, description, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="text-center p-6 sm:p-8 bg-white rounded-xl border border-slate-200 shadow-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2, type: "spring", stiffness: 120 }}
        viewport={{ once: true }}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm sm:text-base font-bold rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
      >
        {number}
      </motion.div>
      <div className="mb-4 sm:mb-6">{icon}</div>
      <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3 sm:mb-4">{title}</h3>
      <p className="text-[12px] sm:text-sm text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Component: Feature Card
function FeatureCard({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
      className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
        viewport={{ once: true }}
        className="mb-4 sm:mb-6 w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 rounded-lg flex items-center justify-center"
      >
        {icon}
      </motion.div>
      <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3 sm:mb-4">{title}</h3>
      <p className="text-[12px] sm:text-sm text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Component: Testimonial Card
function TestimonialCard({ quote, name, location, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200"
    >
      <div className="mb-4 sm:mb-6 text-indigo-600">
        <Quote className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <p className="text-[12px] sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6">{quote}</p>
      <div className="text-sm sm:text-base font-medium text-slate-900">{name}</div>
      <div className="text-[12px] sm:text-sm text-slate-600">{location}</div>
    </motion.div>
  );
}

// Component: FAQ Item
function FAQItem({ question, answer, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200"
    >
      <div className="flex items-start">
        <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 mr-3 sm:mr-4 flex-shrink-0" />
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 sm:mb-3">{question}</h3>
          <p className="text-[12px] sm:text-sm text-slate-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </motion.div>
  );
}