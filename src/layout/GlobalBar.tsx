import Menu from "@/pages/user/menu/Menu";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "@/pages/user/home/Home";
import Field from "@/pages/user/field/Field";
import Booking from "@/pages/user/booking/booking";
import Fasilitas from "@/pages/user/fasilitas/fasilitas";
import About from "@/pages/user/aboutme/AboutMe";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/slices/authSlice";
import type { RootState, AppDispatch } from "@/redux/GlobalStore";

export default function GlobalBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { token, user } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = Boolean(token);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login"); // redirect ke halaman login
  };

  return (
    <div>
      {/* Top Navigation */}
      <div className="flex items-center justify-between w-full px-6 py-3 bg-gray-300 shadow-md">
        <Menu />
        {/* Area kanan */}
        <div className="flex items-center gap-4">
          {isLoggedIn && user ? (
            <>
              <span className="text-gray-700 font-semibold">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white text-1xl font-semibold px-3 py-2 rounded-md shadow transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-green-600 hover:bg-green-700 text-white text-1xl font-semibold px-3 py-2 rounded-md shadow transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-1xl font-semibold px-3 py-2 rounded-md shadow transition"
              >
                Register
              </button>
            </>
          )}
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
