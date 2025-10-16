import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import UserTab from "@/components/tab/UserTab";
import HomeTab from "@/components/tab/HomeTab";
import ChartTab from "@/components/tab/ChartTab";
import HistoryTab from "@/components/tab/HistoryTab";
import InventoryTab from "@/components/tab/InventoryTab";
import CaseTab from "@/components/tab/CaseTab";
import TrashTab from "@/components/tab/TrashTab";
import SettingTab from "@/components/tab/SettingTab";

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
    const menu = menuParam.toLowerCase();

    switch (menu) {
      case "users":
        return <UserTab />;
      case "home":
        return <HomeTab />;
      case "history":
        return <HistoryTab />;
      case "inventory":
        return <InventoryTab />;
      case "chart":
        return <ChartTab />;
      case "case":
        return <CaseTab />;
      case "trash":
        return <TrashTab />;
      case "setting":
        return <SettingTab />;
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

  return <div className="bg-gray-50   pt-6 px-6 h-full">{renderContent()}</div>;
}
