
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
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold text-pink-600">Smart Abacus</h1>
          <p className="mt-4 text-lg text-slate-100">
            Empowering young minds through Abacus and Mental Arithmetic.
          </p>
          
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
