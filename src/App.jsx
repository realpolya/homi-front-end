//import { useState } from 'react'
import "./App.css";
import "./index.css";
import { AppRoutes } from "./Routes";
import { SingleListingBooking } from "./app/SingleListingBooking";


function App() {
  return (
    <>

      <h1 className='font-sans text-7xl'>Homi</h1>
      <AppRoutes />
   <SingleListingBooking />
    </>
  );
}

export default App;
