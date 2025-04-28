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

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/register',
    element:<Register></Register>
  }
])

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider  client={queryClient}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar theme="colored"/>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
