import { useState } from "react";

export const MiniListingForm = ({ required }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [total, setTotal] = useState(0);

  const pricePerNight = 100; // Set a fixed price per night

  const handleCheckInChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate) {
      alert("You must select both check-in and check-out dates.");
      return;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    const differenceInTime = checkOut - checkIn;
    const numberOfNights = differenceInTime / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    const calculatedTotal = numberOfNights * pricePerNight;

    setTotal(calculatedTotal); // Update the total cost dynamically
    alert(`You booked ${numberOfNights} night(s) for a total of $${calculatedTotal}.`);
  };

  return (
    <div className="flex justify-self-end border rounded-lg p-4 bg-white w-48 text-center min-h-[400px]">
      <form>
        <label htmlFor="checkInDate" className="block text-sm font-medium mb-1">
          Check-in Date:
        </label>
        <input
          type="date"
          id="checkInDate"
          value={checkInDate}
          onChange={handleCheckInChange}
          required={required}
          className="border rounded-lg p-2 mb-4 text-center"
        />

        <label htmlFor="checkOutDate" className="block text-sm font-medium mb-1">
          Check-out Date:
        </label>
        <input
          type="date"
          id="checkOutDate"
          value={checkOutDate}
          onChange={handleCheckOutChange}
          required={required}
          className="border rounded-lg p-2 mb-4 text-center"
        />

        <label htmlFor="total" className="block text-sm font-medium mb-1">
          Total:
        </label>
        <input
          type="number"
          id="total"
          value={total} // Display the calculated total
          readOnly
          required={required}
          className="border rounded-lg p-2 mb-4 w-full text-center bg-gray-100"
        />

        <button
          type="button"
          onClick={calculateTotal}
          className="bg-logoColor text-white font-medium rounded-full py-2 px-6 mt-2 w-full transition-transform transform active:scale-95 hover:bg-backgroundColor"
        >
          Reserve
        </button>
      </form>
    </div>
  );
};
