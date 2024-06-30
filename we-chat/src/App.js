
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from './Nav';
import Register from './Register';
import Myprofile from './Myprofile';
import Login from './Login';
import { createContext, useState } from 'react';

export const store = createContext()

function App() {

  const [token, setToken] = useState(null)

  return (
    <div>
      <store.Provider value={[token, setToken]}>
     <BrowserRouter>
     <Nav />
     <Routes>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/myprofile' element={<Myprofile />} />
      </Routes>
     </BrowserRouter>
     </store.Provider>
    </div>
  ); 
}

export default App;
