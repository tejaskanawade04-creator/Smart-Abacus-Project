import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";  
export default function Gallery() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-16">
                
                <section className="bg-gradient-to-b from-blue-50 to-white py-20">
  <div className="max-w-7xl mx-auto px-6 text-center">
   

    <h1 className="text-5xl font-bold text-gray-900 mb-6">
      Inspiring Young Minds Through
      <span className="text-orange-500"> Smart Abacus</span>
    </h1>

    <p className="max-w-4xl mx-auto text-lg text-gray-600 leading-8 mb-12">
      Welcome to the Smart Abacus Gallery, where every photograph tells a story
      of learning, creativity, and achievement. Explore memorable moments from
      our classrooms, competitions, workshops, and special events that showcase
      our students' journey toward developing exceptional mental arithmetic
      skills, concentration, confidence, and lifelong learning abilities.
    </p>

    <div className="grid md:grid-cols-4 gap-6 text-center">
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <h3 className="text-3xl font-bold text-blue-600">500+</h3>
        <p className="text-gray-600 mt-2">Happy Students</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <h3 className="text-3xl font-bold text-blue-600">50+</h3>
        <p className="text-gray-600 mt-2">Competitions Conducted</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <h3 className="text-3xl font-bold text-blue-600">100+</h3>
        <p className="text-gray-600 mt-2">Workshops & Events</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <h3 className="text-3xl font-bold text-blue-600">95%</h3>
        <p className="text-gray-600 mt-2">Parent Satisfaction</p>
      </div>
    </div>
  </div>
</section>
                {/* Add gallery content here */}
            </main>
            <Footer />
        </div>
    );
}