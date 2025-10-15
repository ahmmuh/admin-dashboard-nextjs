// "use client";
// import LoadingPage from "@/app/loading";
// import { getApartments } from "@/backend/apartmentAPI";
// import ApartmentList from "@/components/apartments/apartmentList";
// import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// import React, { useEffect, useState } from "react";

// function ApartmentPage() {
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { currentUser } = useFetchCurrentUser();

//   useEffect(() => {
//     const fetchApartments = async () => {
//       try {
//         const apartmentList = await getApartments();

//         setApartments(apartmentList || []);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error", error.message);
//         setLoading(false);
//         setError(error);
//       }
//     };

//     fetchApartments();
//   }, []);
//   // const apartments = await getApartments();
//   // console.log("Apartments i ApartmentPage", apartments);

//   if (loading) {
//     return <LoadingPage />;
//   }

//   console.log("apartments", apartments);

//   if (error) {
//     return (
//       <div className="flex justify-center items-center p-5">
//         <p className="text-2xl font-bold">{error.message}</p>
//       </div>
//     );
//   }

//   if (apartments.length === 0) {
//     return (
//       <>
//         <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start">
//           {currentUser.role?.some(
//             (r) =>
//               r === "Avdelningschef" ||
//               r === "Områdeschef" ||
//               r === "Flyttstädansvarig"
//           ) && (
//             <Link
//               className="text-green-800 flex items-center gap-3"
//               href={"/dashboard/apartments/create"}>
//               <HiPlus />
//               <span>Skapa flyttstäd</span>
//             </Link>
//           )}
//         </div>
//         <div className="flex justify-center items-center p-5">
//           <p>Det finns inga lägenheter att visa just nu.</p>
//           Ahmed
//         </div>
//       </>
//     );
//   }

//   return <ApartmentList currentUser={currentUser} apartments={apartments} />;
// }

// export default ApartmentPage;

"use client";
import LoadingPage from "@/app/loading";
import { getApartments } from "@/backend/apartmentAPI";
import ApartmentList from "@/components/apartments/apartmentList";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  HiOutlineHome,
  HiOutlineInbox,
  HiOutlineSparkles,
  HiOutlineTrash,
  HiPlus,
} from "react-icons/hi";

function ApartmentPage() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    currentUser,
    loading: userLoading,
    error: userError,
  } = useFetchCurrentUser();

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const apartmentList = await getApartments();
        setApartments(apartmentList || []);
      } catch (error) {
        // console.log("Error", error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  // visa laddningssida tills både apartments och user är klara
  if (loading || userLoading) return <LoadingPage />;

  if (error) {
    return (
      <div className="flex justify-center items-center p-5">
        <p className="text-2xl font-bold">{error.message}</p>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="flex justify-center items-center p-5">
        <p className="text-2xl font-bold">{userError.message}</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center p-5">
        <p className="text-2xl font-bold">Ingen användare inloggad</p>
      </div>
    );
  }

  if (apartments.length === 0) {
    return (
      <>
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start">
          {currentUser.role?.some((r) =>
            ["Avdelningschef", "Områdeschef", "Flyttstädansvarig"].includes(r)
          ) && (
            <Link
              className="text-green-800 flex items-center gap-3"
              href={"/dashboard/apartments/create"}>
              <HiPlus />
              <span>Skapa flyttstäd</span>
            </Link>
          )}
        </div>
        <div className="flex flex-col justify-center items-center p-5 text-gray-600">
          <HiOutlineSparkles className="w-12 h-12 mb-3 text-blue-400" />
          <p className="text-lg font-medium">
            Det finns inga flyttstäd just nu.
          </p>
        </div>
      </>
    );
  }

  return <ApartmentList currentUser={currentUser} apartments={apartments} />;
}

export default ApartmentPage;
