import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { useNavigate } from 'react-router-dom'
import FormLayout from '../layouts/FormLayout';

function AddUser() {
    const navigate=useNavigate();
  return (
    <FormLayout formTitle='Add Users'>
        <RegisterForm submitBtnName='Add' isShowBackToLogin={false} onSuccessCallback={()=>navigate('/users')}/>
    </FormLayout>
  )
}

export default AddUser
