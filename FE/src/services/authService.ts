import { loginApi } from "../api/authApi";
import type { LoginRequest } from "../types/auth.type";

export const loginService = async (data: LoginRequest) => {
  const result = await loginApi(data);

  localStorage.setItem("accessToken", result.token);
  localStorage.setItem("userId", result.userId);

  return result;
};