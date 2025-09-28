"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag, Check, Shield, HelpCircle, Quote, ChevronRight, QrCode, Clock } from "lucide-react";

export default function QrTagsPage() {
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
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Secure QR Tag System
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 sm:mb-6">
                Protect Your Valuables with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">QR Tags</span>
              </h1>
              <p className="text-[12px] sm:text-sm md:text-base text-slate-200 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed font-light">
                Our cutting-edge QR tags make it easy to identify and recover your lost items securely and efficiently.
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

        {/* How QR Tags Work Section */}
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
                How QR Tags Work
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Our QR tags are designed to make item recovery simple, secure, and fast. Here’s how it works in three easy steps.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <ProcessStep
                number="1"
                title="Register & Attach"
                description="Sign up, generate unique QR tags for your valuables, and attach them securely to your items."
                icon={<Tag className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                delay={0.1}
              />
              <ProcessStep
                number="2"
                title="Scan & Report"
                description="If an item is lost, anyone can scan the QR tag to report it, instantly notifying you through our platform."
                icon={<QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                delay={0.2}
              />
              <ProcessStep
                number="3"
                title="Recover Securely"
                description="Coordinate the return of your item through our encrypted messaging system, keeping your privacy intact."
                icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Benefits of QR Tags Section */}
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
                Benefits of Using QR Tags
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Discover why our QR tags are the ultimate solution for protecting and recovering your valuables.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <FeatureCard
                icon={<QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Instant Identification"
                description="QR tags link directly to your item’s profile, ensuring quick identification by finders."
                delay={0.1}
              />
              <FeatureCard
                icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Privacy Protection"
                description="Anonymous reporting and secure communication keep your personal information safe."
                delay={0.2}
              />
              <FeatureCard
                icon={<Check className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Easy to Use"
                description="Generate and attach QR tags in minutes with our user-friendly platform."
                delay={0.3}
              />
              <FeatureCard
                icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Fast Recovery"
                description="Our system notifies you instantly when your item is scanned, speeding up recovery."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Customization Options Section */}
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
                Customize Your QR Tags
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Personalize your QR tags to match your style or brand with our premium customization options.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <CustomizationCard
                title="Design Options"
                description="Choose from various colors, shapes, and sizes to make your QR tags visually appealing."
                delay={0.1}
              />
              <CustomizationCard
                title="Branding"
                description="Add your logo or brand name to QR tags for a professional look (Enterprise plan only)."
                delay={0.2}
              />
              <CustomizationCard
                title="Durable Materials"
                description="Select weather-resistant or premium materials for long-lasting QR tags."
                delay={0.3}
              />
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
                Get answers to common questions about our QR tags and how they work.
              </p>
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              <FAQItem
                question="How do I attach QR tags to my items?"
                answer="Our QR tags come with adhesive backing or can be attached using keychains, stickers, or other accessories, depending on the item."
                delay={0.1}
              />
              <FAQItem
                question="Are QR tags durable?"
                answer="Yes, our QR tags are made with high-quality, weather-resistant materials to withstand daily wear and tear."
                delay={0.2}
              />
              <FAQItem
                question="What happens if someone scans my QR tag?"
                answer="When a QR tag is scanned, our platform notifies you instantly, allowing you to connect with the finder securely."
                delay={0.3}
              />
              <FAQItem
                question="Can I customize my QR tags?"
                answer="Yes, with our Pro and Enterprise plans, you can customize the design, add branding, and choose durable materials for your QR tags."
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
                Hear from users who have successfully used our QR tags to recover their lost items.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <TestimonialCard
                quote="The QR tag on my wallet helped someone return it to me within hours. This system is a lifesaver!"
                name="Arjun Kapoor"
                location="Delhi"
                delay={0.1}
              />
              <TestimonialCard
                quote="I customized my QR tags for my camera gear, and they look amazing. Recovery was quick and secure."
                name="Meera Nair"
                location="Mumbai"
                delay={0.2}
              />
              <TestimonialCard
                quote="Found a lost bag with a QR tag and returned it easily through the platform. So simple and rewarding!"
                name="Rohan Patel"
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
                Start Using QR Tags Today
              </h2>
              <p className="text-[12px] sm:text-sm mb-6 sm:mb-8 max-w-3xl mx-auto text-indigo-100 leading-relaxed">
                Protect your valuables with our secure QR tags and join thousands of users who never worry about losing their belongings.
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
                    Contact Sales
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

// Component: Customization Card
function CustomizationCard({ title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="mb-4 sm:mb-6 text-indigo-600">
        <QrCode className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
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