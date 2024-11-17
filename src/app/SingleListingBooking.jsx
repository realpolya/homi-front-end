import React from "react";
import { SingleLeft } from "../components/SingleLeft";
import { SingleRight } from "../components/SingleRight";


export const SingleListingBooking = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-gray-100 p-8 rounded-lg space-x-8">
        <div className="flex-1">
          <SingleLeft />
        </div>

        <div className="flex-1">
          <SingleRight />
        </div>
      </div>
    </>
  );
};
