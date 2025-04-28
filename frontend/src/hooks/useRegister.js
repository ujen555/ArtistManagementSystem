// src/hooks/useRegister.js
import { useMutation } from '@tanstack/react-query';
import registerUser from '../api/authService';
import { toast } from 'react-toastify';

const useRegister = () => {
  return useMutation({
    mutationFn:registerUser,
    onSuccess:(data)=>{
        toast.success(data.message);
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
