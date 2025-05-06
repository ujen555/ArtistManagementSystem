import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addSong } from '../api/songsService';

const useAddSong = (onSuccessCallback,artist_id) => {
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn:addSong,
    onSuccess:(data,variables)=>{
        toast.success(data.message);
        const firstPageKey = ['/songs-by-artistid', artist_id,1, 8];
        queryClient.setQueryData(firstPageKey, old => {
          if (!old) return { results: [variables], total_data: 1 };
          return {
            ...old,
            results: [{...variables,id:data.song_id }, ...old.results].slice(0, 8),
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
        toast.error(errorMessage || "Artist creation failed! Please try again.");
      }
    }
  })
};

export default useAddSong;
