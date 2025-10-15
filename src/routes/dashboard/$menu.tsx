import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import UserTab from "@/components/tab/UserTab";
import HomeTab from "@/components/tab/HomeTab";
import ChartTab from "@/components/tab/ChartTab";
import HistoryTab from "@/components/tab/HistoryTab";
import InventoryTab from "@/components/tab/InventoryTab";

export const Route = createFileRoute("/dashboard/$menu")({
  component: RouteComponent,
});

function RouteComponent() {
  const { menu: menuParam } = Route.useParams();
  const setMenu = useStore((state) => state.setMenu);

  useEffect(() => {
    if (menuParam) {
      const formattedMenu =
        menuParam.charAt(0).toUpperCase() + menuParam.slice(1).toLowerCase();
      setMenu(formattedMenu);
    }
  }, [menuParam, setMenu]);

  const renderContent = () => {
    const normalizedMenu = menuParam.toLowerCase();

    switch (normalizedMenu) {
      case "users":
        return <UserTab />;
      case "home":
        return <HomeTab />;
      case "time":
        return <HistoryTab />;
      case "money":
        return <InventoryTab />;
      case "chart":
        return <ChartTab />;
      default:
        return (
          <div className="bg-white flex justify-center items-center h-full p-6">
            <h2 className="text-2xl font-semibold text-red-500">
              Page not found
            </h2>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 flex justify-center items-center h-full p-6">
      {renderContent()}
    </div>
  );
}
