import Sidebar from "@/components/admin/Sidebar";
import Booking from "@/pages/admin/booking/booking";
import CreateBooking from "@/pages/admin/create-booking/CreateBooking";
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
          <Route path="/" element={<CreateBooking />} />
          <Route path="/create-booking" element={<CreateBooking />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/fields" element={<Field />} />
        </Routes>
      </div>
    </div>
  )
}