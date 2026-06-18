"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show popup
    setShowPopup(true);

    // Reset form fields
    e.target.reset();

    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <>
      <Navbar />

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg">
          ✅ Inquiry Submitted Successfully!
        </div>
      )}

      <div className="bg-gray-100 min-h-screen py-12 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

          {/* Left Side */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-md flex items-center gap-6 hover:shadow-2xl hover:scale-105 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
              <div className="bg-gray-100 p-5 rounded-full">
                <Phone className="text-blue-900" size={30} />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-800">Phone</h3>
                <p className="text-gray-600 text-lg mt-2">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md flex items-center gap-6 hover:shadow-2xl hover:scale-105 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
              <div className="bg-gray-100 p-5 rounded-full">
                <Mail className="text-blue-900" size={30} />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-800">Email</h3>
                <p className="text-gray-600 text-lg mt-2">
                  smartabacus@gmail.com
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md flex items-center gap-6 hover:shadow-2xl hover:scale-105 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
              <div className="bg-gray-100 p-5 rounded-full">
                <MapPin className="text-blue-900" size={30} />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-800">
                  Head Office
                </h3>
                <p className="text-gray-600 text-lg mt-2">
                  123 Abacus Street,
                  <br />
                  Pune, Maharashtra, India
                  <br />
                  411001
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="bg-white p-10 rounded-3xl shadow-md">
            <h2 className="text-5xl font-bold text-blue-900 mb-8">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  required
                  className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  placeholder="City / Location"
                  required
                  className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                required
                className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Interested In?</option>
                <option>Abacus Course</option>
                <option>Franchise</option>
                <option>Teacher Training</option>
                <option>Other Inquiry</option>
              </select>

              <textarea
                rows="5"
                placeholder="Your Message..."
                required
                className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl py-4 rounded-full transition duration-300"
              >
                SUBMIT INQUIRY →
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}