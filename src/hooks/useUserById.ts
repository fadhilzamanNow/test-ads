import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api/users/users";

export function useUserById(id: string, enabled = true) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: enabled && !!id,
  });
}
