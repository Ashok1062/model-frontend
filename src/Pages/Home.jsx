import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CustomerPop from './CustomerPop';
import axios from 'axios';
import { baseUrl } from '../api';
import { jwtDecode } from 'jwt-decode';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [customer, setCustomer] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => { 
    localStorage.removeItem("token");
    navigate("/");
  }

  const fetchCustomer = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${baseUrl}/customer`,{
        headers:{
      Authorization:`Bearer ${token}`
    }
      });
      setCustomer(res.data);
      console.log(setCustomer);
      
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/");
      return;
    }
    try{
      const decoded = jwtDecode(token);
      console.log(decoded);
      setUsername(decoded.username);

    }catch(err){
      console.log(err)
    }
    fetchCustomer();
  }, [navigate]);
 

  return (
    <div>
      <nav className='flex justify-between p-4 bg-slate-800 text-white'>
        <h1 className='font-bold'>Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className='bg-red-500 rounded px-3 py-1 text-black cursor-pointer font-semibold'>
          Logout
        </button>
      </nav>

      <div className='flex flex-col justify-center items-center h-[500px]'>
        <h1 className='text-3xl font-bold'>Welcome, You're logged in 
             {username}
        </h1>
        <button 
          className='border font-semibold bg-blue-400 text-white px-3 py-1 rounded-xl mt-4' 
          onClick={() => setShowModal(true)}>
          + Create Customer
        </button>
        <CustomerPop 
          isVisible={showModal} 
          onClose={() => {
            setShowModal(false);
            fetchCustomer(); // refresh customer list after closing form
          }} 
        />
      </div>

      <div className='p-4'>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-3'>
          {customer.map(data => (
            <div key={data._id} className='bg-gray-200 p-4 rounded shadow'>
              <h1 className='font-bold text-lg'>{data.name}</h1>
              <p>{data.email}</p>
              <p>{data.phone}</p>
              <p>{data.address}</p>
              <p className='text-sm text-gray-600'>Assigned: {data.assignedTo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
