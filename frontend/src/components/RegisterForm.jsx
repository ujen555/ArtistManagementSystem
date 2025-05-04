import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import useRegister from '../hooks/useRegister';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerValidationSchema ,userValidationSchema} from '../schemas/validationSchema';
import FormInput from './form/FormInput';
import FormPasswordInput from './form/FormPasswordInput';
import FormSelect from './form/FormSelect';
import useUpdateUser from '../hooks/useUpdateUser';
function RegisterForm({submitBtnName="Register",isShowBackToLogin=true,onSuccessCallback=null,defaultValues=null}) {
      const registerMutation = useRegister(onSuccessCallback);
      const updateMutation = useUpdateUser(defaultValues?.id,onSuccessCallback);
      const location = useLocation();
      const isEditMode = location.pathname.includes('edit');
      const mutation = isEditMode ? updateMutation : registerMutation;
      const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(isEditMode?userValidationSchema:registerValidationSchema),
        defaultValues: defaultValues?defaultValues:{
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          dob: '',
          phone: '',
          address: '',
          role: '',
          gender: '',
        }
      });
    
      const onSubmit = (data) => {
        mutation.mutate(data);
      };
      

      
  return (
    <form className="authForm__form cForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="cForm__fieldgroup--2">
            <FormInput control={control} name="first_name" label="First Name" errors={errors} />
            <FormInput control={control} name="last_name" label="Last Name" errors={errors} />
          </div>

          <FormInput control={control} name="email" label="Email" type="email" errors={errors} />
          {!isEditMode && <FormPasswordInput control={control} name="password" label="Password"  errors={errors} />}
          <div className="cForm__fieldgroup--2">
            <FormInput control={control} name="dob" label="Date of Birth" type="date" errors={errors} />
            <FormInput control={control} name="phone" label="Phone Number" type="tel" errors={errors} />
          </div>

          <FormInput control={control} name="address" label="Address" errors={errors} />

          <div className="cForm__fieldgroup--2">
            <FormSelect
              control={control}
              name="role"
              label="Role"
              options={[
                { label: "Super Admin", value: "super_admin" },
                { label: "Artist Manager", value: "artist_manager" },
                { label: "Artist", value: "artist" },
              ]}
              errors={errors}
            />
            <FormSelect
              control={control}
              name="gender"
              label="Gender"
              options={[
                { label: "Male", value: "m" },
                { label: "Female", value: "f" },
                { label: "Other", value: "o" },
              ]}
              errors={errors}
            />
          </div>
          <div className="cForm__buttons">
            <button className="cBtn cBtn--green authForm__button" type="submit" disabled={mutation.isLoading}>
              <span>{mutation.isLoading ? `${submitBtnName}ing` : submitBtnName}</span>
            </button>
          </div>
          {
            isShowBackToLogin &&   <div className="cForm__helperText">
            Go Back to <Link to={'/login'} className="cForm__link">Login</Link> 
          </div>
          }
    </form>
  )
}

export default RegisterForm
