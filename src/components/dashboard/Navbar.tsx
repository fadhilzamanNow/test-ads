import {
  Bell,
  ChevronDown,
  ChevronDownCircle,
  LogOut,
  Search,
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

export default function Navbar() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const handleLogout = () => {
    removeAuthToken();
    toast.success("Logout berhasil");
    navigate({ to: "/login" });
  };
  return (
    <nav className="flex justify-between h-15 px-[23px] pt-[13px] pb-[14px] border-b border-b-[#F2F2F2] w-full items-center ">
      <h1 className="font-semibold text-[20px] ">Dashboard</h1>
      <div className="flex items-center gap-2 w-75 h-[35px]">
        <Button
          className="size-[35px] flex justify-center items-center"
          variant={"outline"}
        >
          <Bell />
        </Button>
        <InputGroup className="flex-1 max-w-[350px]">
          <InputGroupAddon align={"inline-start"}>
            <Search strokeWidth={2} className="text-[#0C0C0C]" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search something" />
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
  );
}
