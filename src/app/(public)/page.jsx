export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 text-center bg-gray-100">
        <h1 className="text-5xl font-bold text-pink-600">
          Smart Abacus
        </h1>
        <p className="mt-4 text-lg">
          Empowering young minds through Abacus and Mental Arithmetic.
        </p>
        <button className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-lg">
          Join Now
        </button>
      </section>

      {/* About Section */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p>
          Smart Abacus helps children improve concentration,
          memory, creativity, and calculation speed through
          innovative learning techniques.
        </p>
      </section>

      {/* Courses Section */}
      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6">Our Courses</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold">Beginner Level</h3>
            <p>Introduction to Abacus and basic calculations.</p>
          </div>

          <div className="p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold">Intermediate Level</h3>
            <p>Advanced calculations and mental arithmetic.</p>
          </div>

          <div className="p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold">Expert Level</h3>
            <p>High-speed calculation and competition training.</p>
          </div>
        </div>
      </section>
    </main>
  );
}