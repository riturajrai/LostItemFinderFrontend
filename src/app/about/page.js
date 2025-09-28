// app/about/page.js or components/AboutPage.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Users, Lightbulb, ChevronRight, Quote, MapPin } from "lucide-react";
import illustration from './personnes-code-qr_118813-5817 (1).avif';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-sm md:text-base overflow-x-hidden">
      {/* Floating Gradient Orbs */}
      <div className="fixed -top-16 -left-16 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-10 blur-2xl animate-float-slow z-0" />
      <div className="fixed bottom-4 right-4 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 opacity-10 blur-2xl animate-float-medium z-0" />
      <div className="fixed top-1/4 left-1/5 w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-gradient-to-r from-indigo-200 to-purple-200 opacity-10 blur-2xl animate-float-fast z-0" />

      <main className="flex-grow">
        <div className=" mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-xl overflow-hidden mb-16 sm:mb-20 lg:mb-24">
            <div className="absolute inset-0 bg-black/20 z-0"></div>
            <div className="relative z-10 text-center py-16 sm:py-20 lg:py-24 px-6 sm:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/30 mb-6">
                  <Shield className="w-4 h-4 mr-2" /> Building Trust Worldwide
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                  About Lost & Found Portal
                </h1>
                <p className="text-sm md:text-base text-indigo-100 max-w-3xl mx-auto leading-7 font-light">
                  We are a community-driven platform dedicated to reuniting lost items with their owners using innovative QR sticker technology and secure, anonymous communication.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-7 mb-4">
                  Our mission is to simplify the recovery of lost belongings by fostering a global community of responsible individuals. We leverage advanced QR sticker technology to ensure secure, private, and efficient reunions.
                </p>
                <p className="text-sm md:text-base text-slate-600 leading-7">
                  Every lost item has a story. Our platform empowers users to tag their valuables with QR stickers, report lost or found items, and connect anonymously to reunite items with their owners.
                </p>
              </div>
              <div className="relative w-full h-64 sm:h-80 md:h-96">
                <Image
                  src={illustration}
                  alt="Illustration of QR sticker technology in action"
                  fill
                  className="object-cover rounded-xl shadow-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-16 sm:mb-20 lg:mb-24 bg-white rounded-xl border border-slate-200 py-16">
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-7">
                Guided by principles that ensure trust, efficiency, and community impact through QR technology.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <ValueCard
                title="Trust & Security"
                description="Your privacy is our priority with end-to-end encryption and anonymous QR sticker communication."
                icon={<Shield className="w-6 h-6 text-indigo-600" />}
                delay={0.1}
              />
              <ValueCard
                title="Community Impact"
                description="We build a global network of individuals dedicated to helping others recover their belongings using QR stickers."
                icon={<Users className="w-6 h-6 text-indigo-600" />}
                delay={0.2}
              />
              <ValueCard
                title="Innovation"
                description="Our QR sticker technology and intelligent matching system streamline item recovery."
                icon={<Lightbulb className="w-6 h-6 text-indigo-600" />}
                delay={0.3}
              />
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                Meet Our Team
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-7">
                Our passionate team is committed to making a difference in your recovery journey with QR technology.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <TeamCard
                name="Ananya Sharma"
                role="Founder & CEO"
                image="/team/ananya.jpg"
                description="Ananya leads with a vision to make item recovery seamless and secure using QR stickers."
                delay={0.1}
              />
              <TeamCard
                name="Vikram Patel"
                role="CTO"
                image="/team/vikram.jpg"
                description="Vikram drives our innovative QR sticker technology and platform development."
                delay={0.2}
              />
              <TeamCard
                name="Priya Menon"
                role="Head of Community"
                image="/team/priya.jpg"
                description="Priya builds our global network of responsible finders using QR technology."
                delay={0.3}
              />
              <TeamCard
                name="Rahul Desai"
                role="Lead Designer"
                image="/team/rahul.jpg"
                description="Rahul crafts intuitive and beautiful user experiences for our QR platform."
                delay={0.4}
              />
            </div>
          </section>

          {/* Success Stories Section */}
          <section className="mb-16 sm:mb-20 lg:mb-24 bg-slate-50 rounded-xl border border-slate-200 py-16">
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                Success Stories with QR Stickers
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-7">
                Hear from users who recovered their items using our QR sticker technology.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="I lost my laptop bag at the airport, but the QR sticker helped the finder contact me within hours. Amazing system!"
                name="Anjali Sharma"
                location="Delhi"
                delay={0.1}
              />
              <TestimonialCard
                quote="Found a wallet with a QR sticker and used the platform to return it anonymously. It felt great to help someone!"
                name="Vikram Singh"
                location="Mumbai"
                delay={0.2}
              />
              <TestimonialCard
                quote="My lost keys were scanned via the QR sticker, and I got them back the same day. This technology is a game-changer!"
                name="Priya Patel"
                location="Bangalore"
                delay={0.3}
              />
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-7">
                Get answers to common questions about our QR sticker technology and lost item recovery.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <FAQItem
                question="How do QR stickers help recover lost items?"
                answer="QR stickers have unique codes linked to your account. When scanned, they allow finders to report items directly to our platform, connecting them with you anonymously."
                delay={0.1}
              />
              <FAQItem
                question="How do I get QR stickers?"
                answer="Sign up for an account, and order our durable, waterproof QR stickers through your dashboard."
                delay={0.2}
              />
              <FAQItem
                question="What if I find an item with a QR sticker?"
                answer="Scan the QR code with your smartphone or enter the code in our search tool to report the item and connect with the owner securely."
                delay={0.3}
              />
              <FAQItem
                question="Are QR stickers durable?"
                answer="Yes, our QR stickers are waterproof, UV-resistant, and designed to withstand wear and tear, ensuring they remain scannable for years."
                delay={0.4}
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white rounded-xl shadow-lg">
            <div className="text-center px-6 sm:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
                  Join Our Community
                </h2>
                <p className="text-sm md:text-base mb-8 max-w-3xl mx-auto text-indigo-100 leading-7 font-light">
                  Be part of a movement to reunite lost items with their owners. Sign up today to protect your valuables with QR stickers.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/signup"
                      aria-label="Get started with our platform for free"
                      className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold text-base sm:text-lg hover:bg-slate-100 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Get Started Free
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/contact"
                      aria-label="Contact our sales team"
                      className="inline-flex items-center px-6 py-3 bg-transparent border border-white text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
                    >
                      Contact Sales
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Component: Value Card
function ValueCard({ title, description, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
      className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
        viewport={{ once: true }}
        className="mb-6 w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center"
      >
        {icon}
      </motion.div>
      <h3 className="text-base font-semibold text-slate-900 mb-4">{title}</h3>
      <p className="text-sm text-slate-600 leading-7">{description}</p>
    </motion.div>
  );
}

// Component: Team Card
function TeamCard({ name, role, image, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
      className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 text-center"
    >
      <div className="relative w-32 h-32 mx-auto mb-6">
        <Image
          src={image}
          alt={`Portrait of ${name}, ${role}`}
          fill
          className="object-cover rounded-full"
          sizes="(max-width: 640px) 128px, 128px"
        />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">{role}</h3>
      <p className="text-sm text-indigo-600 mb-3">{name}</p>
      <p className="text-sm text-slate-600 leading-7">{description}</p>
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
      whileHover={{ y: -4 }}
      className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="mb-6 text-indigo-600">
        <Quote className="w-6 h-6" />
      </div>
      <p className="text-sm text-slate-600 leading-7 mb-4">{quote}</p>
      <div className="text-base font-medium text-slate-900">{name}</div>
      <div className="text-sm text-slate-600">{location}</div>
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
      whileHover={{ y: -4 }}
      className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start">
        <MapPin className="w-6 h-6 text-indigo-600 mr-4 flex-shrink-0" />
        <div>
          <h3 className="text-base font-medium text-slate-900 mb-3">{question}</h3>
          <p className="text-sm text-slate-600 leading-7">{answer}</p>
        </div>
      </div>
    </motion.div>
  );
}