import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import instance from "@/server/Axios";
import { type Booking } from "@/types/booking";
import BookingRow from "@/components/admin/BookingRow";

export default function Booking() {
  const limit = 25
  const [page, setPage] = useState<number>(0)
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState<string>("pending")
  const [bookings, setBookings] = useState<Booking[] | null>(null)
  const [reachEnd, setReachEnd] = useState<boolean>(true)

  useEffect(() => {
    instance
      .get(`/bookings/admin?limit=${limit}&offset=${page * limit}&date=${date}${status == 'all' ? '' : `&status=${status}`}`)
      .then((res) => {
        const data: Booking[] = res.data.data
        setReachEnd(data.length < limit)
        setBookings(data)
      })
      .catch((err) => console.log(err))
  }, [page, date, status])

  return (
    <div className="p-6 min-h-screen max-h-screen overflow-auto">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-green-600">Daftar Booking</h2>

        {/* Filter Form */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          {/* Filter Tanggal */}
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setPage(0) // reset ke halaman pertama
                setDate(e.target.value)
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Filter Status */}
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">Status</label>
            <Select
              value={status}
              onValueChange={(val) => {
                setPage(0) // reset ke halaman pertama
                setStatus(val)
              }}
            >
              <SelectTrigger className="w-[180px] border-gray-300">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="all">Semua</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

              
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          {/* Tabel */}
        <Table className="w-full text-left border-collapse">
          <TableHeader className="text-base font-bold bg-gray-300 text-gray-800">
            <TableRow>
              <TableHead className="p-3">Lapangan</TableHead>
              <TableHead className="p-3">Deskripsi</TableHead>
              <TableHead className="p-3">Harga</TableHead>
              <TableHead className="p-3">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.length == 0 && (
              <TableRow>
                <TableCell colSpan={4} className="p-4 text-base text-center text-gray-500">
                  Tidak ada data booking
                </TableCell>
              </TableRow>
            )}
            {bookings?.map((booking) => (
              <BookingRow key={booking.id} booking={booking} setBookings={setBookings} />
            ))}
          </TableBody>
        </Table>
        

        {/* Pagination */}
        <div className="flex justify-between items-center p-2 border-t-1">
          <Button
            variant="outline"
            className="border px-3 py-1 rounded text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
          >
            Prev
          </Button>
          <span>Page {page + 1}</span>
          <Button
            variant="outline"
            className="border px-3 py-1 rounded text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setPage((p) => p + 1)}
            disabled={reachEnd}
          >
            Next
          </Button>
        </div>

        </div>
      </div>
    </div>
  )
}
