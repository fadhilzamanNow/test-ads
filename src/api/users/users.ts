import { AxiosError } from "axios";
import { baseApi } from "../baseApi";
import type { registerSchema } from "@/routes/_auth/register";
import z from "zod";

export async function getAllUsers(page = 1, limit = 10) {
  try {
    const response = await baseApi.get("/user", { params: { page, limit } });
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message || "Terjadi kesalahan");
    }
    console.log(err);
  }
}

export async function getUserById(id: string) {
  try {
    const response = await baseApi.get(`/user/${id}`);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message || "Terjadi kesalahan");
    }
  }
}

export async function createUser(
  data: Omit<z.infer<typeof registerSchema>, "confirm_password">,
) {
  try {
    const response = await baseApi.post("/user", data);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message || "Terjadi kesalahan");
    }
  }
}

export async function updateUser(
  id: string,
  data: Partial<Omit<z.infer<typeof registerSchema>, "confirm_password">>,
) {
  try {
    const response = await baseApi.put(`/user/${id}`, data);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message || "Terjadi kesalahan");
    }
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await baseApi.delete(`/user/${id}`);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message || "Terjadi kesalahan");
    }
  }
}
