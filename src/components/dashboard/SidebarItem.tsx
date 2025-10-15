import { useStore } from "@/store/store";
import type { ListMenu } from "./Sidebar";
import { useEffect } from "react";

interface SidebarItemProps {
  item: ListMenu;
}
export default function SidebarItem({ item }: SidebarItemProps) {
  const { setMenu, menu } = useStore((state) => state);

  useEffect(() => {
    console.log("isi menu : ", menu);
  }, [menu]);
  return (
    <li
      className={`relative flex justify-center items-center size-8 rounded-[8px] group hover:bg-[#536AFF0D] hover:text-[#3739EC]  ${menu === item.name ? "bg-[#536AFF0D] text-[#3739EC]" : "text-[#CCD2D6]"}`}
      onClick={() => setMenu(item.name)}
    >
      {item.icon}
      <span className="absolute left-13 top-1/2 -translate-y-1/2 bg-primary py-1 px-4 rounded-md text-white group-hover:visible group-hover:opacity-100 opacity-0 transition  z-100 ease-in-out duration-200">
        {item.name}
      </span>
    </li>
  );
}
