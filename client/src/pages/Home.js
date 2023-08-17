import React, {useEffect} from "react";
import SplitType from "split-type";
import gsap from "gsap";

const Home = () => {
  // useEffect(() => {
  //   const text = new SplitType('#heading', '#text');
  //   const characters = document.querySelectorAll('.char');
  
  //   for (let i = 0; i < characters.length; i++) {
  //     characters[i].classList.add('translate-y-full');
  //   }

  //   gsap.to('.char, .text', {
  //     y:0,
  //     stagger: 0.05, 
  //     delay: 0.02,
  //     duration: 0.5
  //   });
  //   document.querySelector('#text').classList.add('char');
  // }, []);

  return (<section id="home"
    style={{
      backgroundColor: '#fedeaf',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh',
      position: 'relative',
    }}>
  <div class="w-screen h-screen flex flex-col justify-center items-center animate-fadeIn">
    <h1
      id="heading"
      className="text-6xl font-bold"
      > 
        Welcome to Leftover Link 🍣
   </h1>
   <p 
    id="text"
    className = "text-2xl font-light ml-4"
    >
    One meal at a time.
  </p>
</div> 
  </section>
  );
};

export default Home;