import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider.jsx';
import { GeminiContextProvider } from './context/GoogleGemini.jsx';
import router from './router.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <GeminiContextProvider>
    <RouterProvider router={router} />
      </GeminiContextProvider>
    </ContextProvider>
  </React.StrictMode>
)
