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

  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

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
        <div className="w-full md:w-4/5 lg:w-3/5">
          {/* Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm mb-1">Tanggal</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded px-3 py-2 w-full"
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
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-300 text-gray-800">
                  <tr>
                    <th className="p-3">Lapangan</th>
                    <th className="p-3">Deskripsi</th>
                    <th className="p-3">Harga</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-500">
                        Tidak ada data booking
                      </td>
                    </tr>
                  ) : (
                    currentBookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="p-3 text-gray-800 font-semibold">
                          Lapangan {booking.field_id}
                        </td>
                        <td className="p-3 text-gray-800">
                          {formatDate(booking.booking_date)} <br />
                          {formatTime(booking.start_time)} ~{" "}
                          {formatTime(booking.end_time)}
                        </td>
                        <td className="p-3 font-bold text-green-700">
                          {booking.field?.weekday_price?.toLocaleString(
                            "id-ID",
                            {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }
                          )}
                        </td>
                        <td className="p-3">
                          {booking.status === "pending" && (
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                              Pending
                            </span>
                          )}
                          {booking.status === "confirmed" && (
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                              Confirmed
                            </span>
                          )}
                          {booking.status === "rejected" && (
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                              Rejected
                            </span>
                          )}
                          {booking.status === "cancelled" && (
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
                              Cancelled
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* Pagination */}
            <div className="flex justify-between items-center p-3 text-sm text-gray-800 bg-gray-50 border-t">
              <button
                className="border px-3 py-1 rounded text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                className="border px-3 py-1 rounded text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
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
