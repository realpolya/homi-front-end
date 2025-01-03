/* --------------------------------Imports--------------------------------*/

import { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from "react-router-dom"

import { AppContext } from "../App.jsx"

import services from '../services/index.js'

/* --------------------------------Component--------------------------------*/

const Sidebar = ({ setShowRegister, setShowLogin, setOpen }) => {

    const { user } = useContext(AppContext)
    const location = useLocation()
    const [isHost, setIsHost] = useState(false)

  
    const navigate = useNavigate()

    const handleLogout = () => {

        services.signOut()
        setOpen(false)
        navigate('/')
        window.location.reload();

    }


    useEffect(() => {

        if (location.pathname.includes("host")) setIsHost(true)

    }, [location.pathname])


    const authenticatedOptions = (
        <>
            <ul className="sidebar-options-ul">
                <NavLink className="nav-link" to="/dashboard/guest" onClick={() => setOpen(false)}>
                    Home
                </NavLink>
                <NavLink className="nav-link" to="/bookings" onClick={() => setOpen(false)}>
                    My Bookings
                </NavLink>
                <NavLink className="nav-link" to="listings" onClick={() => setOpen(false)}>
                    <span className="text-logoColor font-semibold">
                        Book My Next Stay!
                    </span>
                </NavLink>
                <NavLink className="nav-link" to="/" onClick={handleLogout}>
                    Log Out
                </NavLink>    
            </ul>
        </>
    )


    const hostOptions = (
        <>
            <ul className="sidebar-options-ul">
                <NavLink className="nav-link" to="/dashboard/guest" onClick={() => setOpen(false)}>
                    Home
                </NavLink>
                <NavLink className="nav-link" to="/bookings" onClick={() => setOpen(false)}>
                    My Listings
                </NavLink>
                <NavLink className="nav-link" to="/listing-form" onClick={() => setOpen(false)}>
                    New Listing
                </NavLink>
                <NavLink className="nav-link" to="listings" onClick={() => setOpen(false)}>
                    Bookings of my listings
                </NavLink>
                <NavLink className="nav-link" to="/" onClick={handleLogout}>
                    Log Out
                </NavLink>
            </ul>
        </>
    )


    const unauthenticatedOptions = (
        <>
            <ul className="sidebar-options-ul">
                <NavLink className="nav-link" to="/" onClick={() => setOpen(false)}>
                    Home
                </NavLink>
                <NavLink className="nav-link" to="/listings" onClick={() => setOpen(false)}>
                    Listings
                </NavLink>
                <NavLink className="nav-link" to="/about" onClick={() => setOpen(false)}>
                    About Homi
                </NavLink>
                <button className="nav-link" onClick={() => {
                    setShowRegister(true)
                    setOpen(false)
                }}>
                    Register
                </button>
                <button className="nav-link" onClick={() => {
                    setShowLogin(true)
                    setOpen(false)
                }}>
                    Log In
                </button>
            </ul>
        </>
    )


    return (
        <nav className={`absolute top-20 md:right-20 right-10 h-full md:w-1/4 w-3/4 max-w-sm 
            text-2xl md:text-xl text-whiteColor shadow-md transform transition-transform 
            duration-300 ease-in-out  ${
            setOpen ? "translate-y-0" : "translate-x-full"
        }`}>

            <div className="bg-darkColor rounded-2xl p-6">
                {user && <p className="link welcome">Welcome, <span className="text-logoColor font-semibold">{user.username}</span></p>}
                {user ? ( isHost ? hostOptions : authenticatedOptions) : (unauthenticatedOptions)}
            </div>

        </nav>
    );
};

/* --------------------------------Exports--------------------------------*/

export default Sidebar