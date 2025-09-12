import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import employeeHome from './Pages/employeeHome'
import ProtectedRoutes from './Componenes/ProtectedRoutes'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login/> }/>
      <Route path="/register" element={<Signup/> }/>
      <Route path="/home" element={
        <ProtectedRoutes> <Home/> </ProtectedRoutes>}/>
      <Route path="/employee" element={
        <ProtectedRoutes> <employeeHome /> </ProtectedRoutes>}/>
    </Routes>
    </>
  )
}

export default App
