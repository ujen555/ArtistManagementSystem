import { useCurrentUser } from "../hooks/useCurrentUser";

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

  const GenreEnum = {
    rnb: 'R&B',
    country: 'Country',
    classic: 'Classic',
    rock: 'Rock',
    jazz: 'Jazz'
  };


  function hasRole(user,allowedRoles){
    if (!user || !user.role) return false;
    return allowedRoles.includes(user.role);
  }
  export {formatDate,GenderEnum,RoleEnum,GenreEnum,hasRole};