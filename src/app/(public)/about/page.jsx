import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
  
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">About Smart Abacus</h1>
          <p className="text-xl text-blue-100">Empowering minds through excellence in Abacus and Mental Arithmetic education</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-4">
              To revolutionize mathematics education by combining the ancient wisdom of Abacus learning with modern pedagogical techniques. We are committed to developing students who demonstrate exceptional computational skills, enhanced concentration, and improved memory retention.
            </p>
            <p className="text-gray-600 text-lg">
              Our approach ensures that every student, regardless of background, achieves excellence in mathematics and builds confidence in problem-solving abilities.
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-pink-600 mb-6">Our Vision</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-pink-600 font-bold mr-3">✓</span>
                <span>To be the leading Abacus education provider globally</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 font-bold mr-3">✓</span>
                <span>To empower 1 million students with mental arithmetic excellence</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 font-bold mr-3">✓</span>
                <span>To foster a community of lifelong learners</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 font-bold mr-3">✓</span>
                <span>To set international standards in mathematics education</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Smart Abacus?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">10,000+</div>
              <p className="text-gray-200">Active Students Worldwide</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">50+</div>
              <p className="text-gray-200">Certified Expert Instructors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">95%</div>
              <p className="text-gray-200">Student Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">15+</div>
              <p className="text-gray-200">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-pink-600">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Excellence</h3>
            <p className="text-gray-600">We maintain the highest standards in teaching methodologies, curriculum design, and student outcomes.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-600">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Innovation</h3>
            <p className="text-gray-600">Continuously evolving our teaching techniques by integrating modern technology with traditional wisdom.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-pink-600">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Integrity</h3>
            <p className="text-gray-600">Transparent practices and honest commitment to student success and parental satisfaction.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Meet Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center hover:shadow-xl transition">
              <div className="w-full h-40 bg-gradient-to-br from-pink-300 to-blue-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Founder & CEO</h3>
                <p className="text-gray-600 mb-2">20+ years in mathematics education</p>
                <p className="text-sm text-gray-500">International certification in Abacus methodology</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center hover:shadow-xl transition">
              <div className="w-full h-40 bg-gradient-to-br from-blue-300 to-pink-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Head of Curriculum</h3>
                <p className="text-gray-600 mb-2">M.Ed with specialization in STEM</p>
                <p className="text-sm text-gray-500">Designed curriculum for 5000+ students</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center hover:shadow-xl transition">
              <div className="w-full h-40 bg-gradient-to-br from-pink-300 to-blue-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Lead Instructor</h3>
                <p className="text-gray-600 mb-2">National Championship winner</p>
                <p className="text-sm text-gray-500">Certified Abacus instructor since 2008</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    
  );
}
