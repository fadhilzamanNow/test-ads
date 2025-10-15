import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/api/users/users";
import type { registerSchema } from "@/routes/_auth/register";
import type z from "zod";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<z.infer<typeof registerSchema>, "confirm_password">>;
    }) => updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
}
