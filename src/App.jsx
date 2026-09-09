import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import LandingPage from "./pages/LandingPage";
import { LoginPage, RegisterPage } from "./pages/AuthPages";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import HomeModernPage from "./pages/HomeModernPage";
import OrdersHistorySafePage from "./pages/OrdersHistorySafePage";
import PaymentSafePage from "./pages/PaymentSafePage";
import AdminDashboardModernPage from "./pages/AdminDashboardModernPage";
import AdminLoginCenteredPage from "./pages/AdminLoginCenteredPage";
import { AdminDailyMenu, AdminHolidays } from "./pages/AdminPages";
import AdminFoodsPopularPage from "./pages/AdminFoodsPopularPage";
import AdminOrdersSafePage from "./pages/AdminOrdersSafePage";
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
                <HomeModernPage />
              </Guard>
            }
          />
          <Route
            path="/orders"
            element={
              <Guard>
                <OrdersHistorySafePage />
              </Guard>
            }
          />
          <Route
            path="/profile"
            element={
              <Guard>
                <ProfilePage />
              </Guard>
            }
          />
          <Route
            path="/payment"
            element={
              <Guard>
                <PaymentSafePage />
              </Guard>
            }
          />
        </Route>
        <Route path="/admin/login" element={<AdminLoginCenteredPage />} />
        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={
              <Guard admin>
                <AdminDashboardModernPage />
              </Guard>
            }
          />
          <Route
            path="/admin/foods"
            element={
              <Guard admin>
                <AdminFoodsPopularPage />
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
                <AdminOrdersSafePage />
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
