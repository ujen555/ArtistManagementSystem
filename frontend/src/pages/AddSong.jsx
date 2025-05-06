import React from 'react'
import { useNavigate } from 'react-router-dom';
import FormLayout from '../layouts/FormLayout';
import SongAddForm from '../components/SongAddForm';

function AddSong() {
    const navigate=useNavigate();
    return (
      <FormLayout formTitle='Add Songs'>
          <SongAddForm submitBtnName='Add'  onSuccessCallback={()=>navigate('/songs')}/>
      </FormLayout>
    )
}

export default AddSong
