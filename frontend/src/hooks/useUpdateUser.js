import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser } from "../api/userService";

const useUpdateUser = (userId,onSuccessCallback) => {
  const queryClient=useQueryClient();
    return useMutation({
      mutationFn:(payload)=>updateUser(userId,payload),
      onSuccess:(data,variables)=>{
          toast.success(data.message);

          // Update individual user cache
          queryClient.setQueryData(['userById',String(userId)], (oldData) => {
            if (!oldData) return;
            return {...variables,dob:variables.dob.toISOString()};
          })
          queryClient.getQueryCache().findAll({ queryKey: ['/users'] }).forEach(({ queryKey }) => {
            queryClient.setQueryData(queryKey, old => {
              if (!old) return old;
        
              const updatedResults = old.results.map(user =>
                user.id === userId ? { ...user, ...variables } : user
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
  
  export default useUpdateUser;
  