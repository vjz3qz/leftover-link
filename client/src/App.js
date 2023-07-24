import React from 'react';
import Home from './pages/Home';
import Mission from './pages/Mission';
import About from './pages/About';
import Contact from './pages/Contact';
import NavigationBar from './components/NavigationBar';

function App() {

  return (
    <div className="App">
      <NavigationBar />
      <Home />
      <Mission />
      <About />
      <Contact />
    </div>
  );
}

export default App;