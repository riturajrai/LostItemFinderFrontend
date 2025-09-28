"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, HelpCircle, ChevronRight, Shield } from "lucide-react";

export default function TermsOfServicePage() {
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
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Terms of Service
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 sm:mb-6">
                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Terms of Service</span>
              </h1>
              <p className="text-[12px] sm:text-sm md:text-base text-slate-200 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed font-light">
                Review the terms and conditions that govern your use of our platform to ensure a fair and secure experience.
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
                    href="/contact"
                    className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold text-[12px] sm:text-sm hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Terms of Service Overview Section */}
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
                Terms of Service Overview
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Understand the rules and responsibilities that govern your use of our platform, ensuring a fair and secure experience for all users.
              </p>
            </motion.div>

            <div className="space-y-8 sm:space-y-10">
              <TermsSection
                title="Acceptance of Terms"
                content="By using our platform, you agree to comply with these Terms of Service and all applicable laws. If you do not agree, please do not use our services."
                delay={0.1}
              />
              <TermsSection
                title="Use of the Platform"
                content="You may use our platform to register items, generate QR tags, and facilitate item recovery. You agree not to misuse the platform or engage in prohibited activities, such as fraud or unauthorized access."
                delay={0.2}
              />
              <TermsSection
                title="User Responsibilities"
                content="You are responsible for maintaining the confidentiality of your account and ensuring the accuracy of information provided. You must report any unauthorized use of your account immediately."
                delay={0.3}
              />
              <TermsSection
                title="Prohibited Activities"
                content="You may not use our platform for illegal purposes, to harass others, or to interfere with the platform’s functionality. We reserve the right to terminate accounts for violations."
                delay={0.4}
              />
              <TermsSection
                title="Termination"
                content="We may suspend or terminate your account if you violate these terms or engage in activities that harm the platform or other users. You may also terminate your account at any time."
                delay={0.5}
              />
              <TermsSection
                title="Liability"
                content="Our platform is provided 'as is' without warranties. We are not liable for any damages arising from your use of the platform, including lost items or data breaches."
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Platform Guidelines Section */}
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
                Platform Guidelines
              </h2>
              <p className="text-[12px] sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Follow these guidelines to ensure a positive and secure experience for all users on our platform.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <GuidelineCard
                icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Accurate Information"
                description="Provide accurate and truthful information when registering items or reporting lost/found items."
                delay={0.1}
              />
              <GuidelineCard
                icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Respect Privacy"
                description="Respect the privacy of other users and do not share their information without consent."
                delay={0.2}
              />
              <GuidelineCard
                icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Appropriate Use"
                description="Use the platform only for its intended purpose of protecting and recovering valuables."
                delay={0.3}
              />
              <GuidelineCard
                icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                title="Report Violations"
                description="Report any misuse or suspicious activity to our support team immediately."
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
                Get answers to common questions about our Terms of Service and platform usage.
              </p>
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              <FAQItem
                question="What happens if I violate the Terms of Service?"
                answer="Violations may result in account suspension or termination. We investigate all reported issues and take appropriate action."
                delay={0.1}
              />
              <FAQItem
                question="Can I use the platform for commercial purposes?"
                answer="Commercial use requires an Enterprise plan and compliance with our terms. Contact our sales team for details."
                delay={0.2}
              />
              <FAQItem
                question="How can I terminate my account?"
                answer="You can terminate your account at any time through your account settings or by contacting our support team."
                delay={0.3}
              />
              <FAQItem
                question="Are there any restrictions on platform use?"
                answer="Yes, you may not use the platform for illegal activities, harassment, or any actions that disrupt the platform’s functionality."
                delay={0.4}
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
                Join Our Platform Today
              </h2>
              <p className="text-[12px] sm:text-sm mb-6 sm:mb-8 max-w-3xl mx-auto text-indigo-100 leading-relaxed">
                Use our platform with confidence, knowing our Terms of Service ensure a fair and secure experience.
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

// Component: Terms Section
function TermsSection({ title, content, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3 sm:mb-4">{title}</h3>
      <p className="text-[12px] sm:text-sm text-slate-600 leading-relaxed">{content}</p>
    </motion.div>
  );
}

// Component: Guideline Card
function GuidelineCard({ icon, title, description, delay }) {
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