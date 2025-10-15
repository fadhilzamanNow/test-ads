import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationNext2,
  PaginationPrevious,
  PaginationPrevious2,
} from "@/components/ui/pagination";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface CustomPagination {
  page: number;
  setPage: (page: number) => void;
  totalPage: number;
  lowerEntry: number;
  upperEntry: number;
  totalEntry: number;
  setSearchPage: (page: number) => void;
  handleChangePage: () => void;
}

export default function CustomPagination({
  page,
  setPage,
  totalPage,
  lowerEntry,
  upperEntry,
  totalEntry,
  setSearchPage,
  handleChangePage,
}: CustomPagination) {
  return (
    <div className="flex justify-between items-center">
      <div className="text-xs text-nowrap flex gap-1 text-[#818898]">
        <span>Showing</span>
        <span className="text-black">
          {lowerEntry} to {upperEntry} of {totalEntry}
        </span>
        <span>entries</span>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious2 href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {Array.from({ length: totalPage }).map((_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                isActive={index + 1 === page}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext2 href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="flex items-center gap-2">
        <span className="w-max">Go to page</span>
        <Input
          className="w-12"
          onChange={(e) => setSearchPage(parseInt(e.target.value))}
        />
        <Button variant={"ghost"} onClick={handleChangePage}>
          Go
        </Button>
      </div>
    </div>
  );
}
