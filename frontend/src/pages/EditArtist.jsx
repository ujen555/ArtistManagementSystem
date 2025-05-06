import React from 'react'
import RegisterForm from '../components/RegisterForm'
import FormLayout from '../layouts/FormLayout'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import ArtistRegisterForm from '../components/ArtistRegisterForm';
import { useGetArtistById } from '../hooks/useGetArtistById';

function EditArtist() {
    const navigate=useNavigate();
    const { id } = useParams();
    const { isLoading, data } = useGetArtistById(id);
  return (
    <FormLayout formTitle='Edit Artist'>
        {isLoading ?<Loader></Loader>:<ArtistRegisterForm submitBtnName='Update Artist'  onSuccessCallback={()=>navigate('/artists')} defaultValues={data}/>}
    </FormLayout>
  )
}

export default EditArtist
