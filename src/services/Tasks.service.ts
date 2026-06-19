import { api } from "../utils/api";

export type CreateTaskPayload = {
  title: string;
  description: string;
  due_date: string;
  priority: string;
  status: string;
  assigned_to: string;
  lead_id: string;
};

export const tasklist = async (data: { page: number; limit: number }) => {
  const response = await api.post("/tasks/list", data);
  return response.data;
};

export const createTask = async (data: CreateTaskPayload) => {
  const response = await api.post("/tasks/add", data);
  return response.data;
};
