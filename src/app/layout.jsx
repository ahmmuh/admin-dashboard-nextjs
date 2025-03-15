import React from "react";
import { getUnits } from "@/backend/api";
import "./globals.css";

import Sidebar from "@/components/sidebar";

export default async function RootLayout({ children }) {
  const units = await getUnits();

  return (
    <html lang="sv">
      <body>
        <div className="flex h-full gap-4">
          <Sidebar units={units} />

          <main className="flex-1 mt-3 min-h-screen">
            {React.cloneElement(children, { units })}
          </main>
        </div>
      </body>
    </html>
  );
}
