"use client";

import LoadingPage from "@/app/loading";
import { getUnits } from "@/backend/api";
import MainCard from "@/components/maincard";
import SearchInput from "@/components/searhInput";
import SearchUnit from "@/components/units/searchUnit";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HiOutlineKey,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";

function UnitPage({ params }) {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useFetchCurrentUser();

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const unitList = await getUnits();

        setUnits(unitList || []);
        setLoading(false);
      } catch (error) {
        console.log("Error", error.message);
        setLoading(false);
        setError(error);
      }
    };

    fetchUnits();
  }, []);
  // const apartments = await getApartments();
  // console.log("units i unitPage", units);

  //Loading

  if (loading) {
    return <LoadingPage message="Laddar enheter..." />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-2xl font-bold">{error.message}</p>
      </div>
    );
  }

  if (units.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p>Det finns inga ENHETER att visa just nu.</p>
      </div>
    );
  }

  return (
    <div className=" max-w-6xl mx-auto">
      <h1 className="text-2xl font-extrabold text-purple-700 mb-10 border-b-4 border-purple-200 pb-3">
        Alla enheter
      </h1>
      {!currentUser?.role?.includes("Enhetschef") && (
        <div className="my-6">
          <Link
            className="text-green-800 font-bold"
            href={"/dashboard/units/create"}>
            Skapa enhet
          </Link>
        </div>
      )}

      <div className="hidden md:block">
        <SearchUnit />
      </div>

      <div className="flex flex-col gap-8">
        {units &&
          units.map((unit) => {
            console.log("Unit med keys", unit?.keys);
            console.log("Unit med users", unit?.users);

            const chefer = unit.users?.filter((user) =>
              user?.role?.includes("Enhetschef")
            );
            const specialister = unit.users?.filter((user) =>
              user?.role?.includes("Specialare")
            );

            // const checkedOutKeysCount =
            //   unit.users
            //     ?.flatMap((user) => user.keys || []) // plattar ut alla keys från alla users
            //     .filter((key) => key.status === "checked-out").length || 0; // filtrerar bara utlånade

            // console.log("checkedOutKeysCount", checkedOutKeysCount);

            return (
              <MainCard key={unit._id} title={unit.name}>
                <div className="flex flex-col divide-y divide-gray-300">
                  {chefer.length > 0 && (
                    <CardRow
                      icon={
                        <HiOutlineUser className="text-purple-500 w-5 h-5" />
                      }
                      href={`/dashboard/units/${unit._id}/chefer`}
                      text={chefer.map((c) => c.name).join(", ")}
                    />
                  )}

                  <CardRow
                    icon={
                      <HiOutlineUserGroup className="text-purple-500 w-5 h-5" />
                    }
                    href={`/dashboard/units/${unit._id}/specialister`}
                    text={`Specialare (${specialister?.length})`}
                  />

                  <CardRow
                    icon={
                      <HiOutlineClipboardList className="text-purple-500 w-5 h-5" />
                    }
                    href={`/dashboard/units/${unit._id}/unitTasks`}
                    text={`Att göra (${unit?.tasks?.length})`}
                  />

                  <CardRow
                    icon={<HiOutlineKey className="text-purple-500 w-5 h-5" />}
                    href={`/dashboard/units/${unit._id}/unitKeys`}
                    text={`Nycklar (${unit?.keys?.length})`}
                  />
                </div>
              </MainCard>
            );
          })}
      </div>
    </div>
  );
}

export function CardRow({ label, icon, href, text }) {
  return (
    <div className="py-4 flex items-center gap-3 group">
      {icon}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          {label}
        </span>
        <Link href={href}>
          <span className="text-md font-semibold text-gray-900 group-hover:text-purple-600 transition">
            {text}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default UnitPage;
