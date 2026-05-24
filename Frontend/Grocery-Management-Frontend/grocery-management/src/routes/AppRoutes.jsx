import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import HomePage from "../pages/HomePage";
import Layout from "../components/layout/Layout";
import Inventory from "../pages/inventory/Inventory"
import Orders from "../pages/orders/Orders";
import Reports from "../pages/reports/Reports";
import Users from "../pages/users/Users";
import Settings from "../pages/settings/Settings";
import Products from "../pages/products/Products";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Layout Routes */}
      <Route element={<Layout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/products" element={<Products />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<Users />} />
      </Route>

    </Routes>
  );  
};

export default AppRoutes;