//OLd kod som fungera bra
"use client";

import LoadingPage from "@/app/loading";
import { checkinKey, getAllKeys } from "@/backend/keyAPI";
import KeySearch from "@/components/keys/keySearch";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import {
  faCalendar,
  faEdit,
  faPen,
  faPenAlt,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiPlus } from "react-icons/hi";

function KeyPage() {
  const [error, setError] = useState(null);
  const [keys, setKeys] = useState([]);
  const router = useRouter();
  const { currentUser, loading } = useFetchCurrentUser();
  const [qrVisible, setQrVisible] = useState({});
  const [keyLoading, setKeyLoading] = useState(true);

  const checkInHandler = async (key) => {
    const userId = key.lastBorrowedBy;
    try {
      await checkinKey(userId, key._id);
      await fetchKeys();
      toast.success("Nyckeln har återlämnats");
    } catch (error) {
      console.error("Error", error);
      toast.error("Något har gått fel");
    }
  };

  const fetchKeys = async () => {
    try {
      const keyList = await getAllKeys();
      setKeys(keyList);
      setKeyLoading(false);
    } catch (error) {
      console.error("Error vid hämtning av nycklar", error.message);
      setError(error);
      setKeyLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const toggleQRCode = (keyId) => {
    setQrVisible((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  if (loading || keyLoading) {
    return <LoadingPage message="Hämtar alla nycklar..." />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-red-600 p-10">
        <h4 className="text-2xl text-white-500">Error</h4>
      </div>
    );
  }

  const isManager =
    currentUser?.role?.includes("Avdelningschef") ||
    currentUser?.role?.includes("Områdeschef");

  return (
    <div>
      <Toaster />
      {/* <div className="p-2">
        <h3 className="text-2xl text-blue-500  mb-6">Nyckelhantering</h3>
        <div className="flex flex-wrap  sm:gap-3 justify-end items-end pr-8">
          {isManager && (
            <Link
              className="text-green-800  flex items-center gap-3 mb-4"
              href={"/dashboard/key_QRcode"}>
              <HiPlus />
              <span>Lägg till nyckel</span>
            </Link>
          )}
          <Link href={"/dashboard/keyLogs"}>Nyckelhistorik</Link>
        </div>
      </div> */}
      <div className="p-2 ">
        <div className="flex justify-between items-center mb-4">
          {/* Vänstersida */}
          <h3 className="text-2xl text-blue-500 mb-0">Nyckelhantering</h3>

          {/* Högersida */}
          <div className="flex items-center gap-6 pr-8">
            {isManager && (
              <Link
                className="text-green-800 flex items-center gap-2"
                href={"/dashboard/key_QRcode"}>
                <HiPlus />
                <span>Lägg till nyckel</span>
              </Link>
            )}
            <Link
              href={"/dashboard/keyLogs"}
              className="text-blue-700 hover:underline">
              <FontAwesomeIcon icon={faCalendar} className="pr-1" />
              Nyckelhistorik
            </Link>
          </div>
        </div>
      </div>

      <div className="pr-10">
        <div className="hidden md:block">
          <KeySearch />
        </div>

        {keyLoading || loading ? (
          <LoadingPage message="Hämtar användare och nycklar..." />
        ) : keys.length === 0 ? (
          <div className="text-center text-red-500 p-4">
            Det finns inga nycklar att visa just nu.
          </div>
        ) : (
          <table className="border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-200 text-left">
                  Nyckelbeteckning
                </th>
                <th className="border border-gray-200 text-left">Plats</th>
                <th className="border border-gray-200 text-left">Status</th>
                <th className="border border-gray-200 text-left">Lånetagare</th>
                <th className="border border-gray-200 text-left">
                  Utlånat datum
                </th>
                <th className="border border-gray-200 text-left">
                  Inlämnat datum
                </th>

                {isManager && (
                  <th className="border border-gray-200 text-left">Åtgärd</th>
                )}
              </tr>
            </thead>
            <tbody>
              {keys &&
                keys?.map((key, i) => (
                  <tr
                    key={key._id}
                    className={`${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}>
                    <td className="border border-gray-200 text-blue-400 font-bold">
                      🔑 {key.keyLabel.toUpperCase()}
                      <Link href={`/dashboard/keys/${key._id}`}>
                        <br />
                        <FontAwesomeIcon
                          icon={faEdit}
                          size="15"
                          name="pencil"
                        />
                      </Link>
                      {key.qrCode && (
                        <>
                          <button
                            onClick={() => toggleQRCode(key._id)}
                            className="block"
                            style={{ fontSize: ".6rem" }}>
                            <span className="text-center pl-7">
                              {qrVisible[key._id]
                                ? "Göm QR kod"
                                : "Visa QR kod"}
                            </span>
                          </button>
                          {qrVisible[key._id] && (
                            <div style={{ paddingLeft: 20 }}>
                              <Image
                                width={150}
                                height={200}
                                src={key.qrCode}
                                alt="QrCode image"
                              />
                              <a
                                href={key.qrCode}
                                download="qrcode.png"
                                style={{ fontSize: ".7rem" }}>
                                <button style={{ marginTop: 10 }}>
                                  Ladda ner QR kod
                                </button>
                              </a>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {key.unit?.name}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {key.status === "available" && (
                        <span className="text-green-700 font-bold">Inne</span>
                      )}
                      {key.status === "returned" && (
                        <span className="text-green-700 font-bold">
                          Återlämnad
                        </span>
                      )}
                      {key.status === "checked-out" && (
                        <span className="text-red-700 font-bold">Utlånad</span>
                      )}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {key.status === "checked-out"
                        ? key.borrowedBy?.name
                        : "—"}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {key.status === "checked-out" && key.borrowedAt
                        ? new Date(key.borrowedAt).toLocaleString("sv-SE")
                        : "—"}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {key.status === "returned" && key.returnedAt
                        ? new Date(key.returnedAt).toLocaleString("sv-SE")
                        : "—"}
                    </td>
                    {isManager && (
                      <td className="font-bold p-2">
                        {["available", "returned"].includes(key.status) && (
                          <span className="text-green-500">
                            <Link href={`/dashboard/keys/${key._id}/borrow`}>
                              Låna
                            </Link>
                          </span>
                        )}
                        {key.status === "checked-out" && (
                          <span className="text-red-500">
                            <Link href={`/dashboard/keys/${key._id}/borrow`}>
                              Lämna in
                            </Link>
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default KeyPage;

//NEW CODE som ska testas (den saknar QR delen)

// "use client";

// import LoadingPage from "@/app/loading";
// import { checkinKey, getAllKeys } from "@/backend/keyAPI";
// import KeySearch from "@/components/keys/keySearch";
// import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { HiOutlinePlus } from "react-icons/hi";

// function KeyPage() {
//   const [error, setError] = useState(null);
//   const [keys, setKeys] = useState([]); // alltid array
//   const { currentUser, loading } = useFetchCurrentUser();
//   const [keyLoading, setKeyLoading] = useState(true);

//   // const checkInHandler = async (key) => {
//   //   const userId = key.lastBorrowedBy;
//   //   try {
//   //     await checkinKey(userId, key._id);
//   //     await fetchKeys();
//   //     toast.success("Nyckeln har återlämnats");
//   //   } catch (error) {
//   //     console.error("Error", error);
//   //     toast.error("Något har gått fel");
//   //   }
//   // };

//   const checkInHandler = async (key) => {
//     const userId = key.borrowedBy?._id || key.borrowedBy; // riktig låntagare
//     try {
//       await checkinKey(userId, key._id);
//       await fetchKeys();
//       toast.success("Nyckeln har återlämnats");
//     } catch (error) {
//       console.error("Error", error);
//       toast.error(error.response?.data?.message || "Något har gått fel");
//     }
//   };

//   const fetchKeys = async () => {
//     try {
//       const keyList = await getAllKeys();
//       setKeys(Array.isArray(keyList) ? keyList : []); // säkerställ array
//       setKeyLoading(false);
//     } catch (error) {
//       console.error("Error vid hämtning av nycklar", error.message);
//       setError(error);
//       setKeyLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchKeys();
//   }, []);

//   if (loading || keyLoading)
//     return <LoadingPage message="Hämtar alla nycklar..." />;
//   if (error)
//     return (
//       <div className="flex justify-center items-center bg-red-600 p-10">
//         <h4 className="text-2xl text-white-500">Error</h4>
//       </div>
//     );

//   const isManager =
//     currentUser?.role?.includes("Avdelningschef") ||
//     currentUser?.role?.includes("Områdeschef");

//   return (
//     <div>
//       <Toaster />
//       <div className="p-2">
//         {keys.length > 0 && (
//           <h3 className="text-2xl text-blue-500 mb-6">Nyckelhantering</h3>
//         )}
//         {isManager && (
//           <Link
//             className="text-green-800 flex items-center gap-3 mb-4"
//             href={"/dashboard/key_QRcode"}>
//             <HiOutlinePlus className="w-5 h-5" />
//             Lägg till nyckel
//           </Link>
//         )}
//       </div>

//       <div className="pr-10">
//         <div className="hidden md:block">
//           <KeySearch />
//         </div>

//         {keys.length === 0 ? (
//           <div className="text-center text-red-500 p-4 font-semibold">
//             Det finns inga nycklar att visa just nu.
//           </div>
//         ) : (
//           <table className="border border-gray-400 w-full">
//             <thead>
//               <tr>
//                 <th className="border border-gray-200 text-left">
//                   Nyckelbeteckning
//                 </th>
//                 <th className="border border-gray-200 text-left">Plats</th>
//                 <th className="border border-gray-200 text-left">Status</th>
//                 <th className="border border-gray-200 text-left">Lånetagare</th>
//                 <th className="border border-gray-200 text-left">
//                   Utlånat datum
//                 </th>
//                 <th className="border border-gray-200 text-left">
//                   Inlämnat datum
//                 </th>
//                 {isManager && (
//                   <th className="border border-gray-200 text-left">Åtgärd</th>
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {keys.map((key) => (
//                 <tr key={key._id} className="hover:bg-gray-300">
//                   <td className="border border-gray-200 text-blue-400 font-bold">
//                     🔑{" "}
//                     <Link href={`/dashboard/keys/${key._id}`}>
//                       {key.keyLabel.toUpperCase()}
//                     </Link>
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.unit?.name || "-"}
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.status === "available" && (
//                       <span className="text-green-700 font-bold">Inne</span>
//                     )}
//                     {key.status === "returned" && (
//                       <span className="text-green-700 font-bold">
//                         Återlämnad
//                       </span>
//                     )}
//                     {key.status === "checked-out" && (
//                       <span className="text-red-700 font-bold">Utlånad</span>
//                     )}
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.status === "checked-out" ? key.borrowedBy?.name : "—"}
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.status === "checked-out" && key.borrowedAt
//                       ? new Date(key.borrowedAt).toLocaleString("sv-SE")
//                       : "—"}
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.status === "returned" && key.returnedAt
//                       ? new Date(key.returnedAt).toLocaleString("sv-SE")
//                       : "—"}
//                   </td>
//                   {isManager && (
//                     <td className="border border-gray-200 p-2 font-bold">
//                       {["available", "returned"].includes(key.status) && (
//                         <Link
//                           className="text-green-500"
//                           href={`/dashboard/keys/${key._id}/borrow`}>
//                           Låna
//                         </Link>
//                       )}
//                       {key.status === "checked-out" && (
//                         // <button
//                         //   className="text-red-500"
//                         //   onClick={() => checkInHandler(key)}>
//                         //   Återlämna
//                         // </button>

//                         <Link
//                           className="text-green-500"
//                           href={`/dashboard/keys/${key._id}/borrow`}>
//                           Lämna in
//                         </Link>
//                       )}
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default KeyPage;

//OLD KOD
// "use client";

// import LoadingPage from "@/app/loading";
// import { checkinKey, getAllKeys } from "@/backend/keyAPI";
// import KeySearch from "@/components/keys/keySearch";
// import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { HiPlus } from "react-icons/hi";

// function KeyPage() {
//   const [error, setError] = useState(null);
//   const [keys, setKeys] = useState([]);
//   const router = useRouter();
//   const { currentUser, loading } = useFetchCurrentUser();
//   const [qrVisible, setQrVisible] = useState({});
//   const [keyLoading, setKeyLoading] = useState(true);

//   const checkInHandler = async (key) => {
//     const userId = key.lastBorrowedBy;
//     try {
//       await checkinKey(userId, key._id);
//       await fetchKeys();
//       toast.success("Nyckeln har återlämnats");
//     } catch (error) {
//       console.error("Error", error);
//       toast.error("Något har gått fel");
//     }
//   };

//   const fetchKeys = async () => {
//     try {
//       const keyList = await getAllKeys();
//       setKeys(keyList);
//       setKeyLoading(false);
//     } catch (error) {
//       console.error("Error vid hämtning av nycklar", error.message);
//       setError(error);
//       setKeyLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchKeys();
//   }, []);

//   const toggleQRCode = (keyId) => {
//     setQrVisible((prev) => ({
//       ...prev,
//       [keyId]: !prev[keyId],
//     }));
//   };

//   if (loading || keyLoading) {
//     return <LoadingPage message="Hämtar alla nycklar..." />;
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center bg-red-600 p-10">
//         <h4 className="text-2xl text-white-500">Error</h4>
//       </div>
//     );
//   }

//   const isManager =
//     currentUser?.role?.includes("Avdelningschef") ||
//     currentUser?.role?.includes("Områdeschef");

//   return (
//     <div>
//       <Toaster />
//       <div className="p-2">
//         {keys.length > 0 && (
//           <h3 className="text-2xl text-blue-500  mb-6">Nyckelhantering</h3>
//         )}{" "}
//         {isManager && (
//           <Link
//             className="text-green-800  flex items-center gap-3 mb-4"
//             href={"/dashboard/key_QRcode"}>
//             <HiPlus />
//             <span>Lägg till nyckel</span>
//           </Link>
//         )}
//       </div>

//       <div className="pr-10">
//         <div className="hidden md:block">
//           <KeySearch />
//         </div>

//         {keyLoading || loading ? (
//           <LoadingPage message="Hämtar användare och nycklar..." />
//         ) : Array.isArray(keys) && keys.length > 0 ? (
//           <table className="border border-gray-400 w-full">
//             <thead>
//               <tr>
//                 <th className="border border-gray-200 text-left">
//                   Nyckelbeteckning
//                 </th>
//                 <th className="border border-gray-200 text-left">Plats</th>
//                 <th className="border border-gray-200 text-left">Status</th>
//                 <th className="border border-gray-200 text-left">Lånetagare</th>
//                 <th className="border border-gray-200 text-left">
//                   Utlånat datum
//                 </th>
//                 <th className="border border-gray-200 text-left">
//                   Inlämnat datum
//                 </th>
//                 {isManager && (
//                   <th className="border border-gray-200 text-left">Åtgärd</th>
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {keys.map((key) => (
//                 <tr key={key._id} className="hover:bg-gray-300">
//                   <td className="border border-gray-200 text-blue-400 font-bold">
//                     🔑{" "}
//                     <Link href={`/dashboard/keys/${key._id}`}>
//                       {key.keyLabel.toUpperCase()}
//                     </Link>
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.unit?.name || "-"}
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.status === "available" && (
//                       <span className="text-green-700 font-bold">Inne</span>
//                     )}
//                     {key.status === "returned" && (
//                       <span className="text-green-700 font-bold">
//                         Återlämnad
//                       </span>
//                     )}
//                     {key.status === "checked-out" && (
//                       <span className="text-red-700 font-bold">Utlånad</span>
//                     )}
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.status === "checked-out" ? key.borrowedBy?.name : "—"}
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.status === "checked-out" && key.borrowedAt
//                       ? new Date(key.borrowedAt).toLocaleString("sv-SE")
//                       : "—"}
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.status === "returned" && key.returnedAt
//                       ? new Date(key.returnedAt).toLocaleString("sv-SE")
//                       : "—"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="text-center p-4 font-semibold">
//             Det finns inga nycklar att visa just nu.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default KeyPage;

//NY KOD MED QR KOD (Konstigt beteende)
// "use client";

// import LoadingPage from "@/app/loading";
// import { checkinKey, getAllKeys } from "@/backend/keyAPI";
// import KeySearch from "@/components/keys/keySearch";
// import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { HiOutlinePlus } from "react-icons/hi";

// function KeyPage() {
//   const [error, setError] = useState(null);
//   const [keys, setKeys] = useState([]); // alltid array
//   const { currentUser, loading } = useFetchCurrentUser();
//   const [keyLoading, setKeyLoading] = useState(true);

//   // QR toggle
//   const [qrVisible, setQrVisible] = useState(false);
//   const toggleQRCode = () => setQrVisible((prev) => !prev);

//   const checkInHandler = async (key) => {
//     const userId = key.borrowedBy?._id || key.borrowedBy; // riktig låntagare
//     try {
//       await checkinKey(userId, key._id);
//       await fetchKeys();
//       toast.success("Nyckeln har återlämnats");
//     } catch (error) {
//       console.error("Error", error);
//       toast.error(error.response?.data?.message || "Något har gått fel");
//     }
//   };

//   const fetchKeys = async () => {
//     try {
//       const keyList = await getAllKeys();
//       setKeys(Array.isArray(keyList) ? keyList : []); // säkerställ array
//       setKeyLoading(false);
//     } catch (error) {
//       console.error("Error vid hämtning av nycklar", error.message);
//       setError(error);
//       setKeyLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchKeys();
//   }, []);

//   if (loading || keyLoading)
//     return <LoadingPage message="Hämtar alla nycklar..." />;
//   if (error)
//     return (
//       <div className="flex justify-center items-center bg-red-600 p-10">
//         <h4 className="text-2xl text-white">Error</h4>
//       </div>
//     );

//   const isManager =
//     currentUser?.role?.includes("Avdelningschef") ||
//     currentUser?.role?.includes("Områdeschef");

//   return (
//     <div>
//       <Toaster />
//       <div className="p-2">
//         {keys.length > 0 && (
//           <h3 className="text-2xl text-blue-500 mb-6">Nyckelhantering</h3>
//         )}

//         {isManager && (
//           <div className="flex flex-col gap-4 mb-6">
//             <Link
//               className="text-green-800 flex items-center gap-3"
//               href={"/dashboard/key_QRcode"}>
//               <HiOutlinePlus className="w-5 h-5" />
//               Lägg till nyckel
//             </Link>

//             {/* QR toggle knapp */}
//             <button
//               onClick={toggleQRCode}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">
//               {qrVisible ? "Dölj QR-kod" : "Visa QR-kod"}
//             </button>

//             {/* QR image */}
//             {qrVisible && (
//               <div className="flex justify-center">
//                 <Image
//                   src="/qr-code.png" // byt till din QR-kod path
//                   alt="QR Code"
//                   width={200}
//                   height={200}
//                   className="rounded-lg shadow-md"
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="pr-10">
//         <div className="hidden md:block">
//           <KeySearch />
//         </div>

//         {keys.length === 0 ? (
//           <div className="text-center text-red-500 p-4 font-semibold">
//             Det finns inga nycklar att visa just nu.
//           </div>
//         ) : (
//           <table className="border border-gray-400 w-full">
//             <thead>
//               <tr>
//                 <th className="border border-gray-200 text-left">
//                   Nyckelbeteckning
//                 </th>
//                 <th className="border border-gray-200 text-left">Plats</th>
//                 <th className="border border-gray-200 text-left">Status</th>
//                 <th className="border border-gray-200 text-left">Lånetagare</th>
//                 <th className="border border-gray-200 text-left">
//                   Utlånat datum
//                 </th>
//                 <th className="border border-gray-200 text-left">
//                   Inlämnat datum
//                 </th>
//                 {isManager && (
//                   <th className="border border-gray-200 text-left">Åtgärd</th>
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {keys.map((key) => (
//                 <tr key={key._id} className="hover:bg-gray-300">
//                   <td className="border border-gray-200 text-blue-400 font-bold">
//                     🔑{" "}
//                     <Link href={`/dashboard/keys/${key._id}`}>
//                       {key.keyLabel.toUpperCase()}
//                     </Link>
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.unit?.name || "-"}
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.status === "available" && (
//                       <span className="text-green-700 font-bold">Inne</span>
//                     )}
//                     {key.status === "returned" && (
//                       <span className="text-green-700 font-bold">
//                         Återlämnad
//                       </span>
//                     )}
//                     {key.status === "checked-out" && (
//                       <span className="text-red-700 font-bold">Utlånad</span>
//                     )}
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.status === "checked-out" ? key.borrowedBy?.name : "—"}
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.status === "checked-out" && key.borrowedAt
//                       ? new Date(key.borrowedAt).toLocaleString("sv-SE")
//                       : "—"}
//                   </td>
//                   <td className="border border-gray-200 p-2">
//                     {key.status === "returned" && key.returnedAt
//                       ? new Date(key.returnedAt).toLocaleString("sv-SE")
//                       : "—"}
//                   </td>
//                   {isManager && (
//                     <td className="border border-gray-200 p-2 font-bold">
//                       {["available", "returned"].includes(key.status) && (
//                         <Link
//                           className="text-green-500"
//                           href={`/dashboard/keys/${key._id}/borrow`}>
//                           Låna
//                         </Link>
//                       )}
//                       {key.status === "checked-out" && (
//                         <Link
//                           className="text-green-500"
//                           href={`/dashboard/keys/${key._id}/borrow`}>
//                           Lämna in
//                         </Link>
//                       )}
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default KeyPage;
