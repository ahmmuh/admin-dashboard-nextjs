import { getUnits } from "@/backend/api";
import MainCard from "@/components/maincard";
import Link from "next/link";

async function UnitPage({ params }) {
  const units = await getUnits();
  return (
    <div className="">
      <h1 className="text-2xl font-bold  text-purple-500 italic mb-5 pl-6">
        Alla enheter
      </h1>

      <div className="flex flex-col  ">
        <div className="h-full">
          {units &&
            units.map((unit) => (
              <div className="mb-8">
                <MainCard title={unit.name}>
                  <Link href={`/units/${unit._id}/chefer`}>
                    <span className="block text-lg font-medium  border-b-2  text-gray-700 hover:text-pink-600 py-5">
                      Enhetschef: {unit.chef.name}
                    </span>
                  </Link>
                  <Link href={`/units/${unit._id}/specialister`}>
                    <span className="block text-lg font-medium  border-b-2  text-gray-700 hover:text-pink-600 py-5">
                      ({unit.specialister.length}) Specialister
                    </span>
                  </Link>
                  <Link href={`/units/${unit._id}/tasks`}>
                    <span className="block text-lg font-medium  border-b-2 text-gray-700 hover:text-pink-600  py-5">
                      ({unit.tasks.length}) Todos
                    </span>
                  </Link>

                  <Link href={`/units/${unit._id}/workplaces`}>
                    <span className="block text-lg font-medium  border-b-2 text-gray-700 hover:text-pink-600  py-5">
                      ({unit.workPlaces.length}) Mina objekt
                    </span>
                  </Link>
                </MainCard>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UnitPage;
