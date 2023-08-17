import React, { useEffect } from "react";
import SplitType from "split-type";
import gsap from "gsap";

const Home = () => {
  useEffect(() => {
    const text = new SplitType("#heading", "#text");
    const characters = document.querySelectorAll(".char");

    for (let i = 0; i < characters.length; i++) {
      characters[i].classList.add("translate-y-full");
    }

    gsap.to(".char, .text", {
      y: 0,
      stagger: 0.05,
      delay: 0.02,
      duration: 0.5,
    });
    document.querySelector("#text").classList.add("char");
  }, []);

  return (
    <section
      id="home"
      className="bg-yellow-300 bg-center bg-cover w-screen h-screen relative"
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1
          id="heading"
          className="text-3xl sm:4xl md:text-5xl lg:text-6xl font-bold clip-path[polygon(0 0, 100% 0, 100% 100%, 0% 100%)]"
          style={{
            WebkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", // For WebKit compatibility
          }}
        >
          Welcome to Leftover Link 🍣
        </h1>
        <p
          id="text"
          className="text-md sm:text-lg md:text-xl lg:text-2xl font-light ml-4 animate-fadeIn"
        >
          One meal at a time.
        </p>
      </div>
    </section>
  );
};

export default Home;
