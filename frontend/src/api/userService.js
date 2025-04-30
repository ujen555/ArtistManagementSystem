import axiosInstance from "../api";

const getCurrentUser = async () => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};


export {getCurrentUser};