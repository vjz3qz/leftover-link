import React from "react";
import Map from "../components/Map";

function Mission() {
  return (
    <section 
      id="mission" 
      className="p-4 lg:p-8 dark:bg-gray-800 flex items-center justify-center min-h-screen"
    >
      <div className="max-w-3xl mx-auto">
        <h1 
          className="text-3xl lg:text-4xl font-bold mb-4 text-center dark:text-white"
        >
          We noticed a problem.
        </h1>

        <div className="flex flex-col justify-center items-center space-y-4">
          
          {/* Text Section */}
          <p 
            className="text-md lg:text-lg w-5/6 lg:w-full leading-relaxed text-center dark:text-gray-300"
          >
            Many restaurants and dining halls have copious amounts of food waste and we wanted to address this.
            Our main goal is to make a difference in the sustainability climate and find a way to connect these leftover vendors with homeless shelters. View our partners below!
          </p>
          
          {/* Map Section */}
          <div className="w-5/6 lg:w-full h-96">
            <Map />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Mission;
