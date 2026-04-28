import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
  return data;
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
}; 
