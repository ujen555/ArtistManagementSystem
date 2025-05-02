import axiosInstance from "../api";

const getCurrentUser = async () => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};

const getUsers = async ({page=1,limit=10})=>{
  const response = await axiosInstance.get(`/users?page=${page}&limit=${limit}`);
  return response.data;
}


export {getCurrentUser,getUsers};