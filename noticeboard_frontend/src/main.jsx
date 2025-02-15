import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkModeContextProvider } from "./context/darkModeContext";
import React from 'react'
import { applyTheme } from "./utils/theme.js";
applyTheme()

createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <DarkModeContextProvider>
    <App/>
  </DarkModeContextProvider>
 </React.StrictMode>
)
