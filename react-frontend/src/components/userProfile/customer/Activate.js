import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { message } from 'antd';
import jwt from 'jsonwebtoken';

import { Link, Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    show: true
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }

    console.log(token, name);
  }, [match.params]);
  const { name, token, show } = formData;

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`http://localhost:4000/userprofile/customer/activationcustomer`, {
        token
      })
      .then(res => {
        setFormData({
          ...formData,
          show: false
        });

        message.success(res.data.message);
      })
      .catch(err => {
        
        message.error(err.response.data.errors);
      });
  };

  return (
    <div style={{backgroundColor:'beige', height:'700px'}}>
     
      <div style={{  marginLeft:'500px', paddingTop:'200px' ,height:'400px', width:'500px'}}>
      
            

            <form
              onSubmit={handleSubmit}
            >
              <h1 style={{marginBottom:'0px', marginLeft:'50px'}} >
              Welcome {name}
            </h1>
              
                <button
                  type='submit' style={{backgroundColor:'wheat', color:'black', border:'1px solid black', marginLeft:'120px'}}
                  className='font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                
                  <span>Activate your Account</span>
                </button>
              
            
              <div>
                <a
                  
                  href='/login'
                  target='_self'
                  style={{marginLeft:'170px'}}
                >
                  
                  <span>Sign in</span>
                </a>
              </div>
            </form>
          </div>
          </div>
  );
};

export default Activate;