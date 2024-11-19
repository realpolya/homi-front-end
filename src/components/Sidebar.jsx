import React from 'react'

export const Sidebar = ({setShowRegister, setShowLogin}) => {
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-md transform transition-transform duration-300 ease-in-out">
      <div className="p-4">
        <ul className="space-y-4 text-lg font-semibold">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><button onClick={() => setShowRegister(true)}>Register</button></li>
          <li><button onClick={() => setShowLogin(true)}>Log In</button></li>
        </ul>
      </div>
    </div>
  );
}
