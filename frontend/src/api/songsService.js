import axiosInstance from "../api";

const getSongsOfArtist = async (artistId,{page=1,limit=10})=>{
    const response = await axiosInstance.get(`/songs/songs-by-artistid/${artistId}?page=${page}&limit=${limit}`);
    return response.data;
}

const addSong = async (song)=>{
    const response = await axiosInstance.post(`/songs`,song);
    return response.data;
}



const getSongById = async (id)=>{
    const response = await axiosInstance.get(`/songs/${id}`);
    return response.data;
  }

const updateSongById = async (id,payload)=>{
    const response = await axiosInstance.put(`/songs/${id}`,payload);
    return response.data;
}



const deleteSong = async (id)=>{
    const response = await axiosInstance.delete(`/songs/${id}`);
    return response.data;
}
export {getSongsOfArtist,addSong,getSongById,updateSongById,deleteSong};