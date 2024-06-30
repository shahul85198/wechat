import React, { useContext, useState } from 'react';
import axios from 'axios';
import { store } from './App';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [token, setToken] = useContext(store);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submithandler = (e) => {
    e.preventDefault();
    axios.post('http://172.16.5.4:3001/login', data)
      .then(res => setToken(res.data.token))
      .catch(err => console.error(err));
  };

  if (token) {
    return <Navigate to='/myprofile' />;
  }

  return (
    <div>
      <center>
        <form onSubmit={submithandler} autoComplete="off">
          <h3>Login</h3>
          <input type='email' onChange={changeHandler} name='email' placeholder='Email' /><br />
          <input type='password' onChange={changeHandler} name='password' placeholder='Password' /><br />
          <input type='submit' value='Login' /><br />
        </form>
      </center>
    </div>
  );
};

export default Login;
