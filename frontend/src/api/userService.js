import axiosInstance from "../api";

const getCurrentUser = async () => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};

const getUsers = async ({page=1,limit=10})=>{
  const response = await axiosInstance.get(`/users?page=${page}&limit=${limit}`);
  return response.data;
}

const getUserById = async (id)=>{
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
}


const updateUser = async (id,payload)=>{
  const response = await axiosInstance.put(`/users/${id}`,payload);
  return response.data;
}

const deleteUser = async (id)=>{
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
}



export {getCurrentUser,getUsers,getUserById,updateUser,deleteUser};