import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "@/pages/auth/AuthRegister";
import Login from "@/pages/auth/AuthLogin";
import PublicRoute from "./pages/handlePage/PublicRoute";
import PrivateRoute from "@/pages/handlePage/PrivateRoutet";
import GlobalBar from "@/layout/GlobalBar";
import RoleRoute from "@/pages/handlePage/RoleRoute";
import HomeAdmin from "@/pages/admin/home/HomeAdmin";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin/home"
            element={
              <RoleRoute role="admin">
                <HomeAdmin />
              </RoleRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <GlobalBar />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
