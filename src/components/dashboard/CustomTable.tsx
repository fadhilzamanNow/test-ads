import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";

interface UserType {
  id: string;
  name: string;
  username: string;
  phoneNumber: string;
}

interface CustomTableProps {
  data: any;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

export default function CustomTable({
  data,
  handleEdit,
  handleDelete,
}: CustomTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#FAFAFA] flex rounded-[8px] shadow-none ">
          <TableHead className="flex items-center gap-1 min-w-93">
            <span className="leading-none text-[#686868]"># ID</span>
            <div className="flex flex-col leading-none text-[6px] text-[#A3A2AB]">
              <button className="">▲</button>
              <button>▼</button>
            </div>
          </TableHead>
          <TableHead className="flex items-center gap-1 min-w-93">
            <span className="leading-none text-[#686868]">Username</span>
            <div className="flex flex-col leading-none text-[6px] text-[#A3A2AB]">
              <button className="">▲</button>
              <button>▼</button>
            </div>
          </TableHead>
          <TableHead className="flex items-center gap-1 min-w-93">
            <span className="leading-none text-[#686868]">Name</span>
            <div className="flex flex-col leading-none text-[6px] text-[#A3A2AB]">
              <button className="">▲</button>
              <button>▼</button>
            </div>
          </TableHead>
          <TableHead className="flex items-center gap-1 min-w-93">
            <span className="leading-none text-[#686868]">
              Telephone Number
            </span>
            <div className="flex flex-col leading-none text-[6px] text-[#A3A2AB]">
              <button className="">▲</button>
              <button>▼</button>
            </div>
          </TableHead>
          <TableHead className="flex-1"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.datas?.map((user: UserType) => (
          <TableRow key={user.id} className="flex">
            <TableCell className="w-93">{user.id}</TableCell>
            <TableCell className="w-93">{user.username}</TableCell>
            <TableCell className="w-93">{user.name}</TableCell>
            <TableCell className="w-93">{user.phoneNumber || "-"}</TableCell>
            <TableCell className="flex-1 flex justify-end w-max">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <BsThreeDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-30">
                  <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(user.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
