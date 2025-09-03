// src/redux/slices/bookingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/server/Axios";

interface BookingState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface CreateBookingPayload {
  field_id: number;
  booking_date: string; // format: YYYY-MM-DD
  start_time: string;
  end_time: string;
}

const initialState: BookingState = {
  loading: false,
  error: null,
  success: false,
};

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
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
