import futsallogoname from "@/assets/futsalgoname.svg";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Lapangan", path: "/field" },
    { name: "Riwayat", path: "/history" },
  ];

  return (
    <div className="flex items-center gap-6">
      {/* Logo */}
      <img src={futsallogoname} alt="Logo" className="w-20 object-contain" />

      {/* Navigation */}
      <nav className="flex gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-xl font-semibold transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-800 hover:bg-green-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
