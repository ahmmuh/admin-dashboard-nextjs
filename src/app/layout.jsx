import React from "react";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { getApartments } from "@/backend/apartmentAPI";

export default async function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body>
        <Toaster />
        <div className="flex h-full gap-4">
          <main className="flex-1  min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
