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
    <button
      className="text-gray-800  hover:underline pr-3 pt-5"
      onClick={logoutHandler}>
      Logga ut
    </button>
  );
}

export default LogoutButton;
