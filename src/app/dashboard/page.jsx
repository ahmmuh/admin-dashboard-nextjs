"use client";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import LoadingPage from "../loading";

function Dashboard() {
  const { user, loading, error } = useFetchCurrentUser();
  console.log("Loggad user", user);

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

  if (!user || Object.keys(user).length === 0) {
    return (
      <div className="p-4 text-gray-500">
        Ingen användare hittades. Är du inloggad?
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl px-10 italic ">Välkommen {user.name}</h2>
    </>
  );
}

export default Dashboard;
