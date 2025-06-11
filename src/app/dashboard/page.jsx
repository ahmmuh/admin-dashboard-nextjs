"use client";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import Loading from "../loading";

function Dashboard() {
  const { user, loading, error } = useFetchCurrentUser();
  console.log("Loggad user", user);

  if (loading) {
    return <Loading />;
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
      <h2 className="text-2xl my-3 text-purple-500 italic ">
        Hej och välkommen {user.name}
      </h2>
    </>
  );
}

export default Dashboard;
