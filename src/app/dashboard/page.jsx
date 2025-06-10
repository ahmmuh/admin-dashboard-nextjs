"use client";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";

function Dashboard() {
  const { user, loading, error } = useFetchCurrentUser();
  console.log("Loggad user", user);
  return (
    <>
      <h1 className="text-2xl font-bold my-3 text-purple-500 italic">
        Välkommen till Dashboard 😊
      </h1>
    </>
  );
}

export default Dashboard;
