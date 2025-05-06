import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { importArtistsCSV } from '../api/artistsService';

const useImportArtistsCSV = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: importArtistsCSV,
    onSuccess: (data) => {
      if(data.imported > 0){
        toast.success(data.message || 'Artists imported successfully!');
      }

      
      if (Array.isArray(data.warnings) && !data.warnings.length > 0 && onSuccessCallback) {
        onSuccessCallback()
      }
      queryClient.invalidateQueries({ queryKey: ['/artists'] });
      
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        errorMessage.forEach((errMsg) => {
          toast.error(errMsg);
        });
      } else {
        toast.error(errorMessage || 'CSV import failed! Please try again.');
      }
    },
  });
};

export default useImportArtistsCSV;