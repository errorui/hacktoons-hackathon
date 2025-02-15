import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <div className='nav'>
      <ul className="menu-1">
        <li className='nav-logo'>EcoMitra</li>
        <li>< button >Investments</button></li>
        <li><button >About Us </button></li>
      </ul>
      <ul className="nav-menu">
        <li><button className='nav-signup'>Log In</button></li>
        <li><button className='nav-login'>Sign Up</button></li>
        <li> <button className='nav-contact'>Contact Us</button></li>
      </ul>
    </div>
  );
}

export default Navbar;
