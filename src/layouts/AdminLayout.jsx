import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/NavbarModern";
import AdminSidebar from "../components/admin/AdminSidebar";
export default function AdminLayout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-7xl gap-6 px-4 py-8 md:px-6 md:py-10">
        <AdminSidebar />
        <section className="min-w-0 flex-1">
          <Outlet />
        </section>
      </main>
    </>
  );
}
