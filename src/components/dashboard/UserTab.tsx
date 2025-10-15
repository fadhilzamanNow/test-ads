import { IoIosPaper } from "react-icons/io";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { useUsers } from "@/hooks/useUsers";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import CustomPagination from "./CustomPagination";
import CustomTable from "./CustomTable";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

export default function UserTab() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useUsers(page, 10);
  const [searchPage, setSearchPage] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const lowerEntry = useMemo(() => {
    return page * 10 - 10 + 1;
  }, [page]);

  const upperEntry = useMemo(() => {
    return lowerEntry + data?.datas?.length - 1;
  }, [lowerEntry, data]);

  const totalEntry = useMemo(() => {
    return data?.totalRows;
  }, [data]);

  const totalPage = useMemo(() => {
    return data?.pageTotal;
  }, [data]);

  const handleChangePage = () => {
    if (searchPage && searchPage > 0 && searchPage <= data.pageTotal) {
      setPage(searchPage);
    } else {
      toast.error("Halaman yang kamu masukkan tidak tersedia");
    }
  };

  const handleEdit = (id: string) => {
    setSelectedUserId(id);
    setIsEditOpen(true);
  };

  const handleDelete = (id: string) => {
    setSelectedUserId(id);
    setIsDeleteOpen(true);
  };

  const handleCreate = () => {
    setIsCreateOpen(true);
  };

  if (isLoading) {
    return (
      <main className="h-full w-full bg-white flex items-center justify-center">
        <p>Loading users...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="h-full w-full bg-white flex items-center justify-center">
        <p className="text-red-500">Error: {error?.message}</p>
      </main>
    );
  }

  return (
    <main className="h-full w-full bg-white flex flex-col gap-6 py-8.5 px-13">
      <div className="flex items-center justify-between  ">
        <div className="flex gap-2 items-center">
          <IoIosPaper className="text-[#3739EC]" size={20} />
          <span className="text-[#0C0C0C] font-semibold text-base">
            List User
          </span>
        </div>
        <Button variant={"outline"} className="size-8">
          <BsThreeDots />
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-stretch md:items-center justify-between md:h-10">
        <Select>
          <SelectTrigger className="min-w-46.5">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Choose your filter</SelectLabel>
              <SelectItem value="username">Username</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="phone">Phone Number</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-2 items-center flex-1 md:flex-none">
          <InputGroup className="max-h-47">
            <InputGroupAddon align={"inline-start"}>
              <FaSearch />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search user" />
          </InputGroup>
          <Button className="w-39 px-4" onClick={() => handleCreate()}>
            <IoMdAdd />
            <span>Add</span>
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <CustomTable
            data={data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      <CustomPagination
        page={page}
        totalPage={totalPage}
        setPage={(page: number) => setPage(page)}
        totalEntry={totalEntry}
        lowerEntry={lowerEntry}
        upperEntry={upperEntry}
        setSearchPage={(page: number) => setSearchPage(page)}
        handleChangePage={() => handleChangePage()}
      />
      <CreateUser
        open={isCreateOpen}
        onClose={(state: boolean) => setIsCreateOpen(state)}
      />
      <EditUser
        open={isEditOpen}
        onClose={(state: boolean) => setIsEditOpen(state)}
        userId={selectedUserId}
      />
      <DeleteUser
        open={isDeleteOpen}
        onClose={(state: boolean) => setIsDeleteOpen(state)}
        userId={selectedUserId as string}
      />
    </main>
  );
}
