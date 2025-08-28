// src/pages/auth/AuthRegister.tsx
import { Link, useNavigate } from "react-router-dom";
import futsalLogo from "@/assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { AppDispatch, RootState } from "@/redux/GlobalStore";
import { registerUser } from "@/slices/authSlice";

export default function AuthRegister() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      registerUser({ name, email, phone, password })
    );

    if (registerUser.fulfilled.match(result)) {
      navigate("/"); // Redirect ke halaman Home setelah register sukses
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
          <h2 className="text-3xl font-bold">Register to FutsalGo</h2>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-800 rounded-md bg-gray-100 text-gray-800"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-800 rounded-md bg-gray-100 text-gray-800"
            required
          />

          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-800 rounded-md bg-gray-100 text-gray-800"
            pattern="[0-9]*"
            inputMode="numeric"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-800 rounded-md bg-gray-100 text-gray-800"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-full font-semibold transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <p className="text-center text-sm text-gray-800">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
