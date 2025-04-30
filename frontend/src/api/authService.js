import axiosInstance from "../api";

const registerUser = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axiosInstance.post('/auth/login', userData);
  return response.data;
};

export {loginUser};
export default registerUser;