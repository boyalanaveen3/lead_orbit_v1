import { api } from "../utils/api"

type RegisterPayload = {
  organization_name:string
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone_no:string
};

export const register = async (data: RegisterPayload) => {
  const payload = {
    ...data,
  };
  const response = await api.post("/auth/register", payload);
  return response.data;
}

export const loginuser = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  const token = response.data?.token ?? response.data?.access_token;
  if (token) localStorage.setItem("token", token);
  return response.data;
};
