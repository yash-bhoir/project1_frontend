import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import App from "./App";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import ProtectedLayout from "./components/utility/ProtectedRoute";
import Unauthorized from "./components/utility/Unauthorized";
import "./index.css";
import Home from "./components/home/Home";
import NotFound from "./components/utility/NotFound";
import Admin from "./components/admin/Admin";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          {/* Redirect to SignIn */}
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/notFound" element={<NotFound />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to="/notFound" />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element.");
}
