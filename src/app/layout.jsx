import React from "react";

import { getUnits } from "@/backend/api";
import "./globals.css";

import Sidebar from "@/components/sidebar";

export default async function RootLayout({ children }) {
  const units = await getUnits();

  return (
    <html lang="sv">
      <body>
        <div className="flex  h-screen gap-4">
          <Sidebar units={units} />
          <main className="w-2/3 h-auto mt-3">
            {React.cloneElement(children, { units })}
          </main>
        </div>
      </body>
    </html>
  );
}
