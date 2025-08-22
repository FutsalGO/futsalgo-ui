import Menu from "@/pages/menu/Menu";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "@/pages/home/Home";
import Field from "@/pages/field/Field";
import Booking from "@/pages/booking/booking";
import Fasilitas from "@/pages/fasilitas/fasilitas";
import About from "@/pages/aboutme/AboutMe";

export default function GlobalBar() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Top Navigation */}
      <div className="flex items-center justify-between w-full px-6 py-3 bg-gray-300 shadow-md">
        {/* Menu kiri */}
        <Menu />

        {/* Area kanan */}
        <div className="flex items-center gap-4">
          {/* Info placeholder */}
          <div className="text-black font-semibold">02</div>

          {/* Tombol Login */}
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 hover:bg-green-700 text-white text-1xl font-semibold px-3 py-2 rounded-md shadow transition"
          >
            Login
          </button>

          {/* Tombol Register */}
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-1xl font-semibold px-3 py-2 rounded-md shadow transition"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-red-600 hover:bg-red-700 text-white text-1xl font-semibold px-3 py-2 rounded-md shadow transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Routing */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/field" element={<Field />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/fasilitas" element={<Fasilitas />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}
