import { api } from "../utils/api";

export type CreateLeadPayload = {
  firstname: string;
  lastname: string;
  email: string;
  phone_no: string;
  company_name: string;
  source: string;
  remarks: string;
  status_id: string;
  assigned_to: string;
};

export const leadslist = async (data: { page: number; limit: number }) => {
  const response = await api.post("/leads/list", data);
  return response.data;
};

export const createLead = async (data: CreateLeadPayload) => {
  const response = await api.post("/leads/add", data);
  return response.data;
};
