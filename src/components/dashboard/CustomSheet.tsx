import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import icon from "@/assets/icon.png";
import { FaHome, FaUsers } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BiSolidAlarm } from "react-icons/bi";
import { IoStatsChart } from "react-icons/io5";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/store/store";

interface ListMenu {
  icon: React.ReactNode;
  name: string;
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
];

interface CustomSheetProps {
  open: boolean;
  onClose: (state: boolean) => void;
}

export default function CustomSheet({ open, onClose }: CustomSheetProps) {
  const menu = useStore((state) => state.menu);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetTitle></SheetTitle>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="h-15 p-4 flex items-center gap-2 border-b border-b-[#F2F2F2]">
            <img src={icon} className="w-8 h-9" />
            <h1 className="font-semibold text-xl">Test</h1>
          </div>
          <ul className="flex-1 flex flex-col p-4 gap-4">
            {listMenu.map((item, i) => (
              <Link
                key={i + 1}
                to="/dashboard/$menu"
                params={{ menu: item.name.toLowerCase() }}
                onClick={() => onClose(false)}
              >
                <li
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    menu === item.name
                      ? "bg-[#536AFF0D] text-[#3739EC]"
                      : "text-[#CCD2D6] hover:bg-[#536AFF0D] hover:text-[#3739EC]"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
