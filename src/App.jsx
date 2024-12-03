/* --------------------------------Imports--------------------------------*/

import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "./App.css";
import "./index.css";
import { AppRoutes } from "./Routes";
import { SignUp } from "./app/SignUp";
import { SignIn } from "./app/Signin";
import { Navbar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import services from "./services/index.js";

/* --------------------------------Context--------------------------------*/

const AppContext = createContext(null);

/* --------------------------------Component--------------------------------*/

function App() {

  let location = useLocation();

  const [activeModal, setActiveModal] = useState(null);
  const [user, setUser] = useState(services.getUser()); // FIXME: double check
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [amenities, setAmenities] = useState([]);


  const fetchData = async () => {

    const user = await services.verifyToken();
    setUser(user || null);

    const propertiesData = await services.getProperties();
    setProperties(propertiesData);

    if (user) {
      
      const bookingsData = await services.getBookings();
      setBookings(bookingsData);

    }

    const amenitiesData = await services.getAmenities();
    setAmenities(amenitiesData);

  };


  useEffect(() => {

      fetchData();

  }, [location.pathname]);

 

  const handleSignUp = (data) => {
    setUser(data);
    setActiveModal(null);
  };
  
  const handleSignIn = (data) => {
    setUser(data);
    setActiveModal(null);
  };

  const appObject = { properties, amenities, bookings, setProperties, setBookings, setAmenities, user, setUser}
  
  return (

    <AppContext.Provider value={appObject}>
      <>
        <Navbar
          setShowRegister={() => setActiveModal("register")}
          setShowLogin={() => setActiveModal("login")}
          user={user}
          />
        <AppRoutes />
        {/* Modals allow the user interaction between sign up and log in */}
        <Rodal
          visible={activeModal === "register"}
          onClose={() => setActiveModal(null)}
          customStyles={{ width: "400px", height: "400px", borderRadius: "10px" }}
          >
          <SignUp onSubmit={handleSignUp} />
        </Rodal>
        <Rodal
          visible={activeModal === "login"}
          onClose={() => setActiveModal(null)}
          customStyles={{ width: "400px", height: "350px", borderRadius: "10px" }}
          >
          <SignIn onSubmit={handleSignIn} setActiveModal={setActiveModal} />
        </Rodal>
        <Footer />
      </>
    </AppContext.Provider>
  );
}

export default App;
export { AppContext }




