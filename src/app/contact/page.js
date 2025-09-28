'use client';
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const ContactDetails = () => {
  const { serialNumber } = useParams();
  const [contactDetails, setContactDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/qr/contact/${serialNumber}`);
        if (res.data.success) {
          setContactDetails(res.data.contactDetails);
        } else {
          setError("No contact details found for this serial number");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching contact details");
      } finally {
        setLoading(false);
      }
    };
    if (serialNumber) {
      fetchContactDetails();
    }
  }, [serialNumber]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f7ff] to-[#e6f0fa] px-4 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 max-w-lg w-full transform transition-all duration-300">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#00BFFF] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Contact Details</h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">View contact information</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-2 border-[#00BFFF] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-600 text-center text-sm sm:text-base">{error}</p>
        ) : contactDetails ? (
          <div className="p-4 bg-gray-50 rounded-xl animate-fade-in">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h4>
            <p className="text-gray-600 text-sm"><strong>Name:</strong> {contactDetails.name}</p>
            <p className="text-gray-600 text-sm"><strong>Email:</strong> {contactDetails.email}</p>
            {contactDetails.number && (
              <p className="text-gray-600 text-sm"><strong>Phone:</strong> {contactDetails.number}</p>
            )}
            {contactDetails.address && (
              <p className="text-gray-600 text-sm"><strong>Address:</strong> {contactDetails.address}</p>
            )}
          </div>
        ) : null}
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactDetails;