import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/NavbarModern";
export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <Outlet />
      </main>
    </>
  );
}
