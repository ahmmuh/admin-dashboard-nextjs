import { getUnits } from "@/backend/api";
import MainCard from "@/components/maincard";
import Link from "next/link";

async function UnitPage({ params }) {
  const units = await getUnits();

  console.log("UNITS I unit PAGE", units);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-600 italic mb-8">
        Alla enheter
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units &&
          units?.map((unit) => (
            <div key={unit._id}>
              <MainCard title={unit.name}>
                <div className="flex flex-col gap-3 mt-4">
                  <Link href={`/dashboard/units/${unit._id}/chefer`}>
                    <span className="block text-md font-semibold text-gray-800 hover:text-purple-600 transition-colors border-b pb-2">
                      👤 Chef:
                    </span>
                  </Link>

                  <Link href={`/dashboard/units/${unit._id}/specialister`}>
                    <span className="block text-md font-semibold text-gray-800 hover:text-purple-600 transition-colors border-b pb-2">
                      {/* 👥 {unit.specialister.length} Specialister */}
                      specialister
                    </span>
                  </Link>

                  <Link href={`/dashboard/tasks`}>
                    <span className="block text-md font-semibold text-gray-800 hover:text-purple-600 transition-colors border-b pb-2">
                      {/* 📝 {unit.tasks.length} */}
                      Todos
                    </span>
                  </Link>

                  <Link href={`/dashboard/units/${unit._id}/workplaces`}>
                    <span className="block text-md font-semibold text-gray-800 hover:text-purple-600 transition-colors pb-2">
                      {/* 🏢 {unit.workPlaces.length} */}
                      Mina objekt
                    </span>
                  </Link>
                </div>
              </MainCard>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UnitPage;
