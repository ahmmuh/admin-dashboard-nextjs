import { getUnitByID, getUnitTasks } from "@/backend/api";
import Card from "@/components/card";
import LinkPage from "@/components/link";
import MainCard from "@/components/maincard";
import Link from "next/link";
import React from "react";

export default async function UnitDetailPage({ params }) {
  const unit = await getUnitByID(params.unitId);
  console.log("unit hämtade", unit);
  return (
    <div className="flex flex-wrap justify-between ">
      <MainCard title={unit.name}>
        <>
          <div className="flex flex-col col mb-3">
            <LinkPage
              url={`/units/${unit._id}/chefer`}
              title={`Chef ${unit.chef?.name}`}
            />
            <LinkPage
              url={`/units/${unit._id}/specialister`}
              title={`Specialister ${unit.specialister.length}`}
            />
            <LinkPage
              url={`/units/${unit._id}/tasks`}
              title={`Att göra ${unit.tasks.length}`}
            />
            <LinkPage
              url={`/units/${unit._id}/workplaces`}
              title={`Objekt ${unit.workPlaces.length}`}
            />
          </div>
        </>
      </MainCard>
    </div>
  );
}
