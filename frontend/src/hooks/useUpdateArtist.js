import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateArtist } from "../api/artistsService";

const useUpdateArtist= (artistId,onSuccessCallback) => {
  const queryClient=useQueryClient();
    return useMutation({
      mutationFn:(payload)=>updateArtist(artistId,payload),
      onSuccess:(data,variables)=>{
          toast.success(data.message);

          queryClient.setQueryData(['artistById',String(artistId)], (oldData) => {
            if (!oldData) return;
            return {...variables,dob:variables.dob.toISOString()};
          })
          queryClient.getQueryCache().findAll({ queryKey: ['/artists'] }).forEach(({ queryKey }) => {
            queryClient.setQueryData(queryKey, old => {
              if (!old) return old;
        
              const updatedResults = old.results.map(artist =>
                artist.id === artistId ? { ...artist, ...variables } : artist
              );
        
              return {
                ...old,
                results: updatedResults,
              };
            });
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
          toast.error(errorMessage || "Update Failed");
        }
      }
    })
  };
  
  export default useUpdateArtist;
  