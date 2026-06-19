import { api } from "../utils/api";

export type ProfilePayload = {
  firstname?: string;
  lastname?: string;
  phone_no?: string;
};

export type OrganizationPayload = {
  name?: string;
  email?: string;
  phone_no?: string;
};

export type PasswordPayload = {
  current_password: string;
  new_password: string;
};

export const updateProfile = async (data: ProfilePayload) => {
  const response = await api.patch("/settings/profile", data);
  return response.data;
};

export const updateOrganization = async (data: OrganizationPayload) => {
  const response = await api.patch("/settings/organization", data);
  return response.data;
};

export const changePassword = async (data: PasswordPayload) => {
  const response = await api.patch("/settings/password", data);
  return response.data;
};

export const getOrganization = async (id: string) => {
  const response = await api.get(`/org/${id}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
