import type { NavigateFunction } from "react-router-dom";

export const redirectByRole = (role: string, navigate: NavigateFunction) => {
  switch (role) {
    case "admin":
      navigate("/admin/home");
      break;
    case "manager":
      navigate("/manager");
      break;
    default:
      navigate("/");
      break;
  }
};
