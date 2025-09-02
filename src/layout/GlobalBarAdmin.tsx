import Sidebar from "@/components/admin/Sidebar";
import Booking from "@/pages/admin/booking/Booking";
import Field from "@/pages/admin/field/Field";
import { Route, Routes } from "react-router-dom";

export default function GlobalBarAdmin() {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-100 h-screen">
        <Sidebar />
      </div>

      <div className="w-full">
        <Routes>
          <Route path="/" element={<Field />} />
          <Route path="/field" element={<Field />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </div>
  )
}