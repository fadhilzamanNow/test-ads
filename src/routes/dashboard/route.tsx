import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAuthenticated, removeAuthToken } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      removeAuthToken();
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
