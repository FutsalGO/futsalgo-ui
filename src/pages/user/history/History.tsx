import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/GlobalStore";
import { getBookings } from "@/slices/bookingSlice";
import { formatDate, formatTime } from "@/lib/dateFormat";

export default function BookingList() {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, loading } = useSelector(
    (state: RootState) => state.booking
  );

  const [statusFilter, setStatusFilter] = useState(""); // default semua
  const [dateFilter, setDateFilter] = useState(""); // default semua

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ambil data
  useEffect(() => {
    dispatch(
      getBookings({
        date: dateFilter || undefined,
        status: statusFilter || undefined,
      })
    );
    setCurrentPage(1);
  }, [dispatch, dateFilter, statusFilter]);

  // pagination logic
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-[#F1F0E9] py-10 px-6">
      <h2 className="text-green-600 text-4xl md:text-6xl font-bold mb-6 text-center">
        Daftar Riwayat
      </h2>
      <div className="flex items-center justify-center">
        <div className="w-3/5">
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
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
            {loading ? (
              <p className="p-4">Loading...</p>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-300 text-gray-800">
                  <tr>
                    <th className="p-3">Lapangan</th>
                    <th className="p-3">Deskripsi</th>
                    <th className="p-3">Harga</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100">
                  {currentBookings.map((booking) => (
                    <tr key={booking.id} className="border-t">
                      <td className="p-3 text-gray-800 font-semibold">
                        Lapangan {booking.field_id}
                      </td>
                      <td className="p-3 text-gray-800">
                        {`${formatDate(booking.booking_date)} \n ${formatTime(
                          booking.start_time
                        )}~${formatTime(booking.end_time)}`}
                      </td>
                      <td className="p-3 text-yellow-500 font-medium">
                        {booking.field?.weekday_price}
                      </td>
                      <td className="p-3 font-medium">
                        {booking.status === "pending" && (
                          <span className="text-blue-600">Pending</span>
                        )}
                        {booking.status === "confirmed" && (
                          <span className="text-green-600">Confirmed</span>
                        )}
                        {booking.status === "rejected" && (
                          <span className="text-red-600">Rejected</span>
                        )}
                        {booking.status === "cancelled" && (
                          <span className="text-yellow-600">Cancelled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Pagination */}
            <div className="flex justify-between items-center p-3 text-sm text-gray-600">
              <button
                className="border px-3 py-1 rounded text-gray-500 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                className="border px-3 py-1 rounded text-gray-500 disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
