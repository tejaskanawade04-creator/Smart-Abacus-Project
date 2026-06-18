import Link from "next/link";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

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

      <Footer />
    </div>
  );
}