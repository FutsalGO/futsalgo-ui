import futsallogoname from "@/assets/futsalgoname.svg";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Field", path: "/field" },
    { name: "Booking", path: "/booking" },
    { name: "Fasilitas", path: "/fasilitas" },
    { name: "About Me", path: "/about" },
  ];

  return (
    <div className="flex items-center gap-6">
      {/* Logo */}
      <img src={futsallogoname} alt="Logo" className="w-10 object-contain" />

      {/* Navigation */}
      <nav className="flex gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-1xl font-semibold transition ${
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
