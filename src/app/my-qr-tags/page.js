'use client';
import React, { useRef, useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import Image from "next/image";

const QRGenerator = () => {
  const [serial, setSerial] = useState("");
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });
  const [qrUrl, setQrUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showSerialDialog, setShowSerialDialog] = useState(false);
  const [showUpdateContactDialog, setShowUpdateContactDialog] = useState(false);
  const [hasSerial, setHasSerial] = useState(false);
  const [scannedContact, setScannedContact] = useState(null);
  const [error, setError] = useState("");
  const qrRef = useRef(null);

  // Base URL for the public contact details page
  const BASE_URL = "http://localhost:3000";
  
  const API_URL = 'https://lostitemfinder.onrender.com'

  // Fetch existing QR and contact details for the user
  useEffect(() => {
    const fetchQR = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/qr/my-qr`, { withCredentials: true });
        if (res.data.success) {
          setQrUrl(res.data.qrImageUrl);
          setSerial(res.data.serialNumber);
          setContactDetails(res.data.contactDetails || {
            name: "",
            email: "",
            number: "",
            address: "",
          });
          setHasSerial(true);
        }
      } catch (err) {
        console.log("No existing QR found:", err.message);
        setShowSerialDialog(true);
      }
    };
    fetchQR();
  }, []);

  // Handle input changes for contact details
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input change
  };

  // Handle serial number input
  const handleSerialChange = (e) => {
    setSerial(e.target.value);
    setError("");
  };

  // Validate and submit QR code and contact details
  const handleAddSerial = async () => {
    if (!serial.trim() || !contactDetails.name.trim() || !contactDetails.email.trim()) {
      setError("Serial number, name, and email are required");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactDetails.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setUploading(true);
    try {
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) throw new Error("QR canvas not found");
      const imageData = canvas.toDataURL("image/png");

      const res = await axios.post(
        `${API_URL}/api/qr/upload-qr`,
        { 
          image: imageData, 
          serialNumber: serial,
          contactDetails,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setQrUrl(res.data.data.qrImageUrl);
        setHasSerial(true);
        setShowSerialDialog(false);
        setError("");
      } else {
        setError("Failed to save QR code");
      }
    } catch (err) {
      console.error("Add Serial Error:", err.message);
      setError("Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle updating contact details
  const handleUpdateContact = async () => {
    if (!contactDetails.name.trim() || !contactDetails.email.trim()) {
      setError("Name and email are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactDetails.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setUploading(true);
    try {
      const res = await axios.put(
        `${API_URL}/api/qr/update-contact`,
        { contactDetails },
        { withCredentials: true }
      );

      if (res.data.success) {
        setContactDetails(res.data.contactDetails);
        setShowUpdateContactDialog(false);
        setError("");
      } else {
        setError("Failed to update contact details");
      }
    } catch (err) {
      console.error("Update Contact Error:", err.message);
      setError("Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Simulate QR scan by fetching contact details via serial number
  const handleScanQR = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/qr/contact/${serial}`);
      if (res.data.success) {
        setScannedContact(res.data.contactDetails);
      } else {
        setError("No contact details found for this serial number");
      }
    } catch (err) {
      console.error("Scan QR Error:", err.message);
      setError("Error fetching contact details");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      {/* Main Card */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-10 h-10 bg-[#00BFFF] rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-gray-800">QR Code Generator</h2>
          <p className="text-xs text-gray-600 mt-1">Generate and share your contact details via QR code</p>
        </div>

        {/* Hidden QR Canvas */}
        <div ref={qrRef} className="hidden">
          <QRCodeCanvas value={`${BASE_URL}/contact/${serial}`} size={150} includeMargin />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-600">
            {error}
          </div>
        )}

        {/* Add Serial and Contact Details Button */}
        {!hasSerial && !showSerialDialog && (
          <button
            onClick={() => setShowSerialDialog(true)}
            className="w-full py-2 bg-white border border-[#00BFFF] text-[#00BFFF] text-xs font-medium rounded-md hover:bg-[#00BFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:ring-offset-2"
            aria-label="Add contact details"
          >
            Add Contact Details
          </button>
        )}

        {/* Serial Number and Contact Details Dialog */}
        {showSerialDialog && (
          <div className="fixed inset-0 bg-black/10 bg-opacity-40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-800">Add Contact Details</h3>
                <button
                  onClick={() => setShowSerialDialog(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close dialog"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-[14px] font-medium">Serial Number</label>
                <input
                  type="text"
                  placeholder="Enter serial number"
                  value={serial}
                  onChange={handleSerialChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF]"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-[14px] font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={contactDetails.name}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF]"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-[14px] font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={contactDetails.email}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF]"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-[14px] font-medium">Phone Number (Optional)</label>
                <input
                  type="text"
                  name="number"
                  placeholder="Enter phone number"
                  value={contactDetails.number}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-[14px] font-medium">Address (Optional)</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={contactDetails.address}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF]"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSerialDialog(false)}
                  className="flex-1 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSerial}
                  disabled={uploading}
                  className={`flex-1 py-2 bg-white border border-[#00BFFF] text-[#00BFFF] text-xs font-medium rounded-md hover:bg-[#00BFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label="Generate QR code"
                >
                  {uploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#00BFFF] border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </div>
                  ) : (
                    "Generate QR"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Contact Details Dialog */}
        {showUpdateContactDialog && (
          <div className="fixed inset-0 bg-black/10 bg-opacity-40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-800">Update Contact Details</h3>
                <button
                  onClick={() => setShowUpdateContactDialog(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close dialog"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-[14px] font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={contactDetails.name}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF]"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-[14px] font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={contactDetails.email}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF]"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-[14px] font-medium">Phone Number (Optional)</label>
                <input
                  type="text"
                  name="number"
                  placeholder="Enter phone number"
                  value={contactDetails.number}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-[14px] font-medium">Address (Optional)</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={contactDetails.address}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF]"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpdateContactDialog(false)}
                  className="flex-1 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateContact}
                  disabled={uploading}
                  className={`flex-1 py-2 bg-white border border-[#00BFFF] text-[#00BFFF] text-xs font-medium rounded-md hover:bg-[#00BFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label="Update contact details"
                >
                  {uploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#00BFFF] border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </div>
                  ) : (
                    "Update Contact"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display QR Code and Contact Details */}
        {qrUrl && hasSerial && !showSerialDialog && !showUpdateContactDialog && (
          <div className="mt-6">
            <div className="text-center mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Your QR Code</h4>
              <p className="text-xs text-gray-600">Serial: {serial}</p>
              <p className="text-xs text-gray-600">
                Share this link: <a href={`${BASE_URL}/contact/${serial}`} target="_blank" rel="noopener noreferrer" className="text-[#00BFFF] hover:underline">{`${BASE_URL}/contact/${serial}`}</a>
              </p>
            </div>
            <div className="border border-gray-200 p-4 rounded-md bg-white">
              <div className="flex justify-center">
                <Image
                  src={qrUrl}
                  alt="Generated QR Code"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <button
                onClick={() => navigator.clipboard.writeText(`${BASE_URL}/contact/${serial}`)}
                className="py-2 bg-white border border-[#00BFFF] text-[#00BFFF] text-xs font-medium rounded-md hover:bg-[#00BFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                aria-label="Copy QR code link"
              >
                Copy Link
              </button>
              <button
                onClick={handleScanQR}
                className="py-2 bg-white border border-[#00BFFF] text-[#00BFFF] text-xs font-medium rounded-md hover:bg-[#00BFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                aria-label="View contact details"
              >
                View Contact
              </button>
              <button
                onClick={() => setShowUpdateContactDialog(true)}
                className="py-2 bg-white border border-[#00BFFF] text-[#00BFFF] text-xs font-medium rounded-md hover:bg-[#00BFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                aria-label="Update contact details"
              >
                Update Contact
              </button>
            </div>

            {/* Display Scanned Contact Details */}
            {scannedContact && (
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Contact Details</h4>
                <p className="text-xs text-gray-600"><strong>Name:</strong> {scannedContact.name}</p>
                <p className="text-xs text-gray-600"><strong>Email:</strong> {scannedContact.email}</p>
                {scannedContact.number && (
                  <p className="text-xs text-gray-600"><strong>Phone:</strong> {scannedContact.number}</p>
                )}
                {scannedContact.address && (
                  <p className="text-xs text-gray-600"><strong>Address:</strong> {scannedContact.address}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRGenerator;