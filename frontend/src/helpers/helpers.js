const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  

 const GenderEnum = {
    m: 'Male',
    f: 'Female',
    o: 'Other'
  };

   const RoleEnum = {
    artist_manager: 'Artist Manager',
    super_admin: 'Super Admin',
    artist: 'Artist'
  };
  export {formatDate,GenderEnum,RoleEnum};