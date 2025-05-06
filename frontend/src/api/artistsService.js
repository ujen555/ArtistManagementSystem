import axiosInstance from "../api";

const getArtists = async ({page=1,limit=10})=>{
    const response = await axiosInstance.get(`/artists?page=${page}&limit=${limit}`);
    return response.data;
}

const addArtist = async (artist)=>{
    const response = await axiosInstance.post(`/artists/create-artist`,artist);
    return response.data;
}

const getUnregisteredArtists=async ()=>{
    const response = await axiosInstance.get(`/artists/unregistered-artists`);
    return response.data;
} 

const updateArtist = async (id,payload)=>{
    const response = await axiosInstance.put(`/artists/${id}`,payload);
    return response.data;
}

const getArtistById = async (id)=>{
    const response = await axiosInstance.get(`/artists/${id}`);
    return response.data;
  }
  

const deleteArtist = async (id)=>{
    const response = await axiosInstance.delete(`/artists/${id}`);
    return response.data;
}

const importArtistsCSV = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); 
        const response = await axiosInstance.post('/artists/import-artists-csv', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error importing artists:', error);
        throw error; 
    }
};


const exportArtistsCSV =async ()=>{
    const response = await axiosInstance.get(`/artists/export`);
    return response.data;
}


  
export {getArtists,addArtist,getUnregisteredArtists,updateArtist,getArtistById,deleteArtist,importArtistsCSV,exportArtistsCSV};