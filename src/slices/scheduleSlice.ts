// src/slices/scheduleSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/server/Axios";

interface TimeSlot {
  field_id: number;
  booking_date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface DaySchedule {
  day: string;
  times: { [key: string]: TimeSlot };
}

interface SchedulesState {
  schedules: { [date: string]: DaySchedule };
  loading: boolean;
  error: string | null;
}

const initialState: SchedulesState = {
  schedules: {},
  loading: false,
  error: null,
};

// ✅ Thunk: ambil jadwal berdasarkan field_id
export const fetchSchedules = createAsyncThunk(
  "schedules/fetchByField",
  async (fieldId: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`schedules/${fieldId}`);
      return res.data.data; // backend sudah return object schedules
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil jadwal"
      );
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default scheduleSlice.reducer;
