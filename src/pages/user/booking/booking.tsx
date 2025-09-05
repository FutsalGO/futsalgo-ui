import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/GlobalStore";
import { getBookings } from "@/slices/bookingSlice";

export default function BookingList() {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, loading } = useSelector(
    (state: RootState) => state.booking
  );

  const [statusFilter, setStatusFilter] = useState("Pending");
  const [dateFilter, setDateFilter] = useState("2025-09-03");

  useEffect(() => {
    dispatch(getBookings({ date: dateFilter, status: statusFilter }));
  }, [dispatch, dateFilter, statusFilter]);

  return (
    <div className="p-6">
      <h2 className="text-green-600 font-bold text-xl mb-4">Daftar Booking</h2>

      {/* Filter */}
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Tanggal</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Semua</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-green-50">
              <tr>
                <th className="p-3">Lapangan</th>
                <th className="p-3">Deskripsi</th>
                <th className="p-3">Harga</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t">
                  <td className="p-3 font-semibold">
                    Lapangan {booking.field_id}
                  </td>
                  <td className="p-3">
                    {new Date(booking.booking_date).toLocaleDateString(
                      "id-ID",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}{" "}
                    {booking.start_time}~{booking.end_time}
                  </td>
                  <td className="p-3 text-yellow-500 font-medium">20000</td>
                  <td className="p-3 font-medium">
                    {booking.status === "pending" && (
                      <span className="text-blue-600">Pending</span>
                    )}
                    {booking.status === "confirmed" && (
                      <span className="text-green-600">Confirmed</span>
                    )}
                    {booking.status === "rejected" && (
                      <span className="text-red-600">Rejected</span>
                    )}{" "}
                    {booking.status === "cancelled" && (
                      <span className="text-red-600">Cancelled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination (masih statis) */}
        <div className="flex justify-between items-center p-3 text-sm text-gray-600">
          <button className="border px-3 py-1 rounded text-gray-500" disabled>
            Prev
          </button>
          <span>Page 1</span>
          <button className="border px-3 py-1 rounded text-gray-500" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
