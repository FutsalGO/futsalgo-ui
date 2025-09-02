import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/redux/GlobalStore";

export default function RoleRoute({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user)

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;

  return children;
}
