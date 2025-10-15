import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/api/users/users";
import type { registerSchema } from "@/routes/_auth/register";
import type z from "zod";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<z.infer<typeof registerSchema>, "confirm_password">) =>
      createUser(data),
    onSuccess: () => {
      // Invalidate users query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
