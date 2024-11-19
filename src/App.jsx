import { useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import './App.css';
import './index.css';
import { AppRoutes } from './Routes';
import { SignUp } from './app/SignUp';
import { SignIn } from './app/Signin';
import { Navbar } from './components/NavBar';
import { Footer } from './components/Footer';

function App() {
  const [activeModal, setActiveModal] = useState(null);

  const handleSignUp = (data) => {
    console.log("Sign Up Data:", data);
    setActiveModal(null);
  };

  const handleSignIn = (data) => {
    console.log("Sign In Data:", data);
    setActiveModal(null);
  };

  return (
    <>
      <Navbar
        setShowRegister={() => setActiveModal("register")}
        setShowLogin={() => setActiveModal("login")}
      />
      <AppRoutes />

      {/* Register Modal */}
      <Rodal
        visible={activeModal === "register"}
        onClose={() => setActiveModal(null)}
        closeOnEsc={true}
        closeMaskOnClick={true}
        customStyles={{
          width: "400px",
          height: "400px",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <SignUp onSubmit={handleSignUp} />
      </Rodal>

      {/* Login Modal */}
      <Rodal
        visible={activeModal === "login"}
        onClose={() => setActiveModal(null)}
        closeOnEsc={true}
        closeMaskOnClick={true}
        customStyles={{
          width: "400px",
          height: "350px",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <SignIn onSubmit={handleSignIn} />
      </Rodal>

      <Footer />
    </>
  );
}

export default App;
