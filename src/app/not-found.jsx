"use client";

import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
      <FiAlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Sidan kunde inte hittas</h1>
      <p className="text-gray-600 mb-6">
        Vi hittade ingen sida på den här adressen.
      </p>
      <Link
        href="/dashboard"
        className="px-4 py-2 bg-green-300 text-black rounded hover:bg-green-400 transition">
        Till startsidan
      </Link>
    </div>
  );
}
