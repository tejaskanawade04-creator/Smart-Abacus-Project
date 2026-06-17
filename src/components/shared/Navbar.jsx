"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-900">
          SMART <span className="text-orange-500">ABACUS</span>
        </Link>

        <ul className="hidden md:flex gap-8 font-medium text-gray-700">
          <li className="cursor-pointer hover:text-blue-900">
            <Link href="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-900">
            <Link href="/about">About Us</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-900">
            <Link href="/courses">Courses</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-900">
            <Link href="/module/dashboard/franchise">Franchise</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-900">
            <Link href="/gallery">Gallery</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-900">
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>

        <Link href="/pages/auth/login" className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600">
          Join Now
        </Link>
      </div>
    </nav>
  );
}