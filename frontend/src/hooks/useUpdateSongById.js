import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateSongById } from "../api/songsService";

const useUpdateSongById= (songId,artist_id,onSuccessCallback) => {
  const queryClient=useQueryClient();
    return useMutation({
      mutationFn:(payload)=>updateSongById(songId,payload),
      onSuccess:(data,variables)=>{
          toast.success(data.message);

          queryClient.setQueryData(['songById',String(songId)], (oldData) => {
            if (!oldData) return;
            return variables;
          })
          queryClient.getQueryCache().findAll({ queryKey: ['/songs-by-artistid',artist_id] }).forEach(({ queryKey }) => {
            queryClient.setQueryData(queryKey, old => {
              if (!old) return old;
        
              const updatedResults = old.results.map(song =>
                song.id === songId ? { ...song, ...variables } : song
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
  
  export default useUpdateSongById;
  