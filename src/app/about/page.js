'use client';

import Image from "next/image";
import Link from "next/link";
import { Shield, Users, Lightbulb, ChevronRight, Quote, MapPin } from "lucide-react";
import illustration from './personnes-code-qr_118813-5817 (1).avif';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-xs">
      {/* Hero Section */}
        <section className="w-full  bg-sky-600 text-white border-b border-gray-200  mb-12">
            <div className="text-center py-12 sm:py-16 px-4 sm:px-6">
              <div className="inline-flex items-center rounded-full bg-[#00BFFF]/10 px-3 py-1 text-xs font-medium text-[yellow] border border-[#00BFFF]/30 mb-4">
                <Shield className="w-4 h-4 mr-2" aria-hidden="true" />
                Building Trust Worldwide
              </div>
              <h1 className="text-sm sm:text-base font-semibold text-gray-800 mb-4">
                About Lost & Found Portal
              </h1>
              <p className="text-xs sm:text-sm text-white-600 max-w-3xl mx-auto">
                We are a community-driven platform dedicated to reuniting lost items with their owners using innovative QR sticker technology and secure, anonymous communication.
              </p>
            </div>
          </section>
      <main className="flex-grow ">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Mission Section */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-4">
                  Our Mission
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                  Our mission is to simplify the recovery of lost belongings by fostering a global community of responsible individuals. We leverage advanced QR sticker technology to ensure secure, private, and efficient reunions.
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Every lost item has a story. Our platform empowers users to tag their valuables with QR stickers, report lost or found items, and connect anonymously to reunite items with their owners.
                </p>
              </div>
              <div className="relative w-full h-48 sm:h-64 md:h-80">
                <Image
                  src={illustration}
                  alt="Illustration of QR sticker technology in action"
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-12 bg-white rounded-md border border-gray-200 py-12">
            <div className="text-center mb-8">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-4">
                Our Core Values
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mx-auto">
                Guided by principles that ensure trust, efficiency, and community impact through QR technology.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ValueCard
                title="Trust & Security"
                description="Your privacy is our priority with end-to-end encryption and anonymous QR sticker communication."
                icon={<Shield className="w-5 h-5 text-[#00BFFF]" aria-hidden="true" />}
              />
              <ValueCard
                title="Community Impact"
                description="We build a global network of individuals dedicated to helping others recover their belongings using QR stickers."
                icon={<Users className="w-5 h-5 text-[#00BFFF]" aria-hidden="true" />}
              />
              <ValueCard
                title="Innovation"
                description="Our QR sticker technology and intelligent matching system streamline item recovery."
                icon={<Lightbulb className="w-5 h-5 text-[#00BFFF]" aria-hidden="true" />}
              />
            </div>
          </section>

          {/* Success Stories Section */}
          <section className="mb-12 bg-white rounded-md border border-gray-200 py-12">
            <div className="text-center mb-8">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-4">
                Success Stories with QR Stickers
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mx-auto">
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
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mx-auto">
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
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 bg-sky-600 text-white rounded-md border border-gray-200">
            <div className="text-center px-4 sm:px-6">
              <h2 className="text-sm sm:text-base font-semibold text-yellow-600 mb-4">
                Join Our Community
              </h2>
              <p className="text-xs sm:text-sm text-white-600 mb-6 max-w-3xl mx-auto">
                Be part of a movement to reunite lost items with their owners. Sign up today to protect your valuables with QR stickers.
              </p>
              <div className="flex flex-col-2 sm:flex-row justify-center gap-3">
                <Link
                  href="/signup"
                  aria-label="Get started with our platform for free"
                  className="inline-flex items-center px-4 py-2 bg-white border border-[#00BFFF] text-[#00BFFF] rounded-md font-medium text-xs sm:text-sm hover:bg-[#00BFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                >
                  Get Started Free
                  <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
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
        </div>
      </main>
    </div>
  );
}

// Component: Value Card
function ValueCard({ title, description, icon }) {
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

// Component: Team Card
function TeamCard({ name, role, image, description }) {
  return (
    <div className="bg-white p-6 rounded-md border border-gray-200 text-center">
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image
          src={image}
          alt={`Portrait of ${name}, ${role}`}
          fill
          className="object-cover rounded-full"
          sizes="(max-width: 640px) 96px, 96px"
        />
      </div>
      <h3 className="text-[14px] font-medium text-gray-800 mb-1">{role}</h3>
      <p className="text-xs text-[#00BFFF] mb-3">{name}</p>
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