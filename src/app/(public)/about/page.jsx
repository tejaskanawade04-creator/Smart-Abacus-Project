import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
  
      {/* Header */}
     

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-4">
              At Smart Abacus, we believe that every student can excel in mathematics. Our mission is to provide innovative, interactive, and personalized learning experiences that make mathematics fun and engaging.
            </p>
            <p className="text-gray-600 text-lg">
              We combine traditional teaching methods with modern technology to create a comprehensive learning platform.
            </p>
          </div>
          <div className="bg-blue-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Key Facts</h3>
            <ul className="space-y-3 text-gray-700">
              <li>✓ Over 10,000+ Active Students</li>
              <li>✓ 50+ Expert Instructors</li>
              <li>✓ 200+ Hours of Video Content</li>
              <li>✓ 95% Student Success Rate</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="text-center">
                <div className="w-24 h-24 bg-blue-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-blue-900">Team Member {member}</h3>
                <p className="text-gray-600">Education Specialist</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
    
  );
}
