import axios from 'axios';
import { Operation } from 'src/shared/types/Operation';

export const otusApi = axios.create({
  baseURL: 'http://19429ba06ff2.vps.myjino.ru/api',
});

otusApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchProfile(): Promise<{ email: string; commandId: string; signUpDate: string }> {
  const res = await otusApi.get('/profile');
  return res.data;
}

export async function updateProfileFieldApi(field: 'email' | 'commandId', value: string) {
  return otusApi.patch('/profile', { [field]: value });
}

export async function changePasswordApi(body: { password: string; newPassword: string }) {
  return otusApi.post('/profile/change-password', body);
}

export async function registerUser(email: string, password: string): Promise<string> {
  const response = await otusApi.post('/signup', { email, password, commandId: 'vladynush-team' as string });
  return response.data.token;
}

export async function loginUser(email: string, password: string): Promise<string> {
  const response = await otusApi.post('/signin', { email, password });
  return response.data.token;
}

export type Category = {
  id: string;
  name: string;
  photo?: string;
  commandId: string;
  createdAt: string;
  updatedAt: string;
};

export async function getCategories(): Promise<Category[]> {
  const res = await otusApi.get('/categories');
  return res.data.data;
}

export async function createOperation(operation: Omit<Operation, 'id' | 'category'>): Promise<Operation> {
  const res = await otusApi.post('/operations', operation);
  return res.data;
}

export async function updateOperation(id: string, operation: Omit<Operation, 'id' | 'category'>): Promise<Operation> {
  const res = await otusApi.put(`/operations/${id}`, operation);
  return res.data;
}

export async function getOperations(): Promise<Operation[]> {
  const res = await otusApi.get('/operations');
  return res.data.data;
}
