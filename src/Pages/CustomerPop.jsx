import React, { useState } from 'react'
import { baseUrl } from '../api';
import axios from 'axios';

function CustomerPop({isVisible,onClose}) {
  if(!isVisible) return null;
  const [customerForm,setCustomerForm] = useState({
    name:"",
    email:"",
    phone:"",
    address:"",
    assignedTo:"",
  })
  const handleChange = (e) => {
    setCustomerForm({...customerForm, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
 try{
  const token = localStorage.getItem("token");
  if(!token){
    console.log("err token");
  }
  const res = await axios.post(`${baseUrl}/customer`,customerForm,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  alert(res.data.message);
  setCustomerForm({
    name:"",
    email:"",
    phone:"",
    address:""
  })
 }catch(err){
  console.error(err);
 }
    
   
  }
  return (
    <div className="fixed top-0 w-screen h-screen  bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className='w-[600px] flex flex-col'>
          <button className=' text-xl place-self-end' onClick={() => onClose()}>X</button>
        <div className='bg-gray-200 py-6 px-6 lg:px-8 text-left rounded '>
      <h2 className='mb-4 text-xl font-medium text-gray-900'>CUSTOMER FORM</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
        <label htmlFor="" className='block mb-2 text-sm font-medium text-gray-900'>Customer Name:</label>
        <input type="text" onChange={handleChange} value={customerForm.name} className='bg-gray-500 mb-2 font-semibold border border-gray-300 text-white-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' name='name' />
                <label htmlFor="" className='block mb-2 text-sm font-medium text-gray-900'>Customer Email:</label>
        <input type="email" onChange={handleChange} value={customerForm.email} className='bg-gray-500 mb-2 font-semibold border border-gray-300 text-white-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' name='email' />
                <label htmlFor="" className='block mb-2 text-sm font-medium text-gray-900'>Customer Phone:</label>
        <input type="phone" onChange={handleChange} value={customerForm.phone} className='bg-gray-500 mb-2 font-semibold border border-gray-300 text-white-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' name='phone' />
                <label htmlFor="" className='block mb-2 text-sm font-medium text-gray-900'>Customer Address:</label>
        <input type="address" onChange={handleChange} value={customerForm.address} className='bg-gray-500 mb2 font-semibold border border-gray-300 text-white-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' name='address' />
        </div>
        <div className=' flex flex-row-reverse'>

          <button type='submit' className='bg-blue-700 text-white px-4 py-1 rounded-lg font-bold '>Save</button>
        </div>
       
      </form>
        </div>
      </div>
    </div>
  )
}

export default CustomerPop
