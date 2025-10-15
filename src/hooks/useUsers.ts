import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/users/users";

export function useUsers(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getAllUsers(page, limit),
  });
}
