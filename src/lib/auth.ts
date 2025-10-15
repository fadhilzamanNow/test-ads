import { jwtDecode } from "jwt-decode";
import { useStore } from "@/store/store";

interface JWTPayload {
  exp?: number;
  iat?: number;
  id?: string;
  sub?: string;
  name?: string;
  username?: string;
  [key: string]: any;
}

export function decodeJWT(token: string): JWTPayload | null {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

export function isTokenValid(token: string | null): boolean {
  if (!token) {
    useStore.getState().clearUser();
    return false;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      useStore.getState().clearUser();
      return false;
    }

    if (isTokenExpired(token)) {
      useStore.getState().clearUser();
      return false;
    }

    // Token is valid, decode and set user
    const decoded = decodeJWT(token);
    if (decoded) {
      useStore.getState().setUser({
        id: decoded.id || decoded.sub || "",
        name: decoded.name || "",
        username: decoded.username || "",
      });
    }

    return true;
  } catch (error) {
    useStore.getState().clearUser();
    return false;
  }
}

export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

export function setAuthToken(token: string): void {
  localStorage.setItem("authToken", token);
}

export function removeAuthToken(): void {
  localStorage.removeItem("authToken");
}

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  return isTokenValid(token);
}
