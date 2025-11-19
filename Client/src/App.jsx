import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Header from './Components/Header';
import Home from "./Components/Home"
import About from './Components/About';
const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;