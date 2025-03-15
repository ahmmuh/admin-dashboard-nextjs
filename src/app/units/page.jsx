import MainCard from "@/components/maincard";
import Link from "next/link";
import UnitDetailPage from "./[unitId]/page";

function Dashboard({ units = [] }) {
  // if (!units.length) return <div>Laddar enheter</div>;
  return (
    <>
      <h1 className="text-2xl font-bold my-3 text-purple-500 italic">Välkommen till Dashboard 😊</h1>
      {/* <UnitDetailPage /> */}
    </>
  );
}

export default Dashboard;
