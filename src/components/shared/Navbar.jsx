"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo and Brand Name Container */}
        <Link href="/" className="flex items-center  gap-4 group">
          {/* Logo wrapper to handle proper sizing and spacing */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Logo />
          </div>
          
          <div className="flex flex-col justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-blue-900 leading-none">
              SMART <span className="text-orange-500">ABACUS</span>
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 tracking-widest mt-1 leading-none">
              Empowering Young Minds
            </span>
          </div>
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

          {/* Authentication Buttons  */}
          <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
            {/* Sign In Button (Deep Blue Background + Glow) */}
            <Link
              href="/pages/auth/login"
              className="bg-[#1e3a8a] hover:bg-[#172554] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-blue-900/30 transition-all"
            >
              Sign In
            </Link>
            
            {/* Register Button (Orange Background + Glow) */}
            <Link
              href="/pages/auth/register"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-orange-500/30 transition-all"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[#1e3a8a]"
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
              className="bg-orange-500 text-white text-center py-3 rounded-full font-bold"
            >
              Join Now
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}