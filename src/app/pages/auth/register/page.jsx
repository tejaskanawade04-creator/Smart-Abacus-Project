import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 text-center">Create Account</h1>
        <p className="text-gray-600 text-center mb-8">Join Smart Abacus and start learning</p>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Confirm your password"
            />
          </div>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-600 text-sm">
              I agree to the{" "}
              <span className="text-orange-500 hover:text-orange-600 cursor-pointer">
                Terms and Conditions
              </span>
            </span>
          </label>

          <button 
            type="submit" 
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/pages/auth/login" className="text-orange-500 hover:text-orange-600 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
