import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 text-center">Reset Password</h1>
        <p className="text-gray-600 text-center mb-8">
          Enter your new password below.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">New Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter new password"
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

          <button 
            type="submit" 
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600"
          >
            Reset Password
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Remember your password?{" "}
          <Link href="/pages/auth/login" className="text-orange-500 hover:text-orange-600 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
