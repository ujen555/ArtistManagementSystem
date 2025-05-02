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

const router=createBrowserRouter([
  {
    path:'/',
    element:
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>,
    children: [
      {
        path: 'users',
        element: <Users/>
      }
    ]
  },
  {
    path:'/register',
    element:<Register></Register>
  },
  {
    path:'/login',
    element:<Login></Login>
  }
])

const queryClient = new QueryClient();

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
