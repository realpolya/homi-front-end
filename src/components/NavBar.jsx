/* --------------------------------Imports--------------------------------*/

import { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { AppContext } from "../App.jsx";
import { Twirl as Hamburger } from "hamburger-react";
import { FaSearch } from "react-icons/fa";

import Sidebar from "./Sidebar.jsx";

/* --------------------------------Component--------------------------------*/

const Navbar = () => {

    const { setShowLogin, setShowRegister } = useContext(AppContext)

    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const [whereData, setWhereData] = useState('')
    const navbarRef = useRef(null);

    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);


    const handleWhereChange = (e) => setWhereData(e.target.value)
    const handleSubmit = (e) => {

        e.preventDefault();
        navigate("/listings", { state: { whereData } })
        setWhereData('')

    }

    return (
        <nav ref={navbarRef} className="flex justify-evenly items-center w-full fixed top-0 left-0 bg-backgroundColor  z-10 px-4 py-3">

            <NavLink to="/" className="sm:text-5xl text-logoColor flex flex-row">
                <img src="/logo.png" className="w-10 h-10 mr-2 mt-1"/>
                <p className="hidden sm:inline">homi</p>
            </NavLink>

            <form className="flex items-center gap-x-2" onSubmit={handleSubmit}>
                <label htmlFor="search-bar">Where: </label>
                <input
                    id="search-bar"
                    type="text"
                    value={whereData}
                    onChange={handleWhereChange}
                    className="w-full px-4 py-1 pl-2 rounded shadow outline-none"
                />
                <button className="p-1 focus:outline-none text-textColor md:text-black" 
                type="submit">
                    <FaSearch />
                </button>
            </form>

            <Hamburger toggled={isOpen} toggle={setOpen} />
            {isOpen && (
            <Sidebar
                setOpen={setOpen}
                setShowRegister={setShowRegister}
                setShowLogin={setShowLogin}
            />

            )}
        </nav>
    );
};

/* --------------------------------Exports--------------------------------*/

export default Navbar