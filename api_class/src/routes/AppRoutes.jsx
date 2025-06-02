import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout"; // Make sure you have this
import StateManage from "../pages/StateManage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/state-test" element= {<StateManage/>}></Route>
        <Route path="/login-test" element= {<LoginTest/>}></Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
