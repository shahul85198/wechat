import React, {useContext, useState, useEffect} from "react";
import {store} from './App'
import { Navigate } from "react-router-dom";
import axios from "axios";

 const Myprofile = () => {
      const [token, setToken] = useContext(store)
      const [data,setData] = useState(null)
      useEffect(() => {
        if (token) {
          axios.get('http://172.16.5.4:3001/myprofile', {
            headers: {
              'x-token': token,
            },
          })
          .then(res => setData(res.data))
          .catch(err => console.error(err));
        }
      }, [token]);
    if(!token) {
        return <Navigate to='/login' />
    }
    
    return (
        <div>
            {
                data &&
            <center>
                welcome user : {data.username} <br />
                <button onClick={() => setToken(null)}>Logout</button>
            </center>
             }
        </div>
    )
 }
 export default Myprofile