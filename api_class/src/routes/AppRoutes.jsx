import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout"; // Make sure you have this
import StateManage from "../pages/StateManage";
import { LoginTest } from "../pages/LoginTest";
import { GuestRoute } from "./Guestroute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/state-test" element={<StateManage />}></Route>
        <Route path="/login-test" element={<LoginTest />}></Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route element={<GuestRoute />} />  
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/normal/*">
          <Route path="order" element={<>My Order</>}></Route>
          <Route path="cart" element={<>My Cart</>}></Route>
          <Route path="*" element={<>404 Not Found</>}></Route> // if path is beside above mentoined like - normal/random
        </Route>

        {/* Make a Route Protection for admin
          make a layout for admin
          make header and add logout 
          make 4 route /admin/dashboard 
          /admin/users
          /admin/categories
          /admin/products

          apply the route production in these routes
        */}

        <Route path="/admin/*">
          <Route path="dashboard" element={<>My Dashboard</>}></Route>
          <Route path="users" element={<>My Order</>}></Route>
          <Route path="categores" element={<>My Cart</>}></Route>
          <Route path="products" element={<>My Cart</>}></Route>
          <Route path="*" element={<>404 Not Found</>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
