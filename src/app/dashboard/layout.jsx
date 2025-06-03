import { getUnits } from "@/backend/api";
import Sidebar from "@/components/sidebar";
import React from "react";

async function DashboardLayout({ children }) {
  //   const units = await getUnits();

  return (
    <div className="flex h-full gap-4">
      <Sidebar />

      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  );
}

export default DashboardLayout;
