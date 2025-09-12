import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl } from '../api';


function Signup() {
  const [form,setForm] = useState({
    username:"",
    email:"",
    password:"",
    role:"",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }
const  handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${baseUrl}/auth/register`,form);
     navigate("/");
  }
  return (
    <div className='p-6 max-w-sm mx-auto'>
      <h2 className='text-xl font-bold mb-4'>SignUp Form</h2>

      <form className='space-y-4 mt-4' onSubmit={handleSubmit} >
        <input className='border px-3 w-full ' name='username' onChange={handleChange} placeholder='Username' type="text" />
        <input className='border px-3 w-full ' name='email' onChange={handleChange} placeholder='Email' type="email" />
        <input className='border px-3 w-full ' name='password' onChange={handleChange} placeholder='Password' type="password" />
        <select className='w-full border' name="role" onChange={handleChange} id="">
          <option value="">--select your role</option>
          <option value="employee">Empolyee</option>
          <option value="admin">Admin</option>
        </select>
        <button type='submit' className='bg-blue-700 text-white font-semibold rounded-xl px-3 py-1 mb-4'>SignUp</button>
      </form>
      <p className='text-sm font-semibold '>Already have an accound <Link className='font-bold text-blue-700' to="/">Login</Link></p>
    </div>
  )
}

export default Signup
