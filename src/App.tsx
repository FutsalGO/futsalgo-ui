import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "@/pages/auth/AuthRegister";
import Login from "@/pages/auth/AuthLogin";
import PublicRoute from "@/pages/handlePage/PublicRoute";
import PrivateRoute from "@/pages/handlePage/PrivateRoutet";
import GlobalBar from "@/layout/GlobalBar";
import RoleRoute from "@/pages/handlePage/RoleRoute";
import HomeAdmin from "@/pages/admin/home/HomeAdmin";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/GlobalStore";
import GlobalBarAdmin from "./layout/GlobalBarAdmin";

export default function App() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {(user?.role === 'admin') && (
            <Route
              path="/*"
              element={
                <RoleRoute role="admin">
                  <GlobalBarAdmin />
                </RoleRoute>
              }
            />
          )}

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
          {(user?.role === 'user') && (
            <Route
            path="/*"
            element={
              <PrivateRoute>
                <GlobalBar />
              </PrivateRoute>
            }
          />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}
