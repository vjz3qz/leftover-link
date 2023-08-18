import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NavigationBar from "./components/NavigationBar";
import FoodTracker from "./pages/FoodTracker";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subscribe from "./pages/Subscribe";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === "/" && <NavigationBar />}
      <Routes>
        <Route
          path="/"
          element={
            <div className=" dark:bg-gray-800">
              <Home />
              <Mission />
              <hr className="w-1/2 h-1 mx-auto my-2 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-700 dark:shadow-md" />
              <About />
              <Contact />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/food-tracker" element={<FoodTracker />} />
        <Route path="/register" element={<Register />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </div>
  );
}

export default App;
