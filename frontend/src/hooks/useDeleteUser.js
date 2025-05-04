import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../api/userService';
import { toast } from 'react-toastify';

export const useDeleteUser = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess:(data,variables)=>{
           toast.success(data.message);
           queryClient.getQueryCache().findAll({ queryKey: ['/users'] }).forEach(({ queryKey }) => {
            queryClient.setQueryData(queryKey, old => {
              if (!old) return old;
        
              const updatedResults = old.results.filter(user =>
                user.id !== variables
              );
        
              return {
                ...old,
                results: updatedResults,
                total_data: old.total_data - 1,
              };
            });
          });
          if(onSuccessCallback) onSuccessCallback();
       },
    onError:(error)=>{
        const errorMessage=error.response?.data?.message;
        if (Array.isArray(errorMessage)) {
          errorMessage.forEach((errMsg) => {
            toast.error(errMsg);
          });
        } else {
          toast.error(errorMessage || "Deleting  Failed");
        }
      }
  });
};