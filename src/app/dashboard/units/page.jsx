//Korekt o välfungerande kod

// "use client";

// import LoadingPage from "@/app/loading";
// import { deleteUnitById, getUnits } from "@/backend/api";
// import MainCard from "@/components/maincard";
// import SearchUnit from "@/components/units/searchUnit";
// import UnitActionModal from "@/components/units/unitActionModel";
// import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   HiOutlineKey,
//   HiOutlineUser,
//   HiOutlineUserGroup,
//   HiOutlineClipboardList,
//   HiOutlinePencilAlt,
//   HiOutlineTrash,
//   HiPlus,
// } from "react-icons/hi";

// function UnitPage({ params }) {
//   const [units, setUnits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { currentUser } = useFetchCurrentUser();
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedUnitId, setSelectedUnitId] = useState(null);

//   const router = useRouter();

//   useEffect(() => {
//     const fetchUnits = async () => {
//       try {
//         const unitList = await getUnits();
//         setUnits(unitList || []);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error", error.message);
//         setLoading(false);
//         setError(error);
//       }
//     };
//     fetchUnits();
//   }, []);

//   if (loading) return <LoadingPage message="Laddar enheter..." />;

//   if (error)
//     return (
//       <div className="flex justify-center items-center">
//         <p className="text-2xl font-bold">{error.message}</p>
//       </div>
//     );

//   if (units.length === 0)
//     return (
//       <div className="flex justify-center items-center">
//         <p className="text-2xl text-blue-500">
//           Det finns inga enheter att visa just nu.
//         </p>
//       </div>
//     );

//   const openDeleteModal = (id) => {
//     setSelectedUnitId(id);
//     setDeleteModalOpen(true);
//   };

//   const confirmUnitDelete = async () => {
//     try {
//       await deleteUnitById(selectedUnitId);
//       setDeleteModalOpen(false);
//       const updatedUnits = await getUnits();
//       setUnits(updatedUnits);
//       displaySuccessMessage(`Enhet med ID ${selectedUnitId} har raderats`);
//     } catch (error) {
//       displayErrorMessage("Det gick inte att radera denna enhet");
//       setDeleteModalOpen(false);
//     }
//   };

//   const cancelUnitDeleteModal = () => {
//     setDeleteModalOpen(false);
//   };

//   const isManager =
//     currentUser?.role?.includes("Avdelningschef") ||
//     currentUser?.role?.includes("Områdeschef");

//   return (
//     <div className="max-w-6xl mx-auto flex flex-col gap-6">
//       <h1 className="text-2xl font-extrabold text-blue-500 mb-6 border-b-4 border-purple-200 pb-3">
//         Alla enheter
//       </h1>
//       {isManager && (
//         <div className="my-4">
//           <Link
//             className="text-green-800 flex items-center gap-3"
//             href={"/dashboard/units/create"}>
//             <HiPlus />
//             <span>Skapa enhet</span>
//           </Link>
//         </div>
//       )}

//       <div className="hidden md:block mb-6" id="search-unit-section">
//         <SearchUnit />
//       </div>

//       {deleteModalOpen && (
//         <UnitActionModal
//           cancelUnitDeleteModal={cancelUnitDeleteModal}
//           confirmUnitDelete={confirmUnitDelete}
//           message={
//             "Är du säker på att du vill ta bort denna enhet? Morgonjobb, nycklar och flyttstäd tas bort. Användare (chef, specialare och lokalvårdare) kopplas bort från enheten och kan flyttas till andra enheter."
//           }
//         />
//       )}

//       <div
//         className={`flex flex-col gap-6 ${
//           units.length > 5 ? "overflow-y-auto max-h-[500px]" : ""
//         }`}>
//         {units &&
//           Array.isArray(units) &&
//           units.map((unit) => {
//             const chefer =
//               unit.users?.filter((u) => u?.role?.includes("Enhetschef")) || [];
//             const specialister =
//               unit.users?.filter((u) => u?.role?.includes("Specialare")) || [];

//             return (
//               <MainCard
//                 id={`unit-card-${unit._id}`}
//                 key={unit._id}
//                 actions={
//                   isManager && (
//                     <div className="flex items-center gap-3">
//                       <Link href={`/dashboard/units/${unit._id}/edit`}>
//                         <HiOutlinePencilAlt className="w-5 h-5 text-gray-500 hover:text-purple-600" />
//                       </Link>
//                       <button onClick={() => openDeleteModal(unit._id)}>
//                         <HiOutlineTrash className="w-5 h-5 text-red-400 hover:text-red-600" />
//                       </button>
//                     </div>
//                   )
//                 }
//                 title={unit.name}>
//                 <div className="flex flex-col divide-y divide-gray-300">
//                   {chefer.length > 0 && (
//                     <CardRow
//                       icon={
//                         <HiOutlineUser className="text-purple-500 w-5 h-5" />
//                       }
//                       href={`/dashboard/units/${unit._id}/chefer`}
//                       text={chefer.map((c) => c.name).join(", ")}
//                     />
//                   )}

//                   <CardRow
//                     icon={
//                       <HiOutlineUserGroup className="text-purple-500 w-5 h-5" />
//                     }
//                     href={`/dashboard/units/${unit._id}/specialister`}
//                     text={`Specialare (${specialister?.length})`}
//                   />

