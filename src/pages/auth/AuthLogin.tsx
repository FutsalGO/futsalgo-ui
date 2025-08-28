import { Link, useNavigate } from "react-router-dom";
import futsalLogo from "@/assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/GlobalStore";
import { redirectByRole } from "@/lib/redirectByrole";
import { loginUser } from "@/slices/authSlice";
import { useState } from "react";

export default function AuthLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      const userRole = result.payload.user.role;
      redirectByRole(userRole, navigate);
    }
  };

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

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email/Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-800 rounded-md bg-gray-100 text-gray-800"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-full font-semibold transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="text-red-600 text-center">{error}</p>}

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
