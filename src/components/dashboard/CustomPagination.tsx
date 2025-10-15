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
import { ChevronRight } from "lucide-react";

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
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handle2Prev = () => {
    if (page > 2) {
      setPage(page - 2);
    }
  };

  const handle2Next = () => {
    if (page <= totalPage - 2) {
      setPage(page + 2);
    }
  };

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
            <PaginationPrevious2 href="#" onClick={handle2Prev} />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePrev}
              className={`${page > 1 ? "cursor-pointer" : "cursor-not-allowed"}`}
            />
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
            <PaginationNext
              href="#"
              onClick={handleNext}
              className={`${page < totalPage ? "cursor-pointer" : "cursor-not-allowed"}`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext2 href="#" onClick={handle2Next} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="flex items-center gap-2">
        <span className="w-max text-[#818898]">Go to page</span>
        <Input
          className="w-12"
          onChange={(e) => setSearchPage(parseInt(e.target.value))}
        />
        <Button
          variant={"ghost"}
          onClick={handleChangePage}
          className="text-[#19191C] w-max flex items-center justify-center text-sm"
        >
          Go
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
