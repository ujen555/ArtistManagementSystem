import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addArtist } from '../api/artistsService';

const useAddArtist = (onSuccessCallback) => {
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn:addArtist,
    onSuccess:(data,variables)=>{
        toast.success(data.message);
        const firstPageKey = ['/artists', 1, 8];
        queryClient.setQueryData(firstPageKey, old => {
          if (!old) return { results: [variables], total_data: 1 };
          return {
            ...old,
            results: [{...variables,id:data.artistId}, ...old.results].slice(0, 8),
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

export default useAddArtist;
