import UserTab from "@/components/dashboard/UserTab";
import { useStore } from "@/store/store";
import { createFileRoute } from "@tanstack/react-router";
import { getAllUsers } from "@/api/users/users";

export const Route = createFileRoute("/dashboard/")({
  loader: async () => {
    const users = await getAllUsers(1, 10);
    return { users };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const menu = useStore((state) => state.menu);
  return (
    <div className="bg-gray-50 flex justify-center items-center h-full p-6">
      {menu === "Users" && <UserTab />}
    </div>
  );
}
