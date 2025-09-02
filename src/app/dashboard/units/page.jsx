"use client";

import LoadingPage from "@/app/loading";
import { deleteUnitById, getUnits } from "@/backend/api";
import MainCard from "@/components/maincard";
import SearchUnit from "@/components/units/searchUnit";
import UnitActionModal from "@/components/units/unitActionModel";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import { useFetchUnits } from "@/customhook/useFetchUnits";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { faL } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiOutlineKey,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineOfficeBuilding,
  HiOutlinePencil,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineDocumentAdd,
  HiPlus,
} from "react-icons/hi";

function UnitPage({ params }) {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useFetchCurrentUser();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  const router = useRouter();

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

  //Open delete modal

  const openDeleteModal = (id) => {
    setSelectedUnitId(id);
    setDeleteModalOpen(true);
  };

  // delete unit
  const confirmUnitDelete = async () => {
    try {
      await deleteUnitById(selectedUnitId);
      setDeleteModalOpen(false);
      const updatedUnits = await getUnits();
      setUnits(updatedUnits);
      displaySuccessMessage(`Enhet med ID ${selectedUnitId} har raderats`);
    } catch (error) {
      displayErrorMessage("Det gick inte att radera denna enhet");
      setDeleteModalOpen(false);
    }
  };
  // Avbryt radering
  const cancelUnitDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  return (
    <div className=" max-w-6xl mx-auto">
      <h1 className="text-2xl font-extrabold text-blue-500 mb-10 border-b-4 border-purple-200 pb-3">
        Alla enheter
      </h1>
      {!currentUser?.role?.includes("Enhetschef") && (
        <div className="my-6">
          <Link
            className="text-green-800  flex items-center gap-3"
            href={"/dashboard/units/create"}>
            <HiPlus />
            <span>Skapa enhet</span>
          </Link>
        </div>
      )}

      <div className="hidden md:block">
        <SearchUnit />
      </div>

      <div className="flex flex-col gap-8">
        {deleteModalOpen && (
          <UnitActionModal
            cancelUnitDeleteModal={cancelUnitDeleteModal}
            confirmUnitDelete={confirmUnitDelete}
            message={
              "Är du säker på att du vill ta bort denna enhet? Morgonjobb, nycklar och flyttstäd tas bort. Användare (chef, specialare och lokalvårdare) kopplas bort från enheten och kan flyttas till andra enheter."
            }
          />
        )}
        {units &&
          units?.map((unit) => {
            console.log("Unit med keys", unit?.keys);
            console.log("Unit med users", unit?.users);

            const chefer = unit.users?.filter((user) =>
              user?.role?.includes("Enhetschef")
            );
            const specialister = unit.users?.filter((user) =>
              user?.role?.includes("Specialare")
            );

            return (
              <MainCard
                key={unit._id}
                actions={
                  <div className="flex items-center gap-3">
                    <Link href={`/dashboard/units/${unit._id}/edit`}>
                      <HiOutlinePencilAlt className="w-5 h-5 text-gray-500 hover:text-purple-600" />
                    </Link>
                    <button onClick={() => openDeleteModal(unit._id)}>
                      <HiOutlineTrash className="w-5 h-5 text-red-400 hover:text-red-600" />
                    </button>
                  </div>
                }
                title={unit.name}>
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
