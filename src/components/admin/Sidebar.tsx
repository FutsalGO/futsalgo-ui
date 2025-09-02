import futsallogoname from "@/assets/futsalgoname.svg";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { name: "Field", path: "/field" },
    { name: "Booking", path: "/booking" },
  ];

  return (
    <aside className="h-screen w-64 bg-gray-100 shadow-md flex flex-col p-4">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3">
        <img src={futsallogoname} alt="Logo" className="w-10 object-contain" />
        <h1 className="text-2xl font-bold text-green-600">FutsalGo</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full justify-start rounded-xl p-3 font-semibold transition ${
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

      {/* Logout Button */}
      <button
        className="mt-auto flex items-center gap-2 p-3 w-full justify-center rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        onClick={() => console.log("Logout clicked")}
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </aside>
  );
}