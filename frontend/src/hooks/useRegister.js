import { useMutation, useQueryClient } from '@tanstack/react-query';
import registerUser from '../api/authService';
import { toast } from 'react-toastify';

const useRegister = (onSuccessCallback) => {
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn:registerUser,
    onSuccess:(data,variables)=>{
        toast.success(data.message);
        const firstPageKey = ['/users', 1, 8];
        queryClient.setQueryData(firstPageKey, old => {
          if (!old) return { results: [variables], total_data: 1 };
          return {
            ...old,
            results: [variables, ...old.results].slice(0, 8),
            total_data: old.total_data + 1,
          };
        });
        if (onSuccessCallback) onSuccessCallback();
    },
  
    onError:(error)=>{
  
      const errorMessage=error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        errorMessage.forEach((errMsg) => {
          toast.error(errMsg);
        });
      } else {
        toast.error(errorMessage || "Registration failed! Please try again.");
      }
    }
  })
};

export default useRegister;
