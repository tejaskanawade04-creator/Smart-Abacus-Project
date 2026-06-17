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
      </main>

      <Footer />
    </div>
  );
}
