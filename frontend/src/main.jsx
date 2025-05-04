import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/main.css';
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Register from './pages/register.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute.jsx';
import Login from './pages/Login.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import SidebarContextProvider from './context/SidebarContext.jsx';
import Users from './pages/Users.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import AddUser from './pages/AddUser.jsx';
import EditUser from './pages/EditUser.jsx';
import Unauthorized from './pages/Unauthorized.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute allowedRoles={['super_admin', 'artist_manager', 'artist']}>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'users',
        element: (
          <PrivateRoute allowedRoles={['super_admin']}>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: 'users/add',
        element: (
          <PrivateRoute allowedRoles={['super_admin']}>
            <AddUser />
          </PrivateRoute>
        ),
      },
      {
        path: 'users/edit/:id',
        element: (
          <PrivateRoute allowedRoles={['super_admin']}>
            <EditUser />
          </PrivateRoute>
        ),
      },
      {
        path: '/unauthorized',
        element: <Unauthorized />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, 
      refetchOnWindowFocus: false, 
      staleTime: 5 * 60 * 1000, 
      cacheTime: 10 * 60 * 1000,
      suspense: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider  client={queryClient}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar theme="colored"/>
      <SidebarContextProvider>
        <RouterProvider  outerProvider router={router}></RouterProvider>
      </SidebarContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
