import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/userService.js';

export const useCurrentUser = () =>
  useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled:!!localStorage.getItem('authToken'),
    staleTime: 1000 * 60 * 10,
    retry: false,
  });