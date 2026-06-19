import Link from "next/link";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
        {/* Header */}
        
    <section className="min-h-screen bg-gradient-to-r from-pink-50 to-purple-50 flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Unlock Your Childs
          <span className="text-pink-600"> Mental Math Potential</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Smart Abacus empowers children with faster calculations,
          better concentration, improved memory, and enhanced creativity
          through interactive and fun abacus learning programs.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Link
            href="/app/pages/auth/register"
            className="px-8 py-3 bg-pink-600 text-white font-semibold rounded-xl shadow-lg hover:bg-pink-700 transition duration-300"
          >
            Enroll Now
          </Link>

          <Link
            href="/courses/professional"
            className="px-8 py-3 border-2 border-pink-600 text-pink-600 font-semibold rounded-xl hover:bg-pink-600 hover:text-white transition duration-300"
          >
            View Syllabus
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-pink-600">
              Faster Calculations
            </h3>
            <p className="mt-3 text-gray-600">
              Develop lightning-fast mental arithmetic skills.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-pink-600">
              Better Concentration
            </h3>
            <p className="mt-3 text-gray-600">
              Improve focus, memory, and analytical thinking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-pink-600">
              Interactive Learning
            </h3>
            <p className="mt-3 text-gray-600">
              Fun activities and expert guidance for every child.
            </p>
          </div>
        </div>
      </div>
  </section>
       <Footer />
    </div>
  );
}
