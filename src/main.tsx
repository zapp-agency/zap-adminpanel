import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
// import { router } from "./config/router";

import './globals.css';
import { Provider } from 'react-redux';
import { persistor, store } from './core/store';
import { PersistGate } from 'redux-persist/integration/react';

import { routeTree } from './routeTree.gen';
import Toaster from './components/ui/Alert';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position={'top-right'} />
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
