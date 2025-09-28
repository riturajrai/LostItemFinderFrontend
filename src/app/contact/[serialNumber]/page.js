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
      if (!serialNumber) {
        setError("Invalid serial number");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`http://localhost:4000/api/qr/contact/${serialNumber}`);
        if (res.data.success) {
          setContactDetails(res.data.contactDetails);
        } else {
          setError("No contact details found for this serial number");
        }
      } catch (err) {
        console.error("Fetch Contact Details Error:", {
          error: err.message,
          serialNumber,
        });
        setError("Error fetching contact details");
      } finally {
        setLoading(false);
      }
    };
    fetchContactDetails();
  }, [serialNumber]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 bg-[#00BFFF] rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-gray-800">Contact Details</h2>
          <p className="text-xs text-gray-600 mt-1">
            Serial: <span className="font-mono text-[#00BFFF]">{serialNumber}</span>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-600">
            {error}
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="w-6 h-6 border-2 border-[#00BFFF] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : contactDetails ? (
          <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-300">
              Contact Information
            </h4>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <span className="text-gray-600 text-[14px] font-medium min-w-[60px]">Name:</span>
                <span className="text-gray-800 text-xs font-semibold mt-1 sm:mt-0">{contactDetails.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <span className="text-gray-600 text-[14px] font-medium min-w-[60px]">Email:</span>
                <span className="text-gray-800 text-xs font-semibold mt-1 sm:mt-0 break-all">{contactDetails.email}</span>
              </div>
              {contactDetails.number && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <span className="text-gray-600 text-[14px] font-medium min-w-[60px]">Phone:</span>
                  <span className="text-gray-800 text-xs font-semibold mt-1 sm:mt-0">{contactDetails.number}</span>
                </div>
              )}
              {contactDetails.address && (
                <div className="flex flex-col sm:flex-row justify-between">
                  <span className="text-gray-600 text-[14px] font-medium min-w-[60px] mt-1">Address:</span>
                  <span className="text-gray-800 text-xs font-semibold mt-1 sm:ml-4 flex-1 text-right sm:text-left">
                    {contactDetails.address}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Back to Home Button */}
        {/* <div className="mt-6 pt-4 border-t border-gray-200">
          <a
            href="/"
            className="w-full py-2 px-4 bg-white border border-[#00BFFF] text-[#00BFFF] text-xs font-medium rounded-md hover:bg-[#00BFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] flex items-center justify-center gap-2"
            aria-label="Back to home"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default ContactDetails;