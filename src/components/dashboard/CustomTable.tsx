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
import { Button } from "../ui/button";
import { useState, useMemo } from "react";

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

type SortField = "id" | "username" | "name" | "phoneNumber";
type SortOrder = "asc" | "desc" | null;

export default function CustomTable({
  data,
  handleEdit,
  handleDelete,
}: CustomTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!data?.datas || !sortField || !sortOrder) return data?.datas || [];

    const sorted = [...data.datas].sort((a, b) => {
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";

      const comparison = aValue
        .toString()
        .localeCompare(bValue.toString(), undefined, {
          numeric: true,
          sensitivity: "base",
        });

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [data?.datas, sortField, sortOrder]);

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#FAFAFA] flex rounded-[8px] shadow-none ">
          <TableHead
            className="flex items-center gap-1 min-w-93 cursor-pointer hover:bg-gray-200 hover:rounded-l-[8px] transition-all "
            onClick={() => handleSort("id")}
          >
            <span className="leading-none text-[#686868]"># ID</span>
            <div className="flex flex-col leading-none text-[6px]">
              <span
                className={
                  sortField === "id" && sortOrder === "asc"
                    ? "text-[#3739EC]"
                    : "text-[#A3A2AB]"
                }
              >
                ▲
              </span>
              <span
                className={
                  sortField === "id" && sortOrder === "desc"
                    ? "text-[#3739EC]"
                    : "text-[#A3A2AB]"
                }
              >
                ▼
              </span>
            </div>
          </TableHead>
          <TableHead
            className="flex items-center gap-1 min-w-93 cursor-pointer hover:bg-gray-200  transition-all"
            onClick={() => handleSort("username")}
          >
            <span className="leading-none text-[#686868]">Username</span>
            <div className="flex flex-col leading-none text-[6px]">
              <span
                className={
                  sortField === "username" && sortOrder === "asc"
                    ? "text-[#3739EC]"
                    : "text-[#A3A2AB]"
                }
              >
                ▲
              </span>
              <span
                className={
                  sortField === "username" && sortOrder === "desc"
                    ? "text-[#3739EC]"
                    : "text-[#A3A2AB]"
                }
              >
                ▼
              </span>
            </div>
          </TableHead>
          <TableHead
            className="flex items-center gap-1 min-w-93 cursor-pointer hover:bg-gray-200  transition-all"
            onClick={() => handleSort("name")}
          >
            <span className="leading-none text-[#686868]">Name</span>
            <div className="flex flex-col leading-none text-[6px]">
              <span
                className={
                  sortField === "name" && sortOrder === "asc"
                    ? "text-[#3739EC]"
                    : "text-[#A3A2AB]"
                }
              >
                ▲
              </span>
              <span
                className={
                  sortField === "name" && sortOrder === "desc"
                    ? "text-[#3739EC]"
                    : "text-[#A3A2AB]"
                }
              >
                ▼
              </span>
            </div>
          </TableHead>
          <TableHead
            className="flex items-center gap-1 min-w-93 cursor-pointer hover:bg-gray-200  transition-all"
            onClick={() => handleSort("phoneNumber")}
          >
            <span className="leading-none text-[#686868]">
              Telephone Number
            </span>
            <div className="flex flex-col leading-none text-[6px]">
              <span
                className={
                  sortField === "phoneNumber" && sortOrder === "asc"
                    ? "text-[#3739EC]"
                    : "text-[#A3A2AB]"
                }
              >
                ▲
              </span>
              <span
                className={
                  sortField === "phoneNumber" && sortOrder === "desc"
                    ? "text-[#3739EC]"
                    : "text-[#A3A2AB]"
                }
              >
                ▼
              </span>
            </div>
          </TableHead>
          <TableHead className="flex-1"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData?.map((user: UserType) => (
          <TableRow key={user.id} className="flex">
            <TableCell className="w-93 flex items-center text-[#686868]">
              #{user.id.toUpperCase()}
            </TableCell>
            <TableCell className="w-93 flex items-center">
              {user.username}
            </TableCell>
            <TableCell className="w-93 flex items-center">
              {user.name}
            </TableCell>
            <TableCell className="w-93 flex items-center">
              {user.phoneNumber || "-"}
            </TableCell>
            <TableCell className="flex-1 flex  justify-end w-max">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"}>
                    <BsThreeDots />
                  </Button>
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
