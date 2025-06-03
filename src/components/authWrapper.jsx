"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import Sidebar from "./sidebar";

export default function AuthWrapper({ children, units }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, loading, error } = useFetchCurrentUser();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated || loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!user) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="flex h-full gap-4">
      <Sidebar units={units} />
      <main className="flex-1 mt-3 min-h-screen">{children}</main>
    </div>
  );
}
