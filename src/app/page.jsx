"use client";
import LoginPage from "./auth/login/page";
import Dashboard from "./dashboard/page";

export default function Home() {
  const token = localStorage.getItem("userToken");
  return <div>{token ? <Dashboard /> : <LoginPage />}</div>;
}
