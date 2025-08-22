// pages/auth/AuthLogin.tsx
import { Link } from "react-router-dom";
import futsalLogo from "@/assets/logo.svg";

export default function AuthLogin() {
  return (
    <div className="flex flex-col h-screen justify-center items-center p-4 bg-gray-100">
      <div className="w-1/4 p-4 rounded-sm shadow-lg space-y-6 text-gray-800 bg-gray-300">
        <div className="flex flex-col justify-center items-center">
          <img
            src={futsalLogo}
            alt="Logo"
            className="w-34 h-auto object-contain mb-2"
          />
          <h2 className="text-3xl font-bold">Login to FutsalGo</h2>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Email/Username"
            className="w-full px-4 py-2 border border-gray-800 rounded-md bg-gray-100 text-gray-800"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-800 rounded-md bg-gray-100 text-gray-800"
          />

          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-gray-800 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="button"
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-full font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-800">
          Don’t have an account yet?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
