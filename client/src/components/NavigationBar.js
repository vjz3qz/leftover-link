import React from 'react';

import { Link } from 'react-scroll';
import logo from '../styles/HooHacksLogo2.png'; 

function NavigationBar() {
    return (
<div>
          <div>
            <Link to="home"
            smooth={true}
            duration={1000}>
                Leftover Link
                <img src={logo} alt="Logo" style={{ height:"90px",width: "90px", verticalAlign: "middle" }}/>
                
            </Link>
          </div>
          <div>
            <Link to="about"
            smooth={true}
            duration={1000}>About</Link>
            <Link to="contact"
            smooth={true}
            duration={1000}>Contact</Link>
            <Link to="addfood"
            smooth={true}
            duration={1000}>Add Food</Link>
          </div>
        </div>
      );
}

export default NavigationBar;





