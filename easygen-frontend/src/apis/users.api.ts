import { axiosInstance } from '@/apis/client.ts';
import type { User } from '@/types';

interface UserCreationDetails {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (details: UserCreationDetails) => {
  const response = await axiosInstance.post('/users', {
    name: details.name,
    email: details.email,
    password: details.password,
  });

  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await axiosInstance.get(`/users/${id}`)
  return response.data;
}
