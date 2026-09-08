import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import LandingPage from "./pages/LandingPage";
import { LoginPage, RegisterPage } from "./pages/AuthPages";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import PaymentPage from "./pages/PaymentPage";
import {
  AdminLogin,
  AdminDashboard,
  AdminFoods,
  AdminDailyMenu,
  AdminHolidays,
  AdminOrders,
} from "./pages/AdminPages";
function Guard({ admin = false, member = false, children }) {
  const c = useApp();
  if (admin) return c.admin ? children : <Navigate to="/admin/login" />;
  if (member) return c.user || c.admin ? children : <Navigate to="/login" />;
  return c.user ? children : <Navigate to="/login" />;
}
function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PublicLayout />}>
          <Route
            path="/about"
            element={
              <Guard member>
                <AboutPage />
              </Guard>
            }
          />
          <Route
            path="/home"
            element={
              <Guard>
                <HomePage />
              </Guard>
            }
          />
          <Route
            path="/orders"
            element={
              <Guard>
                <OrdersPage />
              </Guard>
            }
          />
          <Route
            path="/payment"
            element={
              <Guard>
                <PaymentPage />
              </Guard>
            }
          />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={
              <Guard admin>
                <AdminDashboard />
              </Guard>
            }
          />
          <Route
            path="/admin/foods"
            element={
              <Guard admin>
                <AdminFoods />
              </Guard>
            }
          />
          <Route
            path="/admin/daily-menu"
            element={
              <Guard admin>
                <AdminDailyMenu />
              </Guard>
            }
          />
          <Route
            path="/admin/holidays"
            element={
              <Guard admin>
                <AdminHolidays />
              </Guard>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <Guard admin>
                <AdminOrders />
              </Guard>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppProvider>
  );
}
export default App;
