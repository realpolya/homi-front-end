import { FivePicture } from "./FivePicture";
import { MiniListingForm } from "./MiniListingForm";
import { Calendar } from "./Calendar";

export const SingleLeft = () => {

  return (
    <div className="flex flex-col p-6 space-y-8 w-full bg-whiteColor p-6 rounded-lg">
      
      <FivePicture />

      {/* This shows the calendar and listing form side by side */}
      <div className="flex flex-row rounded-lg mt-0">
        <Calendar />
        <MiniListingForm />
      </div>

    </div>
  );

};
