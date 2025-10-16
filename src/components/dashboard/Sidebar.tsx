import icon from "@/assets/icon.png";
import { FaHome, FaUsers } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BiSolidAlarm } from "react-icons/bi";
import { IoStatsChart } from "react-icons/io5";
import SidebarItem from "./SidebarItem";
import { BriefcaseBusiness, Settings, Trash2 } from "lucide-react";

export interface ListMenu {
  icon: React.ReactNode;
  name: string;
  separator?: boolean;
}

const listMenu: ListMenu[] = [
  {
    icon: <FaHome size={20} />,
    name: "Home",
  },
  {
    icon: <FaUsers size={20} />,
    name: "Users",
  },
  {
    icon: <BiSolidAlarm size={20} />,
    name: "History",
  },
  {
    icon: <RiMoneyDollarCircleFill size={20} />,
    name: "Inventory",
  },
  {
    icon: <IoStatsChart size={20} />,
    name: "Chart",
  },
  {
    icon: <BriefcaseBusiness size={20} />,
    name: "Case",
    separator: true,
  },
  {
    icon: <Trash2 size={20} />,
    name: "Trash",
  },
  {
    icon: <Settings size={20} />,
    name: "Setting",
    separator: true,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col border-r border-r-[#F2F2F2] h-screen ">
      <div className="size-15 p-4 flex justify-center items-center border-b border-b-[#F2F2F2] ">
        <img src={icon} />
      </div>
      <ul className="flex-1 flex flex-col p-4 gap-4">
        {listMenu.map((v, i) => (
          <div key={i + 1}>
            {v.separator && <div className="border-t border-[#F2F2F2] my-2" />}
            <SidebarItem item={v} />
          </div>
        ))}
      </ul>
    </aside>
  );
}
