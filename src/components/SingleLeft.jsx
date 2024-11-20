import { FivePicture } from "./FivePicture";
import { MiniListingForm } from "./MiniListingForm";
import { Calendar } from "./Calendar";

export const SingleLeft = () => {

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
        <MiniListingForm />
      </div>

    </div>
  );

};
