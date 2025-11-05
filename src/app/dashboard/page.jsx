"use client";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import LoadingPage from "../loading";
import { getWeekNumber } from "@/helper/weekNumber";
import { useState } from "react";
import TaskChart from "@/charts/taskChart";
import ApartmentStatusChart from "@/charts/apartmentStatusChart";
import ApartmentPriorityChart from "@/charts/ApartmentPriorityChart";
import ClockChart from "@/charts/clockChart";
import KeyPieChart from "@/charts/keyChart";
import MachineChart from "@/charts/machineChart";

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
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* <h1 className="text-2xl font-bold mb-4">Dashboard</h1> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Kort 1 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <TaskChart />
        </div>

        {/* Kort 2 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ApartmentStatusChart />
        </div>

        {/* Kort 3 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ClockChart />
        </div>

        {/* kort 4 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <KeyPieChart />
        </div>

        {/* kort 5 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <MachineChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
