"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import Sidebar from "./sidebar";

export default function AuthWrapper({ children, units }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, loading, error } = useFetchCurrentUser();
  const router = useRouter();

  return (
    <div className="flex h-full gap-4">
      <Sidebar units={units} />
      <main className="flex-1 mt-3 min-h-screen">{children}</main>
    </div>
  );
}
