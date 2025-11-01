// "use client";

// import LoadingPage from "@/app/loading";
// import { deleteKey, getKeyByID, updateKey } from "@/backend/keyAPI";
// import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// import { displayErrorMessage } from "@/helper/toastAPI";
// import { useParams, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

// function EditKey() {
//   const { currentUser } = useFetchCurrentUser();
//   const [key, setKey] = useState({
//     keyLabel: "",
//     unit: null,
//   });
//   const params = useParams();

//   const keyId = params.keyId;

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // console.log("KEY ID: i Edit key page", keyId);
//   const router = useRouter();

//   const changeHandler = (e) => {
//     const { name, value } = e.target;

//     if (name === "unit") {
//       setKey((prevKey) => ({
//         ...prevKey,
//         unit: { ...prevKey.unit, name: value },
//       }));
//     } else {
//       setKey((prevKey) => ({
//         ...prevKey,
//         [name]: value,
//       }));
//     }
//   };

//   const fetchKey = async () => {
//     try {
//       const foundedKey = await getKeyByID(keyId);
//       if (!foundedKey) {
//         throw new Error(`Den sökta nyckel med ID: ${keyId} finns ej`);
//       }
//       // console.log(`Den hämtade nyckel är ${foundedKey}`);
//       setKey({
//         keyLabel: foundedKey.keyLabel || "",
//         unit: foundedKey.unit || null,
//       });
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       setError(error);
//       throw new Error(
//         `Error vid hämtning av nyckel. Meddelandes:${error.message}`
//       );
//     }
//   };

//   const changeKeyHandler = async (e) => {
//     e.preventDefault();
//     try {
//       if (!keyId) {
//         // console.log("KEY ID SAKNAS");
//       }

//       // const updatedKey = await updateKey(keyId, key);
//       await updateKey(keyId, {
//         keyLabel: key.keyLabel,
//         unit: key.unit?._id, // endast ID till backend
//       });
//       // console.log("Updated Key", updatedKey);
//       router.back();
//     } catch (error) {
//       // console.error("Error vid uppdatering av KEY", error);
//     }
//   };

//   useEffect(() => {
//     if (keyId) {
//       setKey((prevKey) => ({
//         ...prevKey,
//         keyLabel: key.keyLabel,
//         unit: key.unit,
//         updatedAt: new Date().toLocaleDateString(),
//       }));
//     }
//   }, [keyId]);

//   useEffect(() => {
//     if (keyId) {
//       fetchKey();
//     }
//   }, [keyId]);

//   const deleteKeyHandler = async (e) => {
//     e.preventDefault();
//     if (keyId) {
//       await deleteKey(keyId);
//       router.back();
//       displayErrorMessage(`Nyckel: ${key.keyLabel} har tagits bort`);
//     }
//   };

//   if (loading) {
//     return <LoadingPage />;
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center bg-red-500 text-white p-10">
//         <h4>Error {error.message}</h4>
//       </div>
//     );
//   }

//   const isManager =
//     currentUser?.role?.includes("Avdelningschef") ||
//     currentUser?.role?.includes("Områdeschef");
//   return (
//     <div className="w-full border border-x-2 px-2">
//       <div className="flex flex-col">
//         <h4 className=" text-blue-500 font-bold mb-5">
//           Uppdatera nyckel 🔑 {key.keyLabel}
//         </h4>
//         <form>
//           <div className="mb-4 w-full ">
//             <input
//               className="p-2 w-full border border-3 border-b-orange-500 rounded"
//               name="keyLabel"
//               value={key.keyLabel || ""}
//               onChange={changeHandler}
//               placeholder="Namn på nyckeln"
//             />
//           </div>
//           <div className="mb-4 w-full ">
//             <input
//               className="p-2 w-full border border-b-3 border-b-orange-500"
//               name="unit"
//               value={key.unit?.name || ""}
//               placeholder="Vilken enhet"
//               onChange={changeHandler}
//             />
//           </div>

//           <div className="flex justify-start  py-4 ">
//             <button
//               onClick={changeKeyHandler}
//               className="w-1/3 flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
//               Spara
//             </button>

//             {isManager && (
//               <button
//                 onClick={deleteKeyHandler}
//                 className="w-1/3 ml-3 flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition">
//                 <HiOutlineTrash className="w-5 h-5" />
//                 Ta bort
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditKey;

"use client";

import LoadingPage from "@/app/loading";
import { deleteKey, getKeyByID, updateKey } from "@/backend/keyAPI";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import CustomAlert from "@/helper/customAlert";
import { displayErrorMessage } from "@/helper/toastAPI";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

function EditKey() {
  const { currentUser } = useFetchCurrentUser();
  const [key, setKey] = useState({
    keyLabel: "",
    unit: null,
  });
  const [showAlert, setShowAlert] = useState(false); // 🔹 state för alert
  const params = useParams();
  const keyId = params.keyId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "unit") {
      setKey((prevKey) => ({
        ...prevKey,
        unit: { ...prevKey.unit, name: value },
      }));
    } else {
      setKey((prevKey) => ({ ...prevKey, [name]: value }));
    }
  };

  const fetchKey = async () => {
    try {
      const foundedKey = await getKeyByID(keyId);
      if (!foundedKey)
        throw new Error(`Den sökta nyckel med ID: ${keyId} finns ej`);
      setKey({
        keyLabel: foundedKey.keyLabel || "",
        unit: foundedKey.unit || null,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const changeKeyHandler = async (e) => {
    e.preventDefault();
    try {
      await updateKey(keyId, { keyLabel: key.keyLabel, unit: key.unit?._id });
      router.back();
    } catch (error) {
      displayErrorMessage(`Fel vid uppdatering av nyckel: ${error.message}`);
    }
  };

  const deleteKeyHandler = async () => {
    if (keyId) {
      await deleteKey(keyId);
      router.back();
      displayErrorMessage(`Nyckel: ${key.keyLabel} har tagits bort`);
    }
  };

  useEffect(() => {
    if (keyId) fetchKey();
  }, [keyId]);

  if (loading) return <LoadingPage />;
  if (error)
    return (
      <div className="flex justify-center items-center bg-red-500 text-white p-10">
        <h4>Error {error.message}</h4>
      </div>
    );

  const isManager =
    currentUser?.role?.includes("Avdelningschef") ||
    currentUser?.role?.includes("Områdeschef");

  return (
    <div className="w-full border border-x-2 px-2">
      <div className="flex flex-col">
        <h4 className="text-blue-500 font-bold mb-5">
          Uppdatera nyckel 🔑 {key.keyLabel}
        </h4>
        <form>
          <div className="mb-4 w-full">
            <input
              className="p-2 w-full border border-3 border-b-orange-500 rounded"
              name="keyLabel"
              value={key.keyLabel || ""}
              onChange={changeHandler}
              placeholder="Namn på nyckeln"
            />
          </div>
          <div className="mb-4 w-full">
            <input
              className="p-2 w-full border border-b-3 border-b-orange-500"
              name="unit"
              value={key.unit?.name || ""}
              placeholder="Vilken enhet"
              onChange={changeHandler}
            />
          </div>

          <div className="flex justify-start py-4">
            <button
              onClick={changeKeyHandler}
              className="w-1/3 flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
              Spara
            </button>

            {isManager && (
              <button
                type="button"
                onClick={() => setShowAlert(true)} // 🔹 visa CustomAlert istället för direkt delete
                className="w-1/3 ml-3 flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition">
                <HiOutlineTrash className="w-5 h-5" />
                Ta bort
              </button>
            )}
          </div>
        </form>
      </div>

      {showAlert && (
        <CustomAlert
          message={`Vill du ta bort nyckeln "${key.keyLabel}"?`}
          onConfirm={() => {
            deleteKeyHandler();
            setShowAlert(false);
          }}
          onCancel={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default EditKey;
