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
import { formatDate, formatTime } from "@/lib/dateFormat";
import instance from "@/server/Axios";

interface Field {
  id: number;
  name: string;
  description?: string;
  weekday_price: number;
  weekend_price?: number;
  imageUrl?: string;
  created_at: string;
}
interface Booking { 
  id: number; 
  user_id: number; 
  field_id: number; 
  customer_name: string; 
  customer_phone: string; 
  start_time: string; 
  end_time: string; 
  booking_date: string; 
  status: string; 
  field: Field;
}

export default function LapanganTable() {
  const limit = 25
  const [page, setPage] = useState<number>(0)
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState<string>("pending")
  const [bookings, setBookings] = useState<Booking[] | null>(null)
  const [reachEnd, setReachEnd] = useState<boolean>(true)

  const handleStatusChange = (id: number, status: string) => {
    instance.patch(`/bookings/admin/${id}`, { status })
      .catch((err) => console.log(err))

    setBookings((prevBookings) => {
      if (prevBookings) {
        return prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      }
      return null
    })
  }

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
      <div className="bg-white rounded-2xl shadow-lg p-4">
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

        {/* Tabel */}
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-green-600">Lapangan</TableHead>
              <TableHead className="text-green-600">Deskripsi</TableHead>
              <TableHead className="text-green-600">Harga</TableHead>
              <TableHead className="text-green-600">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.field.name}</TableCell>
                <TableCell>
                  {`${formatDate(booking.booking_date)} \n ${formatTime(booking.start_time)}~${formatTime(booking.end_time)}`}
                </TableCell>
                <TableCell className="text-yellow-500 font-semibold">{booking.field.weekday_price}</TableCell>
                <TableCell>
                  <Select
                    value={booking.status}
                    onValueChange={(val) => handleStatusChange(booking.id, val)}
                  >
                    <SelectTrigger className="w-[150px] border-blue-600 focus:ring-green-600">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
          >
            Prev
          </Button>
          <span>Page {page + 1}</span>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={() => setPage((p) => p + 1)}
            disabled={reachEnd}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
