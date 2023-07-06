import {React, useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Home from './pages/Home';
import RecentlyPlayed from './pages/components/RecentlyPlayed';
import Navbar from './pages/components/Navbar';

import './App.css'

function App() {
  
  // const [count, setCount] = useState(0)

  return (
    <>
    {/* <Navbar></Navbar> */}
    
      
      <BrowserRouter>
        <Routes>
        <Route exact path='/' element={< Home />}></Route>  
        </Routes>
      </BrowserRouter>

      

    
    </>
    // <Home></Home>
  )
}

export default App
