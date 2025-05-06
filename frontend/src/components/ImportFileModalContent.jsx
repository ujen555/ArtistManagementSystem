import React from 'react'
import { useForm } from 'react-hook-form';
import FormInput from './form/FormInput';
import FormFileInput from './form/FormFileInput';
import useImportArtistsCSV from '../hooks/useImportArtistsCSV';
import { useState } from 'react';

function ImportFileModalContent({onSuccessCallback}) {
    const importArtistsCSVMutation = useImportArtistsCSV(onSuccessCallback);
    const [baseFile,setBaseFile]=useState(null)
    const { handleSubmit, control, formState: { errors } } = useForm({
          defaultValues:{
            file:''
          }
    });
    
    const handleFileChange = (file) => {
      setBaseFile(file);
    };
    const onSubmit = () => {
      importArtistsCSVMutation.mutate(baseFile);
    };
  return (
    <>
      <h2 className="componentPanel__header__title">Upload CSV file of Artists</h2>
      <form className="authForm__form cForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
          <FormFileInput
          control={control}
          name="file"
          label="Upload Artists CSV"
          accept=".csv"
          multiple={false}
          errors={errors}
          onChange={handleFileChange} 
        />
        <ul className="warning">
          {
            importArtistsCSVMutation.data?.warnings.map((w,index)=>
              <li key={index}>
                {w}
              </li>
            )
          }
        </ul>
        {
          importArtistsCSVMutation.isSuccess && <div className="success">
          Imported {importArtistsCSVMutation.data?.imported} file Succesfully
        </div>
        }
        
        </div>
        <div className="modal-footer">
          <button className="cBtn cBtn--green authForm__button" type="submit" >
            <span>Upload</span>
          </button>
        </div>
      </form>
    </>

  )
}

export default ImportFileModalContent;
