import React from "react";
import { SingleLeft } from "../components/SingleLeft";
import { SingleRight } from "../components/SingleRight";
import {Navbar} from "../components/NavBar";


export const SingleListingBooking = () => {
  return (
    <>
      
      <Navbar />
      {/* Left Section */}
      <div className="flex-col md:flex-row">
        <div className="flex-1 bg-white rounded-lg  p-6">
          <SingleLeft />
        </div>

        {/* Right Section */}
        <div className="flex-1 h-lvh bg-white rounded-lg  p-6">
          <SingleRight />
        </div>
      </div>
    </>
  );
};
