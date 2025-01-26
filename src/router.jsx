import { Route, Routes } from "react-router-dom";
import { Register } from "./register";
import { Login } from "./login";
import { Home } from "./home";
import { MainProvider } from "./MainProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Router = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [token]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainProvider />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};
