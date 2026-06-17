import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Smart <span className="text-orange-500">Abacus</span>
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Empowering young minds through Abacus and Mental Arithmetic
              programs designed to improve concentration, memory and
              calculation speed.
            </p>

            <div className="flex gap-3 mt-6">
              <span className="border border-gray-700 px-4 py-2 rounded-lg text-sm">
                ISO Certified
              </span>

              <span className="border border-gray-700 px-4 py-2 rounded-lg text-sm">
                Since 2015
              </span>
            </div>

            <div className="flex gap-4 mt-8">
              <a className="h-11 w-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition">
                <FaWhatsapp />
              </a>

              <a className="h-11 w-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition">
                <FaFacebookF />
              </a>

              <a className="h-11 w-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition">
                <FaInstagram />
              </a>

              <a className="h-11 w-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li className="hover:text-orange-500 cursor-pointer">
                Home
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                About Us
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                Courses
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                Franchise
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* Presence */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Our Presence
            </h3>

            <p className="leading-8 text-gray-400">
              Pune, Mumbai, Nashik, Kolhapur, Satara, Nagpur and several
              cities across India.
            </p>

            <p className="mt-6 leading-8 text-gray-400">
              International presence in UAE, USA and Canada.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Contact Us
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <FaMapMarkerAlt className="text-orange-500 mt-1" />

                <p className="leading-7 text-gray-400">
                    123 Abacus Street, Pune, Maharashtra, India - 411001
                </p>
              </div>

              <div className="flex gap-4">
                <FaPhoneAlt className="text-orange-500 mt-1" />

                <p>+91 98765 43210</p>
              </div>

              <div className="flex gap-4">
                <FaGlobe className="text-orange-500 mt-1" />

                <p>www.smartabacus.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2026 Smart Abacus. All Rights Reserved.
          </p>

          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            Designed & Developed by Smart Abacus Team
          </p>
        </div>
      </div>
    </footer>
  );
}