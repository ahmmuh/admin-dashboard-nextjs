"use client";
import { logout } from "@/backend/authAPI";
import { getWeekNumber } from "@/helper/weekNumber";
import { useRouter } from "next/navigation";
import React from "react";

function LogoutButton() {
  const router = useRouter();

  const logoutHandler = async () => {
    await logout();
    router.push("/auth/login");
  };
  return (
    <div className="flex items-center gap-3 pt-5">
      <p>Vecka {getWeekNumber()}</p> |  
      <button
        className="text-gray-800  hover:underline pr-3"
        onClick={logoutHandler}>
        Logga ut
      </button>
    </div>
  );
}

export default LogoutButton;
