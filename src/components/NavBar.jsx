import React from 'react';
import { FaSearch } from 'react-icons/fa';

export const Navbar = () => {
  return (
     <nav className="px-4 py-3 flex justify-evenly ml-64">
      <h1 className="place-items-start">homi</h1>
      <div className="flex items-center text-xl">
        <h1 className="text-textColor space-x-5">Where:</h1>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="relative md:w-65">
          <button className="p-1 focus:outline-none text-textColor md:text-black">
            <FaSearch />
          </button>
          <input
            type="text"
            className=" w-full px-4 py-1 pl-12 rounded shadow outline-none"
          />
        </div>
      </div>
    </nav> 
  );
};






