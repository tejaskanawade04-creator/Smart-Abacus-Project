import Link from "next/link";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Contact Section */}
      <section className="py-20 px-6 flex items-center justify-center">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Contact <span className="text-pink-600">Smart Abacus</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-8">
            We'd love to hear from you! Whether you have questions about our
            courses, admissions, fees, or would like to enroll your child in
            our mental math programs, our team is here to assist you. Get in
            touch with us and we'll respond as soon as possible.
          </p>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-pink-600">
                📞 Call Us
              </h3>
              <p className="mt-4 text-gray-700 font-medium">
                +91 98765 43210
              </p>
              <p className="text-gray-500">
                Monday - Saturday, 9:00 AM - 6:00 PM
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-pink-600">
                📧 Email Us
              </h3>
              <p className="mt-4 text-gray-700 font-medium">
                info@smartabacus.com
              </p>
              <p className="text-gray-500">
                We'll get back to you within 24 hours.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-pink-600">
                📍 Visit Us
              </h3>
              <p className="mt-4 text-gray-700 font-medium">
                Smart Abacus Learning Center
              </p>
              <p className="text-gray-500">
                Khopoli, Maharashtra, India
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <Link
              href="/register"
              className="px-8 py-3 bg-pink-600 text-white font-semibold rounded-xl shadow-lg hover:bg-pink-700 transition"
            >
              Enroll Now
            </Link>

            <Link
              href="/courses"
              className="px-8 py-3 border-2 border-pink-600 text-pink-600 font-semibold rounded-xl hover:bg-pink-600 hover:text-white transition"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}