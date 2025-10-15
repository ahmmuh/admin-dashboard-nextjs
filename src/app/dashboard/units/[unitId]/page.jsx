import { getUnitByID, getUnitTasks } from "@/backend/api";
import Card from "@/components/card";
import LinkPage from "@/components/link";
import MainCard from "@/components/maincard";
import React from "react";

export default async function UnitDetailPage({ params }) {
  const unit = await getUnitByID(params.unitId);
  // console.log("unit hämtade", unit);
  return (
    <div className="flex flex-wrap justify-between ">
      <MainCard title={unit?.name}>
        <>
          <div className="flex flex-col col mb-3">
            <LinkPage
              url={`/dashboard/units/${unit._id}/chefer`}
              title={"Chef name"}
            />
            <LinkPage
              url={`/dashboard/units/${unit._id}/specialister`}
              title={`Specialister ${unit.specialister.length}`}
            />

            <LinkPage
              url={`/dashboard/units/${unit._id}/unitKeys`}
              title={`Nycklar ${unit.keys.length}`}
            />
            <LinkPage
              url={`/dashboard/units/${unit._id}/unitTasks`}
              title={`Att göra ${unit?.tasks?.length}`}
            />
            <LinkPage
              url={`/dashboard/units/${unit._id}/workplaces`}
              title={`Objekt ${unit.workPlaces.length}`}
            />
          </div>
        </>
      </MainCard>
    </div>
  );
}
