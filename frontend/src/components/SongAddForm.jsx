import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { songRegisterValidationSchema, songValidationSchema } from '../schemas/validationSchema';
import FormInput from './form/FormInput';
import { useLocation } from 'react-router-dom';
import FormSelect from './form/FormSelect';
import useAddSong from '../hooks/useAddSong';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { GenreEnum } from '../helpers/helpers';
import useUpdateSongById from '../hooks/useUpdateSongById';
function SongAddForm({submitBtnName="Register",onSuccessCallback=null,defaultValues=null}) {
  const {data:currentUserInfo}=useCurrentUser();
  const registerMutation = useAddSong(onSuccessCallback,currentUserInfo?.artist_id);
  const updateMutation = useUpdateSongById(defaultValues?.id,currentUserInfo?.artist_id,onSuccessCallback);
  const location = useLocation();
  const isEditMode = location.pathname.includes('edit');
  const mutation = isEditMode ? updateMutation : registerMutation;
  const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(isEditMode?songValidationSchema:songRegisterValidationSchema),
        defaultValues: defaultValues?defaultValues:{
          title: "",
          album_name: "",
          genre: "",
          artist_id:currentUserInfo?.artist_id
        }
      });
      const onSubmit = (data) => {
        mutation.mutate(data);
      };
  
  return (
    <form className="authForm__form cForm" onSubmit={handleSubmit(onSubmit)}>
      <FormInput control={control} name="title" label="Song Title" errors={errors} />
      <FormInput control={control} name="album_name" label="Album Name" errors={errors} />
        <FormSelect
          control={control}
          name="genre"
          label="Genre"
          options={Object.entries(GenreEnum).map(([value, label]) => ({
            label,
            value
          }))}
          errors={errors}
        />
      <div className="cForm__buttons">
        <button className="cBtn cBtn--green authForm__button" type="submit" disabled={mutation.isLoading}>
          <span>{mutation.isLoading ? `${submitBtnName}ing` : submitBtnName}</span>
        </button>
      </div>
  </form>
  )
}

export default SongAddForm;
