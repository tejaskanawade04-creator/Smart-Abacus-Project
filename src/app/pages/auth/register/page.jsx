"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Mail, Lock, Phone, MapPin, Building, 
  ArrowRight, Eye, EyeOff, UserCheck 
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileCode: "+91",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    gender: "Male",
    city: "",
    emergencyContact: "",
    currentAddress: "",
    permanentAddress: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Registration completed successfully!");
    router.push('/pages/auth/login');
  };

  return (
    
    <div className="min-h-screen bg-[#060b13] flex items-center justify-center p-4 antialiased font-sans">
      {/* Main Container Card */}
      <div className="w-full max-w-2xl bg-[#0b1320] border border-[#162235] rounded-2xl p-8 shadow-2xl my-6">
        
        {/* Header Logo & Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#f26e00] text-white p-2.5 rounded-xl font-bold text-xl mb-4 shadow-md shadow-[#f26e00]/20">
            S
          </div>
          <h1 className="text-2xl font-black tracking-wider text-white flex items-center gap-2">
            SMART <span className="text-[#f26e00]">ABACUS</span>
          </h1>
          <p className="text-xs text-gray-500 font-semibold tracking-widest uppercase mt-1">
            Class Management System
          </p>
          
          <div className="mt-6 text-center">
            <span className="text-[10px] bg-[#162235] text-[#f26e00] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-[#20334e]">
              Member Registration
            </span>
            <h2 className="text-xl font-bold text-white mt-3">Join Your Team</h2>
            <p className="text-sm text-gray-400 mt-1">Register as a member in your organization</p>
          </div>
        </div>

        {/* Registration Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Two-Column Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Full Name <span className="text-[#f26e00]">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
                <input 
                  type="text" 
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  className="w-full bg-[#070c14] border border-[#162235] rounded-xl pt-3 pb-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f26e00] transition-colors"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Email Address <span className="text-[#f26e00]">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@smartabacus.com" 
                  className="w-full bg-[#070c14] border border-[#162235] rounded-xl pt-3 pb-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f26e00] transition-colors"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Mobile Number <span className="text-[#f26e00]">*</span>
              </label>
              <div className="relative flex">
                <div className="absolute left-4 top-3.5 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-500 mr-1" />
                </div>
                <select 
                  name="mobileCode"
                  value={formData.mobileCode}
                  onChange={handleChange}
                  className="bg-[#070c14] border border-[#162235] rounded-l-xl pt-3 pb-3 pl-11 pr-2 text-sm text-white focus:outline-none border-r-0 cursor-pointer"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                </select>
                <input 
                  type="tel" 
                  name="mobileNumber"
                  required
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="9876543210" 
                  className="w-full bg-[#070c14] border border-[#162235] rounded-r-xl pt-3 pb-3 px-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f26e00] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Password <span className="text-[#f26e00]">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••" 
                  className="w-full bg-[#070c14] border border-[#162235] rounded-xl pt-3 pb-3 pl-11 pr-11 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f26e00] transition-colors"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-300 cursor-pointer"
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[10px] text-red-500 font-semibold mt-1">
                PASSWORD MUST CONTAIN AT LEAST ONE CAPITAL LETTER
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Confirm Password <span className="text-[#f26e00]">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
                <input 
                  type="password" 
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password" 
                  className="w-full bg-[#070c14] border border-[#162235] rounded-xl pt-3 pb-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f26e00] transition-colors"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Gender
              </label>
              <div className="relative">
                <UserCheck className="absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-[#070c14] border border-[#162235] rounded-xl pt-3 pb-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#f26e00] appearance-none transition-colors cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                City
              </label>
              <div className="relative">
                <Building className="absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Pune" 
                  className="w-full bg-[#070c14] border border-[#162235] rounded-xl pt-3 pb-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f26e00] transition-colors"
                />
              </div>
            </div>

          </div>

          {/* Full Width Fields */}
          <div className="space-y-5">
            {/* Emergency Contact */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Emergency Contact
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
                <input 
                  type="tel" 
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Emergency contact number" 
                  className="w-full bg-[#070c14] border border-[#162235] rounded-xl pt-3 pb-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f26e00] transition-colors"
                />
              </div>
            </div>

            {/* Current Address */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Current Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 h-4 w-4 text-gray-500" />
                <textarea 
                  rows="3"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                  placeholder="Enter your current address" 
                  className="w-full bg-[#070c14] border border-[#162235] rounded-xl pt-3 pb-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f26e00] transition-colors resize-none"
                ></textarea>
              </div>
            </div>

            {/* Permanent Address */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Permanent Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 h-4 w-4 text-gray-500" />
                <textarea 
                  rows="3"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  placeholder="Enter your permanent address" 
                  className="w-full bg-[#070c14] border border-[#162235] rounded-xl pt-3 pb-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f26e00] transition-colors resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-[#f26e00] hover:bg-[#d66100] text-white font-bold text-sm py-4 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#f26e00]/20 transition-colors mt-8 cursor-pointer"
          >
            Complete Registration <ArrowRight className="h-4 w-4" />
          </button>
          
          {/* Back to Login Link */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={() => router.push('/pages/auth/login')} 
                className="text-[#f26e00] hover:underline font-bold bg-transparent border-none cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}