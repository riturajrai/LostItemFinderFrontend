"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scan, Tag, Search, Lock, ChevronRight, Quote, HelpCircle, Shield, Clock } from "lucide-react";
import Image from "next/image";

// Import images and video with proper paths
// import video from './WhatsApp Video 2025-09-02 at 11.22.58_5e47bb18.mp4'; // Updated video import
import keyQrImage from '../images/keyqr.png';
import keyImage from '../images/keyimage.png';
import bagLostImage from '../images/baglost.png';
import idCardImage from '../images/idcard.png';
// import scannerTopImage from '../images/lostitemfinderimages multipe qr.png';

export default function HowItWorksPage() {
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
        {/* Hero Section with Video */}
        <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-16 lg:pb-24 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center lg:text-left max-w-2xl"
              >
                <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-[12px] sm:text-sm font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/30 mb-4 sm:mb-6">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Trusted Recovery Process
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 sm:mb-6">
                  How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Works</span>
                </h1>
                <p className="text-[12px] sm:text-sm md:text-base text-slate-200 max-w-3xl mb-6 sm:mb-8 leading-relaxed font-light">
                  Our platform combines advanced QR technology, community collaboration, and secure communication to reunite you with your lost valuables in three simple steps.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
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
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative w-full lg:w-1/2 mt-8 lg:mt-0"
              >
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                  <video
                    src='./WhatsApp Video 2025-09-02 at 11.22.58_5e47bb18.mp4'
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Detailed Process Section with Images */}
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
                Our Recovery Process
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Learn how our platform makes it easy to report, track, and recover your lost items with cutting-edge technology and community support.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <ProcessStepWithImage
                number="1"
                title="Report Your Item"
                description="Use our intuitive interface to report a lost or found item. Upload photos, provide a detailed description, and pinpoint the location to help us identify it quickly."
                icon={<Scan className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                imageSrc={keyImage}
                imageAlt="Key with QR tag"
                delay={0.1}
              />
              <ProcessStepWithImage
                number="2"
                title="Smart Matching"
                description="Our advanced algorithm matches your report with found items based on location, description, and QR code scans, notifying you instantly of potential matches."
                icon={<Search className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                imageSrc={idCardImage}
                imageAlt="ID card with QR code"
                delay={0.2}
              />
              <ProcessStepWithImage
                number="3"
                title="Secure Return"
                description="Connect with the finder through our encrypted messaging system to coordinate a safe and anonymous return of your item."
                icon={<Lock className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                imageSrc={bagLostImage}
                imageAlt="Recovered bag"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Why It Works Section */}
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
                Why Our Process Works
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Our combination of technology, community, and security ensures a high success rate in recovering lost items.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <FeatureCard
                icon={<Tag className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="QR Code Technology"
                description="Unique QR codes on your valuables enable instant identification and reporting, streamlining the recovery process."
                delay={0.1}
              />
              <FeatureCard
                icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Privacy First"
                description="Anonymous communication and encrypted messaging keep your personal information secure throughout the process."
                delay={0.2}
              />
              <FeatureCard
                icon={<Search className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Smart Algorithms"
                description="Our AI-powered matching system uses location, description, and images to connect lost items with their owners quickly."
                delay={0.3}
              />
              <FeatureCard
                icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="24/7 Support"
                description="Our dedicated support team is available around the clock to assist with any questions or issues during recovery."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Visual Demo Section */}
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
                See How It Works
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Our QR codes make it simple to identify and return lost items. Just scan and notify the owner.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={keyQrImage}
                  alt="QR code on keys example"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="space-y-4"
              >
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">Easy QR Code Placement</h3>
                <p className="text-[12px] sm:text-sm text-slate-600">
                  Our durable QR code tags can be easily attached to your valuables like keys, wallets, bags, and electronic devices.
                </p>
                <ul className="space-y-2 text-[12px] sm:text-sm text-slate-600">
                  <li className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-1 mr-2 mt-0.5">
                      <Tag className="w-3 h-3 text-indigo-600" />
                    </div>
                    <span>Waterproof and scratch-resistant labels</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-1 mr-2 mt-0.5">
                      <Tag className="w-3 h-3 text-indigo-600" />
                    </div>
                    <span>Multiple size options for different items</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-1 mr-2 mt-0.5">
                      <Tag className="w-3 h-3 text-indigo-600" />
                    </div>
                    <span>Customizable with your contact preferences</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
                Frequently Asked Questions
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Get answers to common questions about how our platform works and how it can help you.
              </p>
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              <FAQItem
                question="How do I register my items?"
                answer="Sign up for an account, generate unique QR codes for your valuables, and attach them securely. Then, register each item in our platform with details and photos."
                delay={0.1}
              />
              <FAQItem
                question="What happens if someone finds my item?"
                answer="When someone scans the QR code or reports a found item matching your description, our system notifies you instantly, and you can coordinate the return securely."
                delay={0.2}
              />
              <FAQItem
                question="Is my personal information safe?"
                answer="Yes, our platform uses end-to-end encryption for all communications, and you can remain anonymous when connecting with finders."
                delay={0.3}
              />
              <FAQItem
                question="What if I find someone else's item?"
                answer="Scan the QR code or report the item on our platform. We'll notify the owner and facilitate a secure return process without revealing your identity."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
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
                Success Stories
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Hear from users who successfully recovered their lost items using our platform.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <TestimonialCard
                quote="I lost my laptop bag at the airport, and within a day, someone scanned the QR code and returned it to me. The process was so smooth!"
                name="Anjali Sharma"
                location="Delhi"
                delay={0.1}
              />
              <TestimonialCard
                quote="Found a wallet and used the platform to return it anonymously. It felt great to help someone without any hassle."
                name="Vikram Singh"
                location="Mumbai"
                delay={0.2}
              />
              <TestimonialCard
                quote="Our platform helped me recover my lost camera during a trip. The smart matching feature was a game-changer!"
                name="Neha Patel"
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
                Ready to Protect Your Valuables?
              </h2>
              <p className="text-[12px] sm:text-sm mb-6 sm:mb-8 max-w-3xl mx-auto text-indigo-100 leading-relaxed">
                Join our platform today and experience the easiest way to recover your lost items.
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

// Component: Process Step with Image
function ProcessStepWithImage({ number, title, description, icon, imageSrc, imageAlt, delay }) {
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
      
      {/* Image container */}
      <div className="relative h-40 sm:h-48 mb-4 sm:mb-6 rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
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