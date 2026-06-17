"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function TeacherDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Teacher Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage your classes and students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold">My Classes</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold">Total Students</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold">Attendance Rate</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">0%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold">Pending Assignments</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">0</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
              Mark Attendance
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
              Create Assignment
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
              View Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
