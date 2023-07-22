import React, {useEffect} from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { Link } from 'react-scroll';

const Home = () => {
  useEffect(() => {
    const text = new SplitType('#heading','#text');
    const characters = document.querySelectorAll('.char');
  
    for (let i = 0; i < characters.length; i++) {
      characters[i].classList.add('translate-y-full');
    }

    gsap.to('.char', {
      y:0,
      stagger: 0.05, 
      delay: 0.02,
      duration: 0.5
    });
  }, []);

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
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <h1
      id="heading"
      className="text-6xl font-bold"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        WebkitClipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', // For WebKit compatibility
      }}> 
        Welcome to Leftover Link {''}
        <Link to="about"
              smooth={true}
              duration={1000}><span className="text-2xl inline-block">🍣</span>
        </Link>
   </h1>
   <p 
    id="text"
    className = "text-2xl font-light ml-4"
    style={{
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      WebkitClipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', // For WebKit compatibility
  }}>
    Bridge the Gap, One Shelter to One Restaurant at a Time.
  </p>
</div> 
  </section>
  );
};

export default Home;

{/* 
            Leftover Link is an app that connects local restaurants with nearby homeless shelters to donate unused food before it expires. Our goal is to reduce food waste while helping those in need. Join us in making a difference today!
            Leftover Link's mission is to bridge the gap between local restaurants and homeless shelters, by providing a platform that facilitates the donation of unused food before it goes to waste. We believe that everyone deserves access to fresh and nutritious meals, and that we can reduce food waste while addressing hunger in our communities. Our app provides a simple and easy-to-use solution for restaurants and shelters to connect and make a positive impact on people's lives. Join us in our mission to make a difference today, one meal at a time.
*/}