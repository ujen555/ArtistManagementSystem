import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteSong } from '../api/songsService';

export const useDeleteSong = (artist_id,onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteSong(id),
    onSuccess:(data,variables)=>{
           toast.success(data.message);
           queryClient.getQueryCache().findAll({ queryKey: ['/songs-by-artistid',artist_id] }).forEach(({ queryKey }) => {
            queryClient.setQueryData(queryKey, old => {
              if (!old) return old;
        
              const updatedResults = old.results.filter(song =>
                song.id !== variables
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