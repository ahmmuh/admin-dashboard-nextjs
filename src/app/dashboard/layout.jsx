import { logout } from "@/backend/authAPI";
import LogoutButton from "@/components/logoutButton";
import Sidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ProfileModal from "./profileWrapper/page";
import SystemGuideWrapper from "@/components/guides/SystemGuideWrapper";

function DashboardLayout({ children }) {
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-full gap-4">
      <Sidebar />
      <main className="ml-80 flex-1 min-h-screen bg-gray-100 px-10">
        <div className="mt-5"></div>

        <div className=" flex justify-end pr-4">
          <ProfileModal />
        </div>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
