"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);

  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register State
  const [username, setUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // API Call Here

    alert("Login Successful!");
    router.push("/dashboard/admin");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (registerPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // API Call Here

    alert("Account Created Successfully!");

    setIsActive(false);

    setUsername("");
    setRegisterEmail("");
    setRegisterPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

        {!isActive ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-2">
              Welcome Back
            </h1>

            <p className="text-gray-500 text-center mb-8">
              Sign in to continue
            </p>

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border p-4 rounded-xl"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700"
              >
                Sign In
              </button>
            </form>

            <p className="text-center mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => setIsActive(true)}
                className="text-blue-600 font-semibold"
              >
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-2">
              Create Account
            </h1>

            <p className="text-gray-500 text-center mb-8">
              Create your new account
            </p>

            <form
              onSubmit={handleRegister}
              className="space-y-5"
            >
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="email"
                placeholder="Email"
                required
                value={registerEmail}
                onChange={(e) =>
                  setRegisterEmail(e.target.value)
                }
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="password"
                placeholder="Password"
                required
                value={registerPassword}
                onChange={(e) =>
                  setRegisterPassword(
                    e.target.value
                  )
                }
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="w-full border p-4 rounded-xl"
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700"
              >
                Create Account
              </button>
            </form>

            <p className="text-center mt-6">
              Already have an account?{" "}
              <button
                onClick={() => setIsActive(false)}
                className="text-blue-600 font-semibold"
              >
                Sign In
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}