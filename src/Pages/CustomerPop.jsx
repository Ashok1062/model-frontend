import React, { useState, useEffect } from 'react';
import { baseUrl } from '../api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function CustomerPop({ isVisible, onClose, editData }) {
  if (!isVisible) return null;

  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    assignedTo: ""
  });

  // prefill form if edit
  useEffect(() => {
    if (editData) {
      setCustomerForm(editData);
    } else {
      setCustomerForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        assignedTo: ""
      });
    }
  }, [editData]);

  // get userId from token once
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
    } catch (err) {
      console.log("JWT decode error", err);
    }
  }, [navigate]);

  // handle form input
  const handleChange = (e) => {
    setCustomerForm({ ...customerForm, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token missing");
        return;
      }

      let res;
      if (editData) {
        // UPDATE
        res = await axios.put(`${baseUrl}/customer/${editData._id}`, customerForm, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        // CREATE
        const payload = { ...customerForm, assignedTo: userId };
        res = await axios.post(`${baseUrl}/customer`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      alert(res.data.message || "Customer saved!");
      onClose(); // close modal & trigger refresh in Home
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="fixed top-0 w-screen h-screen bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button className="text-xl place-self-end" onClick={onClose}>X</button>
        <div className="bg-gray-200 py-6 px-6 lg:px-8 text-left rounded">
          <h2 className="mb-4 text-xl font-medium text-gray-900">CUSTOMER FORM</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Customer Name:</label>
              <input type="text" onChange={handleChange} value={customerForm.name} name="name" className="bg-gray-500 mb-2 font-semibold border border-gray-300 text-white rounded-lg block w-full p-2.5" />

              <label className="block mb-2 text-sm font-medium text-gray-900">Customer Email:</label>
              <input type="email" onChange={handleChange} value={customerForm.email} name="email" className="bg-gray-500 mb-2 font-semibold border border-gray-300 text-white rounded-lg block w-full p-2.5" />

              <label className="block mb-2 text-sm font-medium text-gray-900">Customer Phone:</label>
              <input type="text" onChange={handleChange} value={customerForm.phone} name="phone" className="bg-gray-500 mb-2 font-semibold border border-gray-300 text-white rounded-lg block w-full p-2.5" />

              <label className="block mb-2 text-sm font-medium text-gray-900">Customer Address:</label>
              <input type="text" onChange={handleChange} value={customerForm.address} name="address" className="bg-gray-500 mb-2 font-semibold border border-gray-300 text-white rounded-lg block w-full p-2.5" />
            </div>

            <div className="flex flex-row-reverse">
              <button type="submit" className="bg-blue-700 text-white px-4 py-1 rounded-lg font-bold">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerPop;
