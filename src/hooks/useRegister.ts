import { useMutation } from "@tanstack/react-query";
import { postRegister } from "@/api/auth/auth";
import type { registerSchema } from "@/routes/_auth/register";
import type z from "zod";

export function useRegister() {
  return useMutation({
    mutationFn: (
      data: Omit<z.infer<typeof registerSchema>, "confirm_password">,
    ) => postRegister(data),
  });
}
