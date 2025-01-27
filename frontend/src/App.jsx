import React from 'react'
import Navbar from "./components/Navbar"
import { Routes, Route, Navigate} from "react-router-dom"

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from "./store/useThemeStore";
import { Loader} from "lucide-react"
import { Toaster } from "react-hot-toast"

const App = () => {
  
  
  const {authUser,checkAuth, isCheckingAuth} = useAuthStore()
  const { theme } = useThemeStore();

  useEffect(() => {
   
    checkAuth()
  }, [checkAuth]);
  
  

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-sc">
      <Loader className="size-10 animate-spin" />
    </div>
  )
  
  
  

  return (
  <div data-theme={theme}>

    <Navbar />
    
    <Routes>

      <Route path="/" element = {authUser ? <HomePage /> : <Navigate to="/login" />}/>
      <Route path="/signup" element = {!authUser ? <SignUpPage /> : <Navigate to="/" />}/>
      <Route path="/login" element = {!authUser ?<LoginPage /> : <Navigate to="/"/>}/>
      <Route path="/profile" element = {<ProfilePage />}/>
      <Route path="/settings" element = {<SettingsPage />}/>
      
      
    </Routes>
    
    <Toaster />
  </div>
  )
}

export default App;
