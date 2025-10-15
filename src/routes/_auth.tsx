import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import auth from "@/assets/auth.png";
import icon from "@/assets/icon.png";
import { isAuthenticated } from "@/lib/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen flex flex-col md:flex-row  p-4 gap-4 bg-white">
      <div className="w-full md:w-1/2 p-5 flex flex-col justify-between h-full">
        <div className="flex gap-2 items-center ">
          <img src={icon} className="w-8 h-9" />
          <h1 className="font-semibold text-2xl">Test</h1>
        </div>
        <div className="flex justify-center">
          <Outlet />
        </div>
        <div className="text-[#AAAAAA] flex justify-between text-xs md:text-sm">
          <span>Copyright © 2025 Test Enterprises LTD.</span>
          <span>Privacy Policy</span>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 overflow-hidden rounded-[20px]">
        <img src={auth} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
