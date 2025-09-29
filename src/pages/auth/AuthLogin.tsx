// src/pages/auth/AuthLogin.tsx
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/GlobalStore";
import { redirectByRole } from "@/lib/redirectByrole";
import { loginUser } from "@/slices/authSlice";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import futsalLogo from "@/assets/futsalgoname.svg";

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
    <div className="min-h-screen flex items-center justify-center bg-[#F1F0E9]">
      <div className="w-full h-dvh bg-white rounded-2xl shadow-lg flex overflow-hidden">
        {/* Sisi kanan - Banner */}
        <div className="w-1/2 bg-gradient-to-b from-green-600 to-green-400 flex flex-col justify-center items-center text-white p-10">
          {/* Logo */}
          <img
            src={futsalLogo}
            alt="FutsalGo Logo"
            className="w-100 h-100 mb-6"
          />
        </div>
        {/* Sisi kiri - Form */}
        <div className="flex flex-col justify-center items-center w-3/5 ">
          <div className="w-1/2 p-10 flex flex-col justify-center border rounded-sm shadow gap-3.5">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Selamat Datang Kembali!
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 gap-3.5">
                <Mail className="text-green-600 w-5 h-5 mr-2" />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xl w-full bg-transparent focus:outline-none text-gray-700"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 ">
                <Lock className="text-green-600 w-5 h-5 mr-2" />
                <input
                  type="password"
                  placeholder="Kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-xl w-full bg-transparent focus:outline-none text-gray-700"
                  required
                />
              </div>

              {/* Ingat + Lupa Password */}
              <div className="flex justify-between text-sm text-gray-600 mt-6">
                <label className="flex items-center gap-1 text-xl">
                  <input type="checkbox" className=" accent-green-600" />
                  Ingat saya
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xl text-green-600 hover:underline"
                >
                  Lupa kata sandi?
                </Link>
              </div>

              {/* Tombol */}
              <button
                type="submit"
                className="w-full mt-2 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-md hover:opacity-90 transition"
                disabled={loading}
              >
                {loading ? "Sedang masuk..." : "MASUK"}
              </button>
            </form>

            {/* Error */}
            {error && <p className="text-red-600 text-center mt-2">{error}</p>}

            {/* Footer */}
            <p className="text-xl text-center  text-gray-600 mt-4">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-green-600 font-semibold hover:underline"
              >
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
