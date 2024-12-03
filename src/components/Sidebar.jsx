/* --------------------------------Imports--------------------------------*/

import { useContext } from 'react'
import { NavLink, useNavigate} from "react-router-dom"
import { AppContext } from "../App.jsx"
import services from '../services/index.js'

/* --------------------------------Component--------------------------------*/

const Sidebar = ({ setShowRegister, setShowLogin, setOpen }) => {

    const { user } = useContext(AppContext)
  
    const navigate = useNavigate()
    const handleLogout = () => {

        services.signOut()
        setOpen(false)
        navigate('/')

    }

    const authenticatedOptions = (
        <>
            <ul className="flex-col w-rounded-lg  p-4">
                <li>
                    <NavLink className="nav-link" to="/dashboard/guest" onClick={() => setOpen(false)}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/bookings" onClick={() => setOpen(false)}>
                        My Bookings
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/listing-form" onClick={() => setOpen(false)}>
                        Listing Form
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="listings" onClick={() => setOpen(false)}>
                        Book a Listing
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/" onClick={handleLogout}>
                        Log Out
                    </NavLink>
                </li>
            </ul>
        </>
    )

    const unauthenticatedOptions = (
        <>
            <ul>
                <li>
                    <NavLink className="nav-link" to="/" onClick={() => setOpen(false)}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="listings">
                        Listings
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/about" onClick={() => setOpen(false)}>
                        About Homi
                    </NavLink>
                </li>
                <li>
                    <button onClick={() => {
                        setShowRegister(true)
                        setOpen(false)
                    }}>
                        Register
                    </button>
                </li>
                <li>
                    <button onClick={() => {
                        setShowLogin(true)
                        setOpen(false)
                    }}>
                        Log In
                    </button>
                </li>
            </ul>
        </>
    )

    return (
        <nav className={`absolute top-20 right-20 h-full w-1/4 max-w-sm font-serif text-whiteColor shadow-md transform transition-transform duration-300 ease-in-out  ${
            setOpen ? "translate-y-0" : "translate-x-full"
        }`}>

            <div className="bg-darkColor rounded-2xl p-6">
                {user && <p className="link welcome">Welcome, {user.username}</p>}
                {user ? authenticatedOptions : unauthenticatedOptions}
            </div>

        </nav>
    );
};

/* --------------------------------Exports--------------------------------*/

export default Sidebar
