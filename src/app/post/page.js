"use client"; 

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Post() {
  const [itemType, setItemType] = useState("Lost");
  const [anonymous, setAnonymous] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow pt-16 sm:pt-20">
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 text-center mb-6 sm:mb-8 animate-fade-in">
              Post a Lost or Found Item
            </h2>
            <form className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg animate-scale-in">
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs font-semibold text-gray-700 mb-2">Item Type</label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-teal-600 transition-colors duration-200"
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-teal-600 transition-colors duration-200"
                  placeholder="e.g., Lost Black Wallet"
                />
              </div>
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-teal-600 transition-colors duration-200"
                  rows="4"
                  placeholder="Provide details about the item..."
                ></textarea>
              </div>
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-teal-600 transition-colors duration-200"
                  placeholder="City, Area (e.g., Mumbai, Andheri)"
                />
              </div>
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs font-semibold text-gray-700 mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-teal-600 transition-colors duration-200"
                />
              </div>
              <div className="mb-4 sm:mb-6 flex items-center">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={() => setAnonymous(!anonymous)}
                  className="mr-2 text-teal-600 focus:ring-teal-600"
                />
                <label className="text-xs text-gray-700">Post Anonymously</label>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs font-semibold hover:bg-teal-700 transition-all duration-300 shadow-md"
              >
                Submit Post
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}