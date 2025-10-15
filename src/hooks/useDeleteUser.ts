import { deleteUser } from "@/api/users/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
