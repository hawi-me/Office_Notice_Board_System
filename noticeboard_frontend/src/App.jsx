import * as React from 'react';
import { ThemeProvider } from '@material-tailwind/react'; // Import ThemeProvider

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import TvNoticeDisplay from './pages/TvNoticeDisplay';
import Signin from './pages/Signin';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';


const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/tvnotice', element: <TvNoticeDisplay /> },
  { path: '/signin', element: <Signin /> },
  { path: '/editprofile', element: <EditProfile /> }
]);

const App = () => {
  return (
      <RouterProvider router={router} />

    
  );
         
};

export default App;
