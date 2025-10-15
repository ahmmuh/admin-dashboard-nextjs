"use client";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import LoadingPage from "../loading";
import { getWeekNumber } from "@/helper/weekNumber";
import { useState } from "react";

function Dashboard() {
  const { currentUser, loading, error } = useFetchCurrentUser();
  // console.log("Loggad user", currentUser);

  const [isProfile, setIsProfile] = useState(false);

  if (loading) {
    return <LoadingPage message="Vi hämtar allt åt dig" />;
  }

  if (error) {
    return (
      <div className="bg-red-200 text-red-800 p-4 rounded mt-6">
        Fel vid inloggning: {error.message || "Okänt fel"}
      </div>
    );
  }

  if (!currentUser || Object.keys(currentUser).length === 0) {
    return (
      <div className="p-4 text-gray-500">
        Ingen användare hittades. Är du inloggad?
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl px-10 italic">
        <p>Vecka {getWeekNumber()}</p>
        Välkommen {currentUser.name}{" "}
        <span className="text-sm block">({currentUser.role.join(" & ")})</span>
      </h2>
    </>
  );
}

export default Dashboard;
