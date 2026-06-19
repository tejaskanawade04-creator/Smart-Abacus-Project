"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="text-2xl sm:text-3xl font-bold text-blue-900">
            SMART <span className="text-orange-500">ABACUS</span>
          </span>
          <span className="text-[10px] sm:text-xs text-gray-500 tracking-widest">
            Empowering Young Minds
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-gray-700 font-medium">
            <li><Link href="/" className="hover:text-blue-900">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-900">About Us</Link></li>
            <li><Link href="/courses" className="hover:text-blue-900">Courses</Link></li>
            <li><Link href="/Franchise" className="hover:text-blue-900">Franchise</Link></li>
            <li><Link href="/gallery" className="hover:text-blue-900">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-blue-900">Contact Us</Link></li>
          </ul>

          <Link
            href="/pages/auth/login"
            className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:bg-orange-600 transition"
          >
            Join Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-blue-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col p-4 space-y-4 text-gray-700 font-medium">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/Franchise">Franchise</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>

            <Link
              href="/pages/auth/login"
              className="bg-orange-500 text-white text-center py-3 rounded-full"
            >
              Join Now
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}