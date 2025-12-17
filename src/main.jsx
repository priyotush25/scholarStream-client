import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Root from './pages/Root/Root.jsx'

import AuthProvider from './context/AuthProvider/AuthProvider.jsx'
import router from './routes/router.jsx'

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
