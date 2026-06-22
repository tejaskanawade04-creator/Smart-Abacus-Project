import Link from "next/link";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

export default function Home() {
  return (

    <div
      className="absolute inset-0 bg-cover bg-center scale-100"
      style={{
        backgroundImage: "url('/images/banner.png')",
        }}
    >
 <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
       
<br></br>
<br></br> 
<br></br>
<br></br>
<br></br>
<br></br> 
<br></br>
<br></br>
<br></br>
<br></br> 
<br></br>
<br></br>
<br></br>
<br></br>
<br></br> 




        <section className="py-16 px-8 bg-white rounded-3xl my-12">
  <h2 className="text-3xl font-bold mb-4 text-blue-900">
    About Us
  </h2>

  <p className="text-gray-700">
    Smart Abacus helps children improve concentration,
    memory, creativity, and calculation speed through
    innovative learning techniques.
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


<section className="py-16 px-6 bg-white rounded-3xl shadow-lg">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-blue-900 mb-6">
      Franchise Opportunities
    </h2>

    <p className="text-lg text-gray-600 leading-relaxed mb-6">
      Join the Smart Abacus family and become a part of a growing educational
      network dedicated to empowering young minds. Our franchise program offers
      a proven business model, comprehensive training, and continuous support
      to help you establish a successful learning center in your community.
    </p>

    <p className="text-lg text-gray-600 leading-relaxed mb-6">
      As a Smart Abacus franchise partner, you will gain access to innovative
      teaching methodologies, structured curriculum, marketing assistance, and
      operational guidance. We believe in building long-term partnerships that
      create meaningful educational experiences for children while ensuring
      sustainable business growth for our franchisees.
    </p>

    <div className="grid md:grid-cols-3 gap-6 mt-10">
      <div className="p-6 bg-blue-50 rounded-2xl shadow-sm">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">
          Proven Business Model
        </h3>
        <p className="text-gray-600">
          Start your educational venture with a trusted and successful franchise
          system designed for long-term growth.
        </p>
      </div>

      <div className="p-6 bg-blue-50 rounded-2xl shadow-sm">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">
          Training & Support
        </h3>
        <p className="text-gray-600">
          Receive complete training, teaching resources, and ongoing guidance
          from our experienced team.
        </p>
      </div>

      <div className="p-6 bg-blue-50 rounded-2xl shadow-sm">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">
          Growth Opportunities
        </h3>
        <p className="text-gray-600">
          Make a positive impact on children education while building a
          rewarding and scalable business.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="py-16 md:py-20 bg-gray-100 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600">
          Smart Abacus  
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
          Empowering young minds through Abacus and Mental Arithmetic.
        </p>

        <button className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
          Join Now
        </button>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            About Us
          </h2>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Smart Abacus helps children improve concentration,
            memory, creativity, and calculation speed through
            innovative learning techniques.
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Our Courses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">
                Beginner Level
              </h3>
              <p className="text-gray-600">
                Introduction to Abacus and basic calculations.
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">
                Intermediate Level
              </h3>
              <p className="text-gray-600">
                Advanced calculations and mental arithmetic.
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-semibold mb-2">
                Expert Level
              </h3>
              <p className="text-gray-600">
                High-speed calculation and competition training.
              </p>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
