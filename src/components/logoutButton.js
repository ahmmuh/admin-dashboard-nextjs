"use client";
import { logout } from "@/backend/authAPI";
import { useRouter } from "next/navigation";
import React from "react";

function LogoutButton() {
  const router = useRouter();

  const logoutHandler = async () => {
    await logout();
    router.push("/auth/login");
  };
  return (
    <div className="">
      <button
        className="text-gray-800  hover:underline "
        onClick={logoutHandler}>
        Logga ut
      </button>
    </div>
  );
}

export default LogoutButton;
