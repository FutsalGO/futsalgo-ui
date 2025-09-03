// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/authSlice";
import fieldReducer from "@/slices/fieldSlice";
import scheduleReducer from "@/slices/scheduleSlice";
import bookingReducer from "@/slices/bookingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    fields: fieldReducer,
    schedules: scheduleReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
