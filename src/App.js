import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Codearea from './Components/Codearea';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/Codearea" element={<Codearea/>}></Route>
    </Routes>
    </Router>
    </>
  );
}

export default App;
