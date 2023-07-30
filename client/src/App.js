import React, { useState, useContext } from "react";
import { UserContext } from './contexts/UserContext';
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NavigationBar from "./components/NavigationBar";
import FoodTracker from "./pages/FoodTracker";

function App() {
  const [Login, setLogin] = useState(false);
  const { restaurantInfo } = useContext(UserContext);
  if (Object.keys(restaurantInfo).length > 0) { // if the user is logged in
    setLogin(true);
  }
  return (
    <div className="App">
      <NavigationBar />
      <Home />
      <Mission />

      <hr class="w-1/2 h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-700" />
      {Login && (
        <div>
          <FoodTracker />
          <hr className="w-1/2 h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-700" />
        </div>
      )}
      <About />
      <Contact />
    </div>
  );
}

export default App;
