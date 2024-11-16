import { useState } from "react";

// Question: will handle change functions change to python or is python on back-end irrelevant from front-end javaScript

const MiniListingForm = () => {
  // This allows input and update for check in dates for reservation
  const [checkInDate, setCheckInDate] = useState("");
  // This allows input and update for checkout date for reservation
  const [checkOutDate, setCheckOutDate] = useState("");
  // This allows default to set for zero for pricing after pricing is inputed then 0 will update to the pricing of the reservation
  const [total, setTotal] = useState(0);

  const handleCheckInChange = (e) => {
    setCheckInDate(e.target.value);
  };
  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };
  // Using javaScript, this will allow us create a price total per night for reservations on the form (however, will use python back-end for this data)
  // const calculatorTotal = () => {
  // const pricePerNight = 0 //set to 0 for now
  // const checkIn = ""
  // const checkOut = ""
  // const oneDay = 3456
  // const nightsTotal = Math.round(Math.abs((checkIn - checkOut) / pricePerNight))
  // }

  return (
    <div>
      <form></form>
    </div>
  );
};

export default MiniListingForm;
