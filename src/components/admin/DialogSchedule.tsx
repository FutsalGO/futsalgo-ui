import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/GlobalStore";
import { createBookingAdmin, resetBookingState } from "@/slices/bookingSlice";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import instance from "@/server/Axios";
import DialogCreateBooking from "./DialogCreateBooking";

interface Schedules {
  [key: string]: {
    day: string | undefined;
    times: {
      [key: string]: {
        field_id: number;
        booking_date: Date;
        start_time: Date;
        end_time: Date;
        is_booked: boolean;
      };
    };
  };
}

interface ScheduleDialogProps {
  fieldId: number;
  image?: string; // opsional
}

type Slot = {
  start_time: string; // ISO string dari backend
  end_time: string; // ISO string dari backend
  is_booked: boolean;
};

function formatTime(dateStr: string): string {
  const timePart = dateStr.split("T")[1];
  if (!timePart) return "00:00";

  const [h = "00", m = "00"] = timePart.split(":");

  const hours = h.padStart(2, "0");
  const minutes = m.padStart(2, "0");

  return `${hours}:${minutes}`;
}

export default function ScheduleDialog({
  fieldId,
  image,
}: ScheduleDialogProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.schedules);

  const [schedules, setSchedules] = useState<Schedules>({});

  const bookingState = useSelector((state: RootState) => state.booking);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<Slot | null>(null);

  async function fetchData() {
    const res = await instance.get(`schedules/${fieldId}`);
    setSchedules(res.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // reset state booking saat keluar
  useEffect(() => {
    return () => {
      dispatch(resetBookingState());
    };
  }, [dispatch]);

  // auto-refresh schedules setelah booking sukses
  useEffect(() => {
    if (bookingState.success) {
      fetchData();
      setSelectedTime(null); // reset pilihan jam
    }
  }, [bookingState.success, fieldId]);

  const dates = Object.keys(schedules);

  const handleBooking = (name: string, phone: string) => {
    try {
      if (!selectedDate || !selectedTime) {
        alert("Pilih tanggal dan jam dulu!");
        return;
      }

      dispatch(
        createBookingAdmin({
          customer_name: name,
          customer_phone: phone,
          field_id: fieldId,
          booking_date: selectedDate,
          start_time: `${formatTime(selectedTime.start_time)}:00`,
          end_time: `${formatTime(selectedTime.end_time)}:00`,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogCreateBooking
        open={open}
        onOpenChange={setOpen}
        handleBooking={handleBooking}
      />
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-5 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 shadow-md transition">
            Lihat Jadwal
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[850px] rounded-2xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              Booking Lapangan
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Pilih hari dan jam yang tersedia untuk melakukan booking.
            </DialogDescription>
          </DialogHeader>

          {/* Feedback booking */}
          {bookingState.loading && (
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium">
              Sedang memproses booking...
            </div>
          )}
          {bookingState.success && (
            <div className="p-3 rounded-lg bg-green-50 text-green-600 text-sm font-medium">
              Booking berhasil!
            </div>
          )}
          {bookingState.error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
              {bookingState.error}
            </div>
          )}

          {loading ? (
            <p className="text-center text-gray-500">Loading jadwal...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Image */}
              <div className="w-full h-64 flex items-center justify-center rounded-xl overflow-hidden border shadow-sm">
                {image ? (
                  <img
                    src={`http://localhost:3000/uploadField/${image}`}
                    alt="Lapangan Futsal"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">
                    Tidak ada gambar
                  </span>
                )}
              </div>

              {/* Jadwal */}
              <div className="flex flex-col gap-6">
                {/* Hari */}
                <div className="flex flex-wrap gap-3">
                  {dates.map((date) => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? "default" : "outline"}
                      className={`flex-1 min-w-[110px] rounded-xl py-3 ${
                        selectedDate === date ? "shadow-md" : ""
                      }`}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null); // reset waktu ketika ganti hari
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">
                          {schedules[date].day}
                        </span>
                        <span className="text-xs text-gray-500">{date}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Jam */}
                <div className="flex flex-wrap gap-3">
                  {selectedDate &&
                    Object.values(schedules[selectedDate].times).map(
                      (slot: any) => {
                        const startWIB = formatTime(slot.start_time);
                        const endWIB = formatTime(slot.end_time);

                        // Gunakan slot.start_time asli untuk logika selected
                        const isSelected =
                          selectedTime?.start_time === slot.start_time;

                        return (
                          <Button
                            key={slot.start_time}
                            variant={
                              slot.is_booked
                                ? "destructive"
                                : isSelected
                                ? "default"
                                : "secondary"
                            }
                            className={`min-w-[110px] rounded-full text-sm ${
                              isSelected ? "shadow-md" : ""
                            }`}
                            disabled={slot.is_booked}
                            onClick={() => setSelectedTime(slot)}
                          >
                            {startWIB} - {endWIB}
                          </Button>
                        );
                      }
                    )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="rounded-full px-5 py-2 text-gray-700"
              >
                Batal
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={() => setOpen(true)}
              disabled={bookingState.loading}
              className="rounded-full px-6 py-2"
            >
              {bookingState.loading ? "Booking..." : "Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
