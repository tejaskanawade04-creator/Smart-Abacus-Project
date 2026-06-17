const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Empower Your Child</h1>
        <h2 className="text-xl font-semibold text-gray-700 mt-2">
            Indias leading abacus mental arithmetic institute
        </h2>
        <h3>
           <li>Improve concentration and memory</li>
           <li>Enhance cognitive abilities</li>
           <li>Boost confidence and problem-solving skills</li>
        </h3>
      </div>

      <button className="bg-orange-500 text-white px-5 py-2 rounded-full">
                Explore Courses
              </button>

<button className="bg-orange-500 text-white px-5 py-2 rounded-full">
                Book free demo class
              </button>
    </header>

  );
};

export default Header;