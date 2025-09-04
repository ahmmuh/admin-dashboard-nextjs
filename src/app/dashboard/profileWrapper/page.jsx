"use client";

import LogoutButton from "@/components/logoutButton";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import React, { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";

function ProfileModal() {
  const [isProfile, setIsProfile] = useState(false);
  const { currentUser } = useFetchCurrentUser();

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsProfile(!isProfile)}
        className="p-2 rounded-full hover:bg-gray-100 transition">
        <HiOutlineMenu size={32} />
      </button>

      {isProfile && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 z-50">
          <span className="font-semibold text-gray-800">
            Inloggad som {currentUser?.name || "Inloggad användare"}
          </span>
          <LogoutButton className="w-full" />
        </div>
      )}
    </div>
  );
}

export default ProfileModal;
