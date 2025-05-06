import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSongById } from '../hooks/useGetSongById';
import FormLayout from '../layouts/FormLayout';
import Loader from '../components/Loader';
import SongAddForm from '../components/SongAddForm';

function EditSong() {
    const navigate=useNavigate();
    const { id } = useParams();
    const { isLoading, data } = useGetSongById(id);
  return (
    <FormLayout formTitle='Edit Song'>
        {isLoading ?<Loader></Loader>:<SongAddForm submitBtnName='Update Song'  onSuccessCallback={()=>navigate('/songs')} defaultValues={data}/>}
    </FormLayout>
  )
}

export default EditSong
