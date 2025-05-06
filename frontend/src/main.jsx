import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/main.css';
import "react-toastify/dist/ReactToastify.css";
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
import AddUser from './pages/AddUser.jsx';
import EditUser from './pages/EditUser.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import Artists from './pages/Artists.jsx';
import AddArtist from './pages/AddArtist.jsx';
import EditArtist from './pages/EditArtist.jsx';
import Songs from './pages/Songs.jsx';
import AddSong from './pages/AddSong.jsx';
import EditSong from './pages/EditSong.jsx';
import DashboardHome from './pages/DashboardHome.jsx';

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
        index: true,
        element: (
          <PrivateRoute allowedRoles={['super_admin', 'artist_manager', 'artist']}>
            <DashboardHome/>
          </PrivateRoute>
        ),
      },
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
        path: 'artists',
        element: (
          <PrivateRoute allowedRoles={['super_admin','artist_manager']}>
            <Artists />
          </PrivateRoute>
        ),
      },
      {
        path: 'artists/add',
        element: (
          <PrivateRoute allowedRoles={['artist_manager']}>
            <AddArtist />
          </PrivateRoute>
        ),
      },
      {
        path: 'artists/edit/:id',
        element: (
          <PrivateRoute allowedRoles={['artist_manager']}>
            <EditArtist />
          </PrivateRoute>
        ),
      },
      {
        path: 'artists/:id/songs',
        element: (
          <PrivateRoute allowedRoles={['artist_manager','super_admin','artist]']}>
            <Songs />
          </PrivateRoute>
        ),
      },
      {
        path: 'songs',
        element: (
          <PrivateRoute allowedRoles={['artist']}>
            <Songs />
          </PrivateRoute>
        ),
      },
      {
        path: 'songs/add',
        element: (
          <PrivateRoute allowedRoles={['artist']}>
            <AddSong />
          </PrivateRoute>
        ),
      },
      {
        path: 'songs/edit/:id',
        element: (
          <PrivateRoute allowedRoles={['artist']}>
            <EditSong />
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
