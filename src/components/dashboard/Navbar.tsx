import {
  Bell,
  ChevronDown,
  ChevronDownCircle,
  Command,
  LogOut,
  Search,
  TextAlignStart,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useStore } from "@/store/store";
import { removeAuthToken } from "@/lib/auth";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import CustomSheet from "./CustomSheet";
import { useState } from "react";
import { Kbd, KbdGroup } from "../ui/kbd";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLogout = () => {
    removeAuthToken();
    toast.success("Logout berhasil");
    navigate({ to: "/login" });
  };
  return (
    <>
      <nav className="flex justify-between h-15 px-[23px] pt-[13px] pb-[14px] border-b border-b-[#F2F2F2] w-full items-center ">
        <div className="flex items-center gap-2">
          <button
            className="rounded-md hover:bg-gray-100 flex justify-center items-center p-1 md:hidden cursor-pointer"
            onClick={() => setIsSheetOpen(true)}
          >
            <TextAlignStart />
          </button>
          <h1 className="font-semibold text-[20px] ">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 h-[35px]">
          <Button
            className="size-[35px] flex justify-center items-center"
            variant={"outline"}
          >
            <Bell />
          </Button>
          <InputGroup className="flex-1 max-w-55">
            <InputGroupAddon align={"inline-start"}>
              <Search strokeWidth={2} className="text-[#0C0C0C]" />
            </InputGroupAddon>
            <InputGroupAddon align={"inline-end"}>
              <KbdGroup className="bg-[#FAFAFA]">
                <Command size={12} />
                <Kbd>S</Kbd>
              </KbdGroup>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search something"
              className="!rounded-l-none  !border-l-none border-l-0"
            />
          </InputGroup>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="min-size-[35px] " variant={"outline"} asChild>
                <div className="flex justify-center items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarFallback className="bg-[#536AFF]/20 text-[#3739EC] text-[10px] ">
                      {user?.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown strokeWidth={0.75} className="text-[#0C0C0C]" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <div className="flex justify-between items-center w-full">
                  <span>Logout</span>
                  <LogOut className="text-red-500" />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <CustomSheet open={isSheetOpen} onClose={setIsSheetOpen} />
    </>
  );
}
