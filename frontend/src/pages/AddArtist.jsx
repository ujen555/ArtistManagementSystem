import React from 'react'
import FormLayout from '../layouts/FormLayout';
import { useNavigate } from 'react-router-dom';
import ArtistRegisterForm from '../components/ArtistRegisterForm';

function AddArtist() {
    const navigate=useNavigate();
  return (
    <FormLayout formTitle='Add Artist'>
        <ArtistRegisterForm submitBtnName='Add' onSuccessCallback={()=>navigate('/artists')}/>
    </FormLayout>
  )
}

export default AddArtist
