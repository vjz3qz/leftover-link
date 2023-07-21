import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AddFood from "./pages/AddFood";
import NavigationBar from './components/NavigationBar';

function App() {

  return (
    <div className="App">
      <NavigationBar />
      <Home />
      <About />
      <Contact />
    </div>
  );
}

export default App;