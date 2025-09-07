// src/redux/slices/bookingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/server/Axios";

interface Booking {
  id: number;
  field_id: number;
  customer_name: string;
  customer_phone: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  created_at: string;
  // tambahkan field lain sesuai schema prisma
}

interface CreateBookingPayload {
  field_id: number;
  booking_date: string; // format: YYYY-MM-DD
  start_time: string;
  end_time: string;
}

interface CreateBookingAdminPayload {
  field_id: number;
  customer_name: string;
  customer_phone: string;
  booking_date: string; // format: YYYY-MM-DD
  start_time: string;
  end_time: string;
}

interface GetBookingFilters {
  date?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
  success: false,
};

// 🔹 Create booking
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (payload: CreateBookingPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("bookings/user", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create booking"
      );
    }
  }
);

// 🔹 Create booking admin
export const createBookingAdmin = createAsyncThunk(
  "booking/createBooking",
  async (payload: CreateBookingAdminPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("bookings/admin", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create booking"
      );
    }
  }
);

// 🔹 Get bookings
export const getBookings = createAsyncThunk(
  "booking/getBookings",
  async (filters: GetBookingFilters, { rejectWithValue }) => {
    try {
      const response = await axios.get("bookings/user", {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // 🔹 Create booking
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 🔹 Get bookings
    builder
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.bookings = action.payload;
        } else {
          state.bookings = action.payload.data || [];
        }
      })

      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
