import React from 'react';
import Home from './pages/Home';
import Mission from './pages/Mission';
import About from './pages/About';
import Contact from './pages/Contact';
import NavigationBar from './components/NavigationBar';
import FoodTracker from './pages/FoodTracker';

function App() {

  return (
    <div className="App">
      <NavigationBar />
      <Home />
      <Mission />
      <hr class="w-1/2 h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-700" />
      <FoodTracker />
      <About />
      <Contact />
    </div>
  );
}

export default App;