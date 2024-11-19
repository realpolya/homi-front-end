import React from "react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full flex flex-row justify-between  p-4 bg-[#0D2E26] text-whiteColor text-sm">
      <div>
        <p>homi © 2024 All rights reserved.</p>
      </div>
      <div className="flex space-x-6">
        <a href="/about" className="hover:underline">
          About
        </a>
        {/* Add more links here if needed */}
      </div>
    </footer>
  );
};
