import Sidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

function DashboardLayout({ children }) {
  // const cookieStore = cookies();

  // const token = cookieStore.get("token")?.value;

  // if (!token) {
  //   redirect("/login");
  // }

  return (
    <div className="flex h-full gap-4">
      <Sidebar />
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  );
}

export default DashboardLayout;
