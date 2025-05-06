import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { artistRegisterValidationSchema, artistValidationSchema } from '../schemas/validationSchema';
import FormInput from './form/FormInput';
import { Link, useLocation } from 'react-router-dom';
import FormSelect from './form/FormSelect';
import useAddArtist from '../hooks/useAddArtist';
import { useGetUnregisteredArtists } from '../hooks/useGetUnregisteredArtists';
import Loader from '../components/Loader';
import useUpdateArtist from '../hooks/useUpdateArtist';
function ArtistRegisterForm({submitBtnName="Register",onSuccessCallback=null,defaultValues=null}) {

  const registerMutation = useAddArtist(onSuccessCallback);
  const updateMutation = useUpdateArtist(defaultValues?.id,onSuccessCallback);
  const location = useLocation();
  const isEditMode = location.pathname.includes('edit');
  const mutation = isEditMode ? updateMutation : registerMutation;
  const {data:unregisteredArtists,isFetching:isUnregisteredArtistsLoading}=useGetUnregisteredArtists();
  const artistOpions=isEditMode?[{
    id:defaultValues.user_id,
    email: defaultValues.email,
    first_name: defaultValues.first_name,
    last_name: defaultValues.last_name
  }]:unregisteredArtists;
  const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(isEditMode?artistValidationSchema:artistRegisterValidationSchema),
        defaultValues: defaultValues?defaultValues:{
          name: "",
          dob: "",
          gender: "",
          address: "",
          first_release_year: "",
          no_of_albums_released: "",
          user_id: ""
        }
      });
      const onSubmit = (data) => {
        mutation.mutate(data);
      };
  
  return (
    <form className="authForm__form cForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="cForm__fieldgroup--2">
        <FormInput control={control} name="name" label="Artist Name" errors={errors} />
        {
          isUnregisteredArtistsLoading?<Loader></Loader>:<FormSelect
          control={control}
          name="user_id"
          label="Users"
          disabled={isEditMode}
          options={
            artistOpions?.map((ar)=>{
              return {
                label: `${ar.email} (${ar.first_name} ${ar.last_name})`,
                value:ar.id
              }
            })
          }
          errors={errors}
        />
        }
      </div>
      <FormInput control={control} name="address" label="Address" errors={errors} />
      <div className="cForm__fieldgroup--2">
        <FormInput control={control} name="first_release_year" label="First Release Year" errors={errors} />
        <FormInput control={control} name="no_of_albums_released" label="No of Albums released" errors={errors} />
      </div>
      <div className="cForm__fieldgroup--2">
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
        <FormInput control={control} name="dob" label="Date of Birth" type="date" errors={errors} />
      </div>
      <div className="cForm__buttons">
        <button className="cBtn cBtn--green authForm__button" type="submit" disabled={mutation.isLoading}>
          <span>{mutation.isLoading ? `${submitBtnName}ing` : submitBtnName}</span>
        </button>
      </div>
  </form>
  )
}

export default ArtistRegisterForm;
