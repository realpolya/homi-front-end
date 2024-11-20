import { useState, useEffect } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "./App.css";
import "./index.css";
import { AppRoutes } from "./Routes";
import { SignUp } from "./app/SignUp";
import { SignIn } from "./app/Signin";
import { Navbar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { verifyToken } from "./services/sub_services/userServices.js";
import { signOut } from "./services/index.js";
import { getProperties, getBookings, getAmenities } from "./services/index.js";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [user, setUser] = useState(null);
  const [getProperties, setGetProperties] = useState([]);
  const [getBookings, setGetBookings] = useState([]);
  const [getAmenities, setGetAmenities] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyToken();
      user ? setUser(user) : setUser(null);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      const listingsData = await getProperties();
      setGetProperties(listingsData);
    };
    fetchListings();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsData = await getBookings();
      setGetBookings(bookingsData);
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchAmenities = async () => {
      const amenitiesData = await getAmenities();
      setGetAmenities(amenitiesData);
    };
    fetchAmenities();
  }, []);

  const handleSignOut = () => {
    setUser(null);
  };

  const handleSignUp = (data) => {
    setUser(data);
    setActiveModal(null);
  };

  const handleSignIn = (data) => {
    setUser(data);
    setActiveModal(null);
  };

  return (
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
        <SignIn onSubmit={handleSignIn} />
      </Rodal>
      <Rodal
        visible={activeModal === "logout"}
        onClose={() => setActiveModal(null)}
        customStyles={{ width: "400px", height: "350px", borderRadius: "10px" }}
      >
        <button onClick={signOut}>Sign Out</button>
      </Rodal>
      <Footer />
    </>
  );
}

export default App;

