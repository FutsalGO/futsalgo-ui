// src/slices/fieldSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/server/Axios"; // pastikan ini sudah setup

interface Field {
  id: number;
  name: string;
  description?: string;
  weekday_price: number;
  weekend_price?: number;
  imageUrl?: string;
  created_at: string;
}

interface FieldState {
  fields: Field[];
  loading: boolean;
  error: string | null;
}

const initialState: FieldState = {
  fields: [],
  loading: false,
  error: null,
};

// ✅ Thunk: ambil semua lapangan
export const fetchFields = createAsyncThunk(
  "fields/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("fields/");
      return response.data.data; // asumsi backend return array of fields
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch fields"
      );
    }
  }
);

const fieldSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFields.fulfilled, (state, action) => {
        state.loading = false;
        state.fields = action.payload;
      })
      .addCase(fetchFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default fieldSlice.reducer;
