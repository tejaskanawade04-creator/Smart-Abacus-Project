import Link from "next/link";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
        {/* Header */}
        
    <section className="py-16 px-8 bg-white/80 rounded-3xl mb-12">
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-900">Our Comprehensive Course Levels</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-8 shadow-lg rounded-lg bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition">
              <div className="text-4xl font-bold text-pink-600 mb-2">Level 1</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Beginner</h3>
              <p className="text-gray-600 mb-4">Introduction to Abacus fundamentals, basic operations, and number recognition</p>
              <div className="text-sm text-gray-500">Duration: 3 months | 2 sessions/week</div>
            </div>
            <div className="p-8 shadow-lg rounded-lg bg-gradient-to-br from-white to-pink-50 hover:shadow-xl transition">
              <div className="text-4xl font-bold text-pink-600 mb-2">Level 2</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Intermediate</h3>
              <p className="text-gray-600 mb-4">Advanced calculations, multi-digit operations, and mental arithmetic speed building</p>
              <div className="text-sm text-gray-500">Duration: 4 months | 2 sessions/week</div>
            </div>
            <div className="p-8 shadow-lg rounded-lg bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition">
              <div className="text-4xl font-bold text-pink-600 mb-2">Level 3</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Expert</h3>
              <p className="text-gray-600 mb-4">High-speed calculations, competition preparation, and advanced problem solving</p>
              <div className="text-sm text-gray-500">Duration: 5 months | 3 sessions/week</div>
            </div>
            <div className="p-8 shadow-lg rounded-lg bg-gradient-to-br from-white to-pink-50 hover:shadow-xl transition">
              <div className="text-4xl font-bold text-pink-600 mb-2">Level 4</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Industry</h3>
              <p className="text-gray-600 mb-4">Professional mastery, instructor certification, and competitive championship training</p>
              <div className="text-sm text-gray-500">Duration: 6 months | 4 sessions/week</div>
            </div>
          </div>
        </section>

       <Footer />
    </div>
  );
}
