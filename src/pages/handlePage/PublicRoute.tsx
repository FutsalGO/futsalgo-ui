// src/pages/public/PublicRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/redux/GlobalStore";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokenFromRedux = useSelector((state: RootState) => state.auth.token);
  const tokenFromLocalStorage = localStorage.getItem("token");

  const token = tokenFromRedux || tokenFromLocalStorage;

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
