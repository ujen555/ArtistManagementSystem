import React from 'react'
import RegisterForm from '../components/RegisterForm'
import FormLayout from '../layouts/FormLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserById } from '../hooks/useGetUserById';
import Loader from '../components/Loader';

function EditUser() {
    const navigate=useNavigate();
    const { id } = useParams();
    const { isLoading, data } = useGetUserById(id);
  return (
    <FormLayout formTitle='Edit User'>
        {isLoading ?<Loader></Loader>:<RegisterForm submitBtnName='Update User' isShowBackToLogin={false} onSuccessCallback={()=>navigate('/users')} defaultValues={data}/>}
    </FormLayout>
  )
}

export default EditUser
