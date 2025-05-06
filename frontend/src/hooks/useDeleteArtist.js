import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteArtist } from '../api/artistsService';

export const useDeletArtist = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteArtist(id),
    onSuccess:(data,variables)=>{
           toast.success(data.message);
           queryClient.getQueryCache().findAll({ queryKey: ['/artists'] }).forEach(({ queryKey }) => {
            queryClient.setQueryData(queryKey, old => {
              if (!old) return old;
        
              const updatedResults = old.results.filter(artist =>
                artist.id !== variables
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