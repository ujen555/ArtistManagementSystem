import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { loginUser } from '../api/authService';

const useLogin = (onSuccessCallback) => {
  return useMutation({
    mutationFn:loginUser,
    onSuccess:(data)=>{
        toast.success(data.message);
        localStorage.setItem("authToken", data.token);
        if (onSuccessCallback) onSuccessCallback();
    },
    onError:(error)=>{
      const errorMessage=error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        errorMessage.forEach((errMsg) => {
          toast.error(errMsg);
        });
      } else {
        toast.error(errorMessage || "User Login failed! Please try again.");
      }
    }
  })
};

export default useLogin;
