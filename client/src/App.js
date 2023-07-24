import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Mission from './pages/Mission';
import Contact from './pages/Contact';
import AddFood from "./pages/AddFood";
import NavigationBar from './components/NavigationBar';

function App() {

  return (
    <div className="App">
      <NavigationBar />
      <Home />
      <Mission />
      <Contact />
    </div>
  );
}

export default App;