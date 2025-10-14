import { createFileRoute, Outlet } from "@tanstack/react-router";
import auth from "@/assets/auth.png";
import icon from "@/assets/icon.png";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen container flex mx-auto py-22 ">
      <div className="w-1/2 p-5 flex flex-col justify-between">
        <div className="flex gap-2 items-center ">
          <img src={icon} className="w-8 h-9" />
          <h1 className="font-semibold text-2xl">Test</h1>
        </div>
        <div className="flex justify-center">
          <Outlet />
        </div>
        <div className="text-[#AAAAAA] flex justify-between ">
          <span>Copyright © 2025 Test Enterprises LTD.</span>
          <span>Privacy Policy</span>
        </div>
      </div>
      <div className="w-1/2 overflow-hidden rounded-[20px] ">
        <img src={auth} className="text-[#3739EC]  scale-100" />
      </div>
    </div>
  );
}
