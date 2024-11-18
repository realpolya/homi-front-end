import React from 'react'
import {FaBars, FaSearch } from "react-icons/fa"
import { FaMapMarkerAlt } from "react-icons/fa";
export const NavBar = () => {
  return (
    <nav className="px-4 py-3 flex justify-between">
    <div className="flex items-center text-xl">
        <FaBars className="text-textColor me-4 cursor-pointer"/></div>
    {/* span allows you to add any changes to a specific part without breaking code anywhere else around it. Like a container */}
    <span className="text-textColor">Where:</span>
    <div className="felx items-center gap-x-5">
    <span><button><FaSearch /></button></span>
    </div>
    </nav>
  )
}
