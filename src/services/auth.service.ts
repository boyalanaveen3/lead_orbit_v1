import { api } from "../utils/api"

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export const register = async (data: RegisterPayload) => {
  // Some backends expect `username` instead of `name`; sending both keeps this client compatible.
  const payload = {
    ...data,
    username: data.name,
  };
  const response = await api.post("/auth/register", payload);
  return response.data;
}

export const loginuser = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
