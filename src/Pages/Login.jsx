import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../api';
import {jwtDecode} from "jwt-decode";

function Login() {
  const [form,setForm] = useState({
    email:"",
    password:"",
  });
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const handelChange = (e) => {
    setForm({...form ,[e.target.name]: e.target.value});
  }

  // Login api call (e) parameter value

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(`${baseUrl}/auth/login`,form);
      localStorage.setItem("token",res.data.token);
      
      const decoded = jwtDecode(res.data.token);

      if(decoded.role === "admin"){
         navigate("/home")
      }else if(decoded.role === "employee"){
        navigate("/employee")
      }
        
      
    }catch(err){
      setError("Ivalid credentials");
    }
  }
  return (
    <div className='p-6 max-w-sm mx-auto '>
      <h2 className='text-xl font-bold mb-4'>Login Form</h2>

      <form className='space-y-4' onSubmit={handleSubmit}>
        <input className='border px-3'name='email' onChange={handelChange} placeholder='email'   type="email" />
        <input className='border px-3' name='password'onChange={handelChange} placeholder='password' type="password" /><br />
        {error && <p className='text-red-500 text-sm'>{error}</p> }
        <button className='bg-blue-500  text-white p-2 rounded-xl' type='submit'>Login</button>
      </form>
      <p className='text-sm font-semibold'>Don't have an account ? <Link className='text-blue-700' to="/register">SignUp</Link></p>
    </div>
  )
}

export default Login
