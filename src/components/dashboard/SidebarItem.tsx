import { useStore } from "@/store/store";
import type { ListMenu } from "./Sidebar";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "@/api/users/users";
import { Link } from "@tanstack/react-router";

interface SidebarItemProps {
  item: ListMenu;
}
export default function SidebarItem({ item }: SidebarItemProps) {
  const { menu } = useStore((state) => state);
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("isi menu : ", menu);
  }, [menu]);

  const handleMouseEnter = () => {
    if (item.name === "Users") {
      queryClient.prefetchQuery({
        queryKey: ["users", 1, 10],
        queryFn: () => getAllUsers(1, 10),
      });
    }
  };
  return (
    <Link
      to="/dashboard/$menu"
      params={{ menu: item.name.toLowerCase() }}
      onMouseEnter={handleMouseEnter}
    >
      <li
        className={`relative flex justify-center items-center size-8 rounded-[8px] group hover:bg-[#536AFF0D] hover:text-[#3739EC]  ${menu === item.name ? "bg-[#536AFF0D] text-[#3739EC]" : "text-[#CCD2D6]"}`}
      >
        {item.icon}
        <span className="absolute left-13 top-1/2 -translate-y-1/2 bg-primary py-1 px-4 rounded-md text-white whitespace-nowrap pointer-events-none group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 scale-0 opacity-0 origin-left transition-all ease-in-out duration-200 z-100">
          {item.name}
        </span>
      </li>
    </Link>
  );
}
