import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "@/pages/auth/AuthRegister";
import Login from "@/pages/auth/AuthLogin";
import GlobalBar from "@/layout/GlobalBar";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/*" element={<GlobalBar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
