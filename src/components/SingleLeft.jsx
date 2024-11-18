import React from "react";
import {FivePicture} from "./FivePicture";
import { MiniListingForm } from "./MiniListingForm";
import { Calendar } from "./Calendar";


export const SingleLeft = () => {
  return (
    <>
      <div>
        {/* <h1>House.location</h1> */}
        <FivePicture />
        <div>
          {/* <h2>Hosted.username</h2> */}
          <Calendar />
          {/* pricing will be on the right of username */}
          <MiniListingForm />
        </div>
      </div>
    </>
  );
};