//                   <CardRow
//                     icon={
//                       <HiOutlineClipboardList className="text-purple-500 w-5 h-5" />
//                     }
//                     href={`/dashboard/units/${unit._id}/unitTasks`}
//                     text={`Att göra (${unit?.tasks?.length})`}
//                   />

//                   <CardRow
//                     icon={<HiOutlineKey className="text-purple-500 w-5 h-5" />}
//                     href={`/dashboard/units/${unit._id}/unitKeys`}
//                     text={`Nycklar (${unit?.keys?.length})`}
//                   />
//                 </div>
//               </MainCard>
//             );
//           })}
//       </div>
//     </div>
//   );
// }

// export function CardRow({ icon, href, text }) {
//   return (
//     <div className="py-4 flex items-center gap-3 group">
//       {icon}
//       <div className="flex flex-col">
//         <Link
//           id={`link-${text.replace(/\s+/g, "-").toLowerCase()}`}
//           href={href}>
//           <span className="text-md font-semibold text-gray-900 group-hover:text-purple-600 transition">
//             {text}
//           </span>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default UnitPage;

//Kod med testguide

"use client";

import LoadingPage from "@/app/loading";
import { deleteUnitById, getUnits } from "@/backend/api";
import MainCard from "@/components/maincard";
import SearchUnit from "@/components/units/searchUnit";
import UnitActionModal from "@/components/units/unitActionModel";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiOutlineKey,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlinePencilAlt,
  HiOutlineTrash,
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
        // console.log("Error", error.message);
        setLoading(false);
        setError(error);
      }
    };
    fetchUnits();
  }, []);

  if (loading) return <LoadingPage message="Laddar enheter..." />;

  if (error)
    return (
      <div className="flex justify-center items-center">
        <p className="text-2xl font-bold">{error.message}</p>
      </div>
    );

  if (units.length === 0)
    return (
      <div className="flex justify-center items-center">
        <p className="text-2xl text-blue-500">
          Det finns inga enheter att visa just nu.
        </p>
      </div>
    );

  const openDeleteModal = (id) => {
    setSelectedUnitId(id);
    setDeleteModalOpen(true);
  };

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

  const cancelUnitDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const isManager =
    currentUser?.role?.includes("Avdelningschef") ||
    currentUser?.role?.includes("Områdeschef");

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <h1
        id="link-units" // ✅ för steg i unitGuideSteps
        className="text-2xl font-extrabold text-blue-500 mb-6 border-b-4 border-purple-200 pb-3">
        Alla enheter
      </h1>
      {isManager && (
        <div className="my-4">
          <Link
            id="add-unit-btn" // ✅ för steg "Skapa enhet"
            className="text-green-800 flex items-center gap-3"
            href={"/dashboard/units/create"}>
            <HiPlus />
            <span>Skapa enhet</span>
          </Link>
        </div>
      )}

      <div className="hidden md:block mb-6" id="search-unit-input">
        {" "}
        {/* ✅ för steg "Sök enhet" */}
        <SearchUnit />
      </div>

      {deleteModalOpen && (
        <UnitActionModal
          cancelUnitDeleteModal={cancelUnitDeleteModal}
          confirmUnitDelete={confirmUnitDelete}
          message={
            "Är du säker på att du vill ta bort denna enhet? Morgonjobb, nycklar och flyttstäd tas bort. Användare (chef, specialare och lokalvårdare) kopplas bort från enheten och kan flyttas till andra enheter."
          }
        />
      )}

      <div
        className={`flex flex-col gap-6 ${
          units.length > 5 ? "overflow-y-auto max-h-[500px]" : ""
        }`}>
        {units &&
          Array.isArray(units) &&
          units.map((unit, index) => {
            const chefer =
              unit.users?.filter((u) => u?.role?.includes("Enhetschef")) || [];
            const specialister =
              unit.users?.filter((u) => u?.role?.includes("Specialare")) || [];

            return (
              <div key={unit._id} className={index === 0 ? "unit-card" : ""}>
                <MainCard
                  // key={unit._id}
                  // className={index === 0 ? "unit-card" : ""}
                  actions={
                    isManager && (
                      <div className="flex items-center gap-3">
                        <Link
                          className="edit-unit-btn"
                          href={`/dashboard/units/${unit._id}/edit`}>
                          <HiOutlinePencilAlt className="w-5 h-5 text-gray-500 hover:text-purple-600" />
                        </Link>
                        <button
                          className="delete-unit-btn" // ✅ för steg "Ta bort enhet"
                          onClick={() => openDeleteModal(unit._id)}>
                          <HiOutlineTrash className="w-5 h-5 text-red-400 hover:text-red-600" />
                        </button>
                      </div>
                    )
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
                      icon={
                        <HiOutlineKey className="text-purple-500 w-5 h-5" />
                      }
                      href={`/dashboard/units/${unit._id}/unitKeys`}
                      text={`Nycklar (${unit?.keys?.length})`}
                    />
                  </div>
                </MainCard>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export function CardRow({ icon, href, text }) {
  return (
    <div className="py-4 flex items-center gap-3 group">
      {icon}
      <div className="flex flex-col">
        <Link
          id={`link-${text.replace(/\s+/g, "-").toLowerCase()}`}
          href={href}>
          <span className="text-md font-semibold text-gray-900 group-hover:text-purple-600 transition">
            {text}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default UnitPage;
