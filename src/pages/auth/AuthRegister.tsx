// src/pages/auth/AuthRegister.tsx
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { AppDispatch, RootState } from "@/redux/GlobalStore";
import { registerUser } from "@/slices/authSlice";
import { Mail, Lock, User } from "lucide-react"; // icon lucide-react
import futsalLogo from "@/assets/futsalgoname.svg";

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
      navigate("/"); // redirect ke home kalau sukses
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F0E9]">
      <div className="w-full h-dvh bg-white rounded-2xl shadow-lg flex overflow-hidden">
        {/* Bagian Kanan - Welcome */}
        <div className="w-1/2 bg-gradient-to-b from-green-600 to-green-400 flex flex-col justify-center items-center text-white p-10">
          {/* Logo */}
          <img
            src={futsalLogo}
            alt="FutsalGo Logo"
            className="w-100 h-100 mb-6"
          />
        </div>
        {/* Bagian Kiri - Form */}
        <div className="flex flex-col justify-center items-center w-3/5 ">
          <div className="w-1/2 p-10 flex flex-col justify-center border rounded-sm shadow gap-3.5">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Halo, Teman!
            </h2>

            <form className="space-y-4" onSubmit={handleRegister}>
              {/* Nama */}
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 gap-3.5">
                <User className="text-green-600 w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xl w-full bg-transparent focus:outline-none text-gray-700"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 shadow-sm">
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

              {/* Nomor Telepon */}
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 shadow-sm">
                <span className="text-green-600 w-5 h-5 mr-2">📞</span>
                <input
                  type="tel"
                  placeholder="Nomor Telepon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-xl w-full bg-transparent focus:outline-none text-gray-700"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 shadow-sm">
                <Lock className="text-green-600 w-5 h-5 mr-2" />
                <input
                  type="password"
                  placeholder="Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-xl w-full bg-transparent focus:outline-none text-gray-700"
                  required
                />
              </div>

              {/* Persetujuan */}
              <div className="flex justify-between text-sm text-gray-600 mt-6">
                <input
                  type="checkbox"
                  className="ml-4 accent-green-600"
                  required
                />
                <span>
                  Saya sudah membaca dan setuju dengan{" "}
                  <Link to="#" className="text-green-600 underline">
                    Syarat & Ketentuan
                  </Link>
                </span>
              </div>

              {/* Tombol */}
              <button
                type="submit"
                className="w-full py-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-md hover:opacity-90 transition"
                disabled={loading}
              >
                {loading ? "Sedang mendaftar..." : "BUAT AKUN"}
              </button>
            </form>

            {/* Error */}
            {error && <p className="text-red-600 text-center mt-2">{error}</p>}

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Masuk
              </Link>
            </p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
