import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-700 text-gray-300">
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
              {/* WhatsApp */}
              <a className="h-11 w-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition cursor-pointer" title="WhatsApp">
                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.233 8.377 3.469 2.235 2.237 3.465 5.213 3.464 8.381-.003 6.535-5.328 11.859-11.859 11.859-2.007-.002-3.98-.511-5.73-1.483L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.402 0 9.799-4.394 9.802-9.797.002-2.618-1.017-5.08-2.87-6.934C16.35 2.02 13.89 1 11.272 1 5.874 1 1.478 5.394 1.475 10.795c-.001 1.637.432 3.238 1.254 4.673l-.995 3.635 3.72-.976z" />
                </svg>
              </a>

              {/* Facebook */}
              <a className="h-11 w-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition cursor-pointer" title="Facebook">
                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>

              {/* Instagram */}
              <a className="h-11 w-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition cursor-pointer" title="Instagram">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a className="h-11 w-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition cursor-pointer" title="YouTube">
                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
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
                {/* Location pin */}
                <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>

                <p className="leading-7 text-gray-400">
                  123 Abacus Street, Pune, Maharashtra, India - 411001
                </p>
              </div>

              <div className="flex gap-4">
                {/* Phone */}
                <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622c0-1.272.933-2.317 2.188-2.433 2.625-.246 5.27-.246 7.895 0 1.255.116 2.188 1.161 2.188 2.433V16.25c0 1.272-.933 2.317-2.188 2.433-2.625.246-5.27.246-7.895 0-1.255-.116-2.188-1.161-2.188-2.433V6.622zM10.5 19.5h3" />
                </svg>

                <p>+91 98765 43210</p>
              </div>

              <div className="flex gap-4">
                {/* Globe */}
                <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.003 9.003 0 018.716 2.253M12 3a9.003 9.003 0 00-8.716 2.253M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

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