"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="text-3xl font-bold tracking-wide text-blue-900">
            SMART <span className="text-orange-500">ABACUS</span>
          </span>
          <span className="text-xs text-gray-500 tracking-widest">
            Empowering Young Minds
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <Link
              href="/"
              className="hover:text-blue-900 transition duration-300 border-b-2 border-transparent hover:border-orange-500 pb-1"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="hover:text-blue-900 transition duration-300 border-b-2 border-transparent hover:border-orange-500 pb-1"
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              href="/courses"
              className="hover:text-blue-900 transition duration-300 border-b-2 border-transparent hover:border-orange-500 pb-1"
            >
              Courses
            </Link>
          </li>

          <li>
            <Link
              href="/Franchise"
              className="hover:text-blue-900 transition duration-300 border-b-2 border-transparent hover:border-orange-500 pb-1"
            >
              Franchise
            </Link>
          </li>

          <li>
            <Link
              href="/gallery"
              className="hover:text-blue-900 transition duration-300 border-b-2 border-transparent hover:border-orange-500 pb-1"
            >
              Gallery
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="hover:text-blue-900 transition duration-300 border-b-2 border-transparent hover:border-orange-500 pb-1"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Button */}
        <Link
          href="/pages/auth/login"
          className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:bg-orange-600 hover:scale-105 transition duration-300"
        >
          Join Now
        </Link>
      </div>
    </nav>
  );
}