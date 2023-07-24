import React from "react";
import Map from "../components/Map";


function Mission() {
  return (
    <section id="mission" className="p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center">We noticed a problem...</h1>
        <div className="flex flex-row space-x-4 h-96">
          <p className="text-lg leading-relaxed flex-1">
            Many restaurants and dining halls have copious amounts of food waste and we wanted to address this.
            Our main goal is to make a difference in the sustainability climate and find a way to connect these leftover vendors with homeless shelters.
          </p>
          <Map />
        </div>
      </div>
    </section>
  );
}
export default Mission;
