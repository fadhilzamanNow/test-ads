import { useMutation } from "@tanstack/react-query";
import { postLogin, loginSchema } from "@/api/auth/auth";
import type z from "zod";

export function useLogin() {
  return useMutation({
    mutationFn: (data: z.infer<typeof loginSchema>) => postLogin(data),
  });
}
