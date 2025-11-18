import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Header from './Components/Header';
import Home from "./Components/Header"
const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;