import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser.js';
import Loader from './Loader.jsx';

const PrivateRoute = ({ children, allowedRoles=[]}) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Or your auth logic
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return <div className='loadingWrapper'>
    <Loader></Loader>
  </div>
  
  
  if(!isAuthenticated || !user || isError) {
    return <Navigate to="/login" />
  }
  
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return  children;
};

export default PrivateRoute;