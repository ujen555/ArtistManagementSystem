import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser.js';
import Loader from './Loader.jsx';

const PrivateRoute = ({ children, allowedRoles=[]}) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); 
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return  <Loader></Loader>
  
  
  if(!isAuthenticated || !user || isError) {
    return <Navigate to="/login" />
  }
  
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return  children;
};

export default PrivateRoute;