import type { registerSchema } from "@/routes/_auth/register";
import { baseApi } from "../baseApi";
import z from "zod";
import { AxiosError } from "axios";

export const loginSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Minimum 6 karakter" })
    .max(100, { message: "Maksimum 100 karakter" }),
  password: z
    .string()
    .min(8, { message: "Minimum 8 karakter" })
    .max(100, { message: "Maksimum 100 karakter" }),
});

export async function postRegister(
  data: Omit<z.infer<typeof registerSchema>, "confirm_password">,
) {
  try {
    const response = await baseApi.post("/auth/register", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      console.error("gagal:", error);
    }
  }
}

export async function postLogin(data: z.infer<typeof loginSchema>) {
  try {
    const response = await baseApi.post("/auth/login", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      console.error("gagal:", error);
    }
  }
}
