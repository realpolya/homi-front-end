//import { useState } from 'react'
import "./App.css";
import "./index.css";
import { AppRoutes } from "./Routes";
import { Navbar } from "./components/NavBar";
function App() {
  return (
    <>
    <Navbar />
      <AppRoutes />
      </>
  );
}

export default App;
