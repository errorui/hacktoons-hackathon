import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white shadow-md p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-2xl font-bold text-blue-600'>EcoMitra</div>
        <button className='md:hidden text-2xl' onClick={() => setIsOpen(!isOpen)}>☰</button>
        <ul className={`md:flex space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <li className='hover:text-blue-500 cursor-pointer'>Home</li>
          <li className='hover:text-blue-500 cursor-pointer'>Explore</li>
          <li className='hover:text-blue-500 cursor-pointer'>About</li>
          <li className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer'>Contact</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;