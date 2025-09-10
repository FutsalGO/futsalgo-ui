import { formatDate, formatTime } from "@/lib/dateFormat";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Booking } from "@/types/booking";
import instance from "@/server/Axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { ConfirmStatusDialog } from "@/components/admin/DialogBookingStatusChange";

interface Props {
  booking: Booking;
  setBookings: (bookings: any) => void;
}

export default function BookingRow({ booking, setBookings }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(booking.status);

  const handleConfirm = (status: string) => {
    instance
      .patch(`/bookings/admin/${booking.id}`, { status })
      .then(() => {
        setBookings((prevBookings: any) => {
          if (prevBookings) {
            return prevBookings.map((b: Booking) =>
              b.id === booking.id ? { ...b, status } : b
            );
          }
          return null;
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setOpen(false));
  };

  return (
    <TableRow>
      <ConfirmStatusDialog
        open={open}
        onOpenChange={setOpen}
        handleConfirm={handleConfirm}
        status={status}
      />
      <TableCell className="font-medium p-3">{booking.field.name}</TableCell>
      <TableCell className="p-3">
        {`${formatDate(booking.booking_date)} \n ${formatTime(
          booking.start_time
        )}~${formatTime(booking.end_time)}`}
      </TableCell>
      <TableCell className="text-green-700 font-bold p-3">
        {booking.field?.weekday_price?.toLocaleString(
          "id-ID",
          {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }
        )}
      </TableCell>
      <TableCell className="p-3">
        <Select
          value={booking.status}
          onValueChange={(val) => {
            setStatus(val);
            setOpen(true);
          }}
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
  );
}
