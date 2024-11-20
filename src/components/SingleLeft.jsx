import { useNavigate } from "react-router-dom";
import { FivePicture } from "./FivePicture";
import { MiniListingForm } from "./MiniListingForm";
import { Calendar } from "./Calendar";

export const SingleLeft = ({listingId}) => {
  // Need to check if we have user
  const user = true
  const navigate = useNavigate()

  return (
    <div className="flex flex-col p-6 space-y-3 w-full bg-whiteColor p-6 rounded-lg">
      
      <FivePicture />

      <div className="w-full flex flex-col sm:flex-row justify-between mb-6">
        <p>Hosted by</p>
        <p>$185 per night</p>
      </div>

      {/* This shows the calendar and listing form side by side */}
      <div className="flex flex-row rounded-lg mt-0">
        <Calendar />
        {user ? (
          <div className="flex justify-self-end border rounded-lg p-4 bg-white w-48 text-center min-h-[400px]">                
            <button
            type="button"
            onClick={() => { navigate(`/listing-form/${listingId}/edit/`) }}
            className="h-20 bg-logoColor text-white font-medium rounded-full py-2 px-6 mt-2 w-full transition-transform transform active:scale-95 hover:bg-backgroundColor"
          >
            Edit Listing
          </button>
          </div>
        ): <MiniListingForm />}
      </div>

    </div>
  );

};
