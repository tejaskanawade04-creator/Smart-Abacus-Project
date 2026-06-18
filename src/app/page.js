import Link from "next/link";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

export default function Home() {
  return (

    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80')",
      }}
    >

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="py-24 text-center flex flex-col items-center">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-indigo-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] tracking-tight">
            Smart Abacus Academy
          </h1>
          <p className="mt-6 text-lg text-slate-100 max-w-2xl font-light leading-relaxed">
            Empowering young minds through Abacus and Mental Arithmetic. Unleash concentration, enhance memory, and accelerate math calculation speed.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pages/auth/login"
              className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold rounded-full text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97] shadow-[0_10px_25px_rgba(245,158,11,0.35)] cursor-pointer"
            >
              Sign In to ERP Portal
            </Link>
            <Link
              href="/pages/auth/login"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/30 backdrop-blur-md font-bold rounded-full text-sm transition-all active:scale-[0.97] cursor-pointer"
            >
              Join Academy
            </Link>
          </div>
        </section>

        <section className="py-16 px-8">
          <h2 className="text-3xl font-bold mb-4 text-white">About Us</h2>
          <p className="text-slate-100">
            Smart Abacus helps children improve concentration, memory,
            creativity, and calculation speed through innovative learning
            techniques.
          </p>
        </section>

        <section className="py-16 px-8 bg-white/80 rounded-3xl">
          <h2 className="text-3xl font-bold mb-6">Our Courses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 shadow rounded-lg bg-white">
              <h3 className="text-xl font-semibold">Beginner Level</h3>
              <p>Introduction to Abacus and basic calculations.</p>
            </div>
            <div className="p-6 shadow rounded-lg bg-white">
              <h3 className="text-xl font-semibold">Intermediate Level</h3>
              <p>Advanced calculations and mental arithmetic.</p>
            </div>
            <div className="p-6 shadow rounded-lg bg-white">
              <h3 className="text-xl font-semibold">Expert Level</h3>
              <p>High-speed calculation and competition training.</p>
            </div>
          </div>
        </section>


        {/* About Us Section */}
        <section className="py-16 px-8 bg-white/80 rounded-3xl mb-12">
          <h2 className="text-4xl font-bold mb-8 text-blue-900">About Smart Abacus</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-700 text-lg mb-4">
                Smart Abacus is a leading education platform dedicated to unlocking the mathematical potential in every child. With over 15 years of excellence, we have empowered thousands of students to achieve extraordinary computational abilities and academic success.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                Our comprehensive curriculum combines traditional Abacus methodology with modern educational techniques, ensuring students develop not just calculation skills but also enhanced memory, focus, and problem-solving abilities.
              </p>
              <p className="text-gray-700 text-lg">
                We believe every child deserves access to world-class mathematics education. Our mission is to make excellence achievable for all.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-blue-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Our Promise</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-pink-600 font-bold text-xl mr-3">✓</span>
                  <span className="text-gray-700">Personalized learning paths for every student</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 font-bold text-xl mr-3">✓</span>
                  <span className="text-gray-700">Expert guidance from certified instructors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 font-bold text-xl mr-3">✓</span>
                  <span className="text-gray-700">Proven results in 6-12 months</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 font-bold text-xl mr-3">✓</span>
                  <span className="text-gray-700">Interactive and engaging learning experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 font-bold text-xl mr-3">✓</span>
                  <span className="text-gray-700">Lifetime support and community access</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Courses Section */}
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

        {/* Success Stories Section */}
        <section className="py-16 px-8 bg-white/80 rounded-3xl mb-12">
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-900">Student Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-lg border-l-4 border-pink-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">R</div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-blue-900">Radhika - Age 9</h3>
                  <p className="text-sm text-gray-600">Mumbai, India</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">I improved my calculation speed by 10x in just 6 months! Now I solve math problems faster than my calculator. My concentration in studies has also improved significantly.</p>
              <div className="flex text-yellow-400">★★★★★</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-blue-900">Arjun - Age 11</h3>
                  <p className="text-sm text-gray-600">Delhi, India</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">I won the National Abacus Championship! The training was rigorous but worth every moment. Im now certified as a junior instructor and helping other students.</p>
              <div className="flex text-yellow-400">★★★★★</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-lg border-l-4 border-pink-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-blue-900">Maya - Age 8</h3>
                  <p className="text-sm text-gray-600">Bangalore, India</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">My grades improved from C to A+ in mathematics! I feel more confident in class now and love solving problems. Learning Abacus was the best decision my parents made!</p>
              <div className="flex text-yellow-400">★★★★★</div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-8 bg-gradient-to-r from-blue-900 to-pink-600 rounded-3xl text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Childs Future?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of successful students and start your Abacus learning journey today</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition">
              Register for Free Demo
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition">
              Contact Us
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
