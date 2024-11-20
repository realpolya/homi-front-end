import React, { useState, useEffect } from "react";
import { verifyToken } from "../services"; // Assuming this service provides the backend fetch functionality.

export const MyUserInfo = () => {
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await verifyToken(); // Fetch user data from backend
        setUser(userData); // Extract "user" object from the response
      } catch (err) {
        setError("Failed to load user information.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>{error}</p>; // Show error message
  if (!user) return <p>No user data available.</p>; // Handle missing user

  return (
    <div className="max-w-sm mx-auto p-6 bg-white flex flex-col items-center">
      <img
        src={user.profile?.profile_pic || "default-profile-pic-url.jpg"}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover mb-4"
      />

      <h2 className="text-2xl font-semibold mb-6 text-center text-textColor">
        Account Information
      </h2>

      <div className="text-left w-full">
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Email:</p>
          <p className="text-textColor">{user.email}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-500 text-sm">Username:</p>
          <p className="text-textColor">{user.username}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-500 text-sm">Name:</p>
          <p className="text-textColor">{`${user.first_name || ""} ${
            user.last_name || ""
          }`}</p>
        </div>

        {user.profile?.bio && (
          <div className="mb-4">
            <p className="text-gray-500 text-sm">Bio:</p>
            <p className="text-textColor">{user.profile.bio}</p>
          </div>
        )}

        <div className="mb-4">
          <p className="text-gray-500 text-sm">Host Status:</p>
          <p className="text-textColor">
            {user.profile?.is_host ? "Host" : "Not a Host"}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-500 text-sm">Profits:</p>
          <p className="text-textColor">${user.profile?.profits?.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
