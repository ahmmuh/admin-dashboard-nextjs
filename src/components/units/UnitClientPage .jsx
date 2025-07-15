"use client";

import MainCard from "@/components/maincard";
import SearchUnit from "@/components/units/searchUnit";
import Link from "next/link";
import {
  HiOutlineKey,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
} from "react-icons/hi";

export default function UnitClientPage({ units }) {
  if (!units || units.length === 0) {
    return (
      <div className="flex justify-center items-center p-5">
        <p>Det finns inga ENHETER att visa just nu.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-10 border-b-4 border-purple-200 pb-3">
        Alla enheter
      </h1>
      <SearchUnit />

      <div className="flex flex-col gap-8">
        {units.map((unit) => {
          const chefer = unit.users?.filter((user) => user.role === "Chef");
          const specialister = unit.users?.filter(
            (user) => user.role === "Specialist"
          );

          return (
            <MainCard key={unit._id} title={unit.name}>
              <div className="flex flex-col divide-y divide-gray-300">
                {chefer?.length > 0 && (
                  <CardRow
                    icon={<HiOutlineUser className="text-purple-500 w-5 h-5" />}
                    href={`/dashboard/units/${unit._id}/chefer`}
                    text={chefer.map((c) => c.name).join(", ")}
                  />
                )}

                <CardRow
                  icon={
                    <HiOutlineUserGroup className="text-purple-500 w-5 h-5" />
                  }
                  href={`/dashboard/units/${unit._id}/specialister`}
                  text={`Specialister (${specialister?.length || 0})`}
                />

                <CardRow
                  icon={
                    <HiOutlineClipboardList className="text-purple-500 w-5 h-5" />
                  }
                  href={`/dashboard/units/${unit._id}/unitTasks`}
                  text={`Att göra (${unit?.tasks?.length || 0})`}
                />

                <CardRow
                  icon={<HiOutlineKey className="text-purple-500 w-5 h-5" />}
                  href={`/dashboard/units/${unit._id}/unitKeys`}
                  text={`Nycklar (${unit?.keys?.length || 0})`}
                />
              </div>
            </MainCard>
          );
        })}
      </div>
    </div>
  );
}

function CardRow({ label, icon, href, text }) {
  return (
    <div className="py-4 flex items-center gap-3 group">
      {icon}
      <div className="flex flex-col">
        {label && (
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            {label}
          </span>
        )}
        <Link href={href}>
          <span className="text-md font-semibold text-gray-900 group-hover:text-purple-600 transition">
            {text}
          </span>
        </Link>
      </div>
    </div>
  );
}
