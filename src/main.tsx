import React, { useEffect } from "react";
import App from "./App";
import "./index.css";

import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import store from "@/redux/GlobalStore";
import { setCredentials } from "@/slices/authSlice";

function RootApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        dispatch(setCredentials({ user, token }));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, [dispatch]);

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RootApp />
    </Provider>
  </React.StrictMode>
);
