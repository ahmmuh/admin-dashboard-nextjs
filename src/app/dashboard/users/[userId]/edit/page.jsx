"use client";
import LoadingPage from "@/app/loading";
import { getUnits, updateUser } from "@/backend/api";
import { getUserById } from "@/backend/userAPI";
import MainInput from "@/components/input";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import { useFetchUsers } from "@/customhook/useFetchUsers";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiStop, HiTrash } from "react-icons/hi";

// function UserProfile() {
//   const params = useParams();
//   const userId = params.userId;

//   const router = useRouter();
//   const role = [
//     "Avdelningschef",
//     "Områdeschef",
//     "Enhetschef",
//     "Flyttstädansvarig",
//     "Specialare",
//     "Lokalvårdare",
//   ];
//   const [units, setUnits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingUser, setUserLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userError, setUserError] = useState(null);
//   const [user, setUser] = useState(null);
//   const [userRole, setUserRole] = useState(false);
//   const [userEnhet, setUserEnhet] = useState(false);
//   const { fetchUsers } = useFetchUsers();
//   const { currentUser } = useFetchCurrentUser();

//   // Hämta användare
//   const fetchUser = async () => {
//     try {
//       const foundUser = await getUserById(userId);
//       if (!foundUser) return;
//       setUser({
//         ...foundUser,
//         unit: foundUser.unit?._id || foundUser.unit,
//       });
//       setUserLoading(false);
//     } catch (error) {
//       setUserError(error);
//     }
//   };

//   useEffect(() => {
//     if (!userId) return;
//     fetchUser();
//   }, [userId]);

//   // Hämta enheter
//   const fetchUnits = async () => {
//     try {
//       const foundUnit = await getUnits();
//       if (!foundUnit) return;
//       setUnits(foundUnit);
//       setLoading(false);
//     } catch (error) {
//       setError(error);
//     }
//   };

//   useEffect(() => {
//     fetchUnits();
//   }, []);

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const updateUserProfile = async (e) => {
//     e.preventDefault();
//     try {
//       const userInfo = {
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         username: user.username,
//         role: user.role,
//         unit: user?.unit,
//       };
//       if (userInfo) await updateUser(userId, userInfo);
//       await fetchUnits();
//       await fetchUsers();
//       displaySuccessMessage("Användaren uppdaterats");
//       router.push("/dashboard/users");
//     } catch (error) {
//       console.error("Uppdatering misslyckades", error);
//     }
//   };

//   if (loadingUser) {
//     return <LoadingPage />;
//   }

//   if (loading) {
//     return <LoadingPage />;
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center p-5">
//         <h5 className="text-red-500">{error}</h5>
//       </div>
//     );
//   }

//   const handleUserRole = (e) => {
//     e.preventDefault();
//     setUserRole(true);
//   };

//   const handleUserEnhet = (e) => {
//     e.preventDefault();
//     setUserEnhet(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-2xl mb-6 text-blue-500 border border-b-2 border-b-blue-200 pb-3">
//           Uppdatera följande användare
//         </h3>

//         {user && (
//           <form onSubmit={updateUserProfile} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <MainInput
//                 type="text"
//                 name="name"
//                 placeholder="Namn"
//                 label="Namn"
//                 value={user?.name}
//                 changeHandler={changeHandler}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//               <MainInput
//                 type="email"
//                 name="email"
//                 placeholder="E-postadress"
//                 label="E-postadress"
//                 value={user?.email}
//                 changeHandler={changeHandler}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//               <MainInput
//                 type="number"
//                 name="phone"
//                 placeholder="Telefon"
//                 label="Telefon"
//                 value={user?.phone}
//                 changeHandler={changeHandler}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//               <MainInput
//                 type="text"
//                 name="username"
//                 placeholder="Användarnamn"
//                 label="Användarnamn"
//                 value={user?.username}
//                 changeHandler={changeHandler}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />

//               {/* Knappar för att visa roll och enhet */}
//               <div className="col-span-2 flex gap-3">
//                 <button
//                   type="button"
//                   onClick={handleUserRole}
//                   className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition">
//                   Lägg till roll
//                 </button>
//                 {userRole && (
//                   <button
//                     type="button"
//                     onClick={handleUserEnhet}
//                     className="px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition">
//                     Lägg till enhet
//                   </button>
//                 )}
//               </div>

//               {/* Rollfält med ta bort-knapp */}
//               {userRole && (
//                 <div className="md:col-span-2 flex flex-col gap-1 relative">
//                   <button
//                     type="button"
//                     onClick={() => setUserRole(false)}
//                     className="flex items-center gap-1 text-red-600 hover:text-red-800 self-start mb-1">
//                     <HiTrash /> Ta bort roll
//                   </button>
//                   <label
//                     htmlFor="role"
//                     className="block text-sm font-medium text-gray-700 mb-1">
//                     Roll
//                   </label>
//                   <select
//                     multiple
//                     id="role"
//                     name="role"
//                     value={Array.isArray(user?.role) ? user.role : []}
//                     onChange={(e) => {
//                       const selected = Array.from(
//                         e.target.selectedOptions,
//                         (option) => option.value
//                       );
//                       setUser((prev) => ({ ...prev, role: selected }));
//                     }}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
//                     <option value="" disabled>
//                       -- Välj roll --
//                     </option>
//                     {role.map((r, index) => (
//                       <option key={index} value={r}>
//                         {r}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {/* Enhetsfält med ta bort-knapp */}
//               {userEnhet && (
//                 <div className="md:col-span-2 flex flex-col gap-1 relative">
//                   <button
//                     type="button"
//                     onClick={() => setUserEnhet(false)}
//                     className="flex items-center gap-1 text-red-600 hover:text-red-800 self-start mb-1">
//                     <HiTrash /> Ta bort enhet
//                   </button>
//                   <label
//                     htmlFor="unit"
//                     className="block text-sm font-medium text-gray-700 mb-1">
//                     Enhet
//                   </label>
//                   <select
//                     id="unit"
//                     name="unit"
//                     value={user?.unit || ""}
//                     onChange={changeHandler} // bara uppdaterar unit
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
//                     <option value="" disabled>
//                       -- Välj enhet --
//                     </option>
//                     {units.map((u) => (
//                       <option key={u._id} value={u._id}>
//                         {u.name}
//                       </option>
//                     ))}
//                   </select>

//                   {/* UI-varning */}
//                   {user?.unit &&
//                     units
//                       .find((u) => u._id === user.unit)
//                       ?.users?.some((u) =>
//                         Array.isArray(u.role)
//                           ? u.role.includes("Enhetschef")
//                           : u.role === "Enhetschef"
//                       ) && (
//                       <p className="text-sm text-orange-600 mt-1">
//                         ⚠️ Enheten har redan en enhetschef
//                       </p>
//                     )}

//                   {/* <select
//                     id="unit"
//                     name="unit"
//                     value={user?.unit || ""}
//                     onChange={(e) => {
//                       const selectedUnit = units.find(
//                         (u) => u._id === e.target.value
//                       );
//                       if (selectedUnit.role.includes("Enhetschef")) {
//                         alert(
//                           `OBS: den valda enheten ${selectedUnit?.name} har redan enhetschef`
//                         );
//                       }
//                       changeHandler(e);
//                     }}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
//                     <option value="" disabled>
//                       -- Välj enhet --
//                     </option>
//                     {units &&
//                       units?.map((u) => (
//                         <option key={u._id} value={u._id}>
//                           {u.name}
//                         </option>
//                       ))}
//                   </select> */}
//                 </div>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 mt-4  bg-indigo-200  border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-300 transition">
//               Spara
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserProfile;

//changeHandler

function UserProfile() {
  //Error
  const [lastFourError, setLastFourError] = useState("");
  const [clocks, setClocks] = useState([]);
  const params = useParams();
  const userId = params.userId;

  const router = useRouter();
  const roleOptions = [
    "Avdelningschef",
    "Områdeschef",
    "Enhetschef",
    "Flyttstädansvarig",
    "Specialare",
    "Lokalvårdare",
  ];

  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUser, setUserLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showRole, setShowRole] = useState(false);
  const [showUnit, setShowUnit] = useState(false);
  const { fetchUsers } = useFetchUsers();
  const { currentUser } = useFetchCurrentUser();

  // console.log("TEEEEEEEEST");

  // Hämta användare
  const fetchUser = async () => {
    try {
      const data = await getUserById(userId);
      if (!data?.user) return;
      // console.log("Fetched user i user profile:", data);

      const foundUser = data.user;
      if (!foundUser.lastFour) {
        setLastFourError("Användaren saknar kod för stämpling (4 siffror).");
      } else {
        setLastFourError(""); // rensa om den finns
      }
      setUser({
        ...foundUser,
        unit: foundUser.unit?._id || foundUser.unit || "",
        role: Array.isArray(foundUser.role) ? foundUser.role : [],
      });
      setClocks(data.clocks || []);

      // console.log("USER CLOCK POSTER", data.clocks);
      setUserLoading(false);
    } catch (err) {
      setError(err.message || "Kunde inte hämta användare");
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchUser();
  }, [userId]);

  // Hämta enheter
  const fetchUnits = async () => {
    try {
      const foundUnit = await getUnits();
      if (!foundUnit) return;
      setUnits(foundUnit);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Kunde inte hämta enheter");
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();
    setLastFourError(""); // rensa tidigare fel

    try {
      const userInfo = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        lastFour: user.lastFour,
        role: showRole ? user.role : [],
        unit: showUnit ? user.unit : null,
      };

      // Lägg bara till roll om användaren redan har någon eller om showRole är true
      if (showRole || (user.role && user.role.length > 0)) {
        userInfo.role = user.role;
      }

      // Lägg bara till enhet om användaren redan har en enhet eller om showUnit är true
      if (showUnit || user.unit) {
        userInfo.unit = user.unit;
      }

      await updateUser(userId, userInfo);
      await fetchUnits();
      await fetchUsers();
      displaySuccessMessage("Användaren uppdaterats");
      router.push("/dashboard/users");
      // console.log("Uppdaterad användare: ", user);
    } catch (err) {
      const msg = err.response?.data?.message || "Uppdatering misslyckades";
      if (msg && msg.toLowerCase().includes("redan")) {
        setLastFourError(msg);
      } else {
        displayErrorMessage(msg);
      }
      // console.log(err.message);
    }
  };
  if (loadingUser || loading) return <LoadingPage />;
  if (error)
    return (
      <div className="flex justify-center items-center p-5">
        <h5 className="text-red-500">{error}</h5>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl mb-6 text-blue-500 border border-b-2 border-b-blue-200 pb-3">
          Uppdatera följande användare
        </h3>
        {user && (
          <form onSubmit={updateUserProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MainInput
                type="text"
                name="name"
                placeholder="Namn"
                label="Namn"
                value={user.name}
                changeHandler={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <MainInput
                type="email"
                name="email"
                placeholder="E-postadress"
                label="E-postadress"
                value={user.email}
                changeHandler={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <MainInput
                type="number"
                name="phone"
                placeholder="Telefon"
                label="Telefon"
                value={user.phone}
                changeHandler={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <MainInput
                type="text"
                name="username"
                placeholder="Användarnamn"
                label="Användarnamn"
                value={user.username}
                changeHandler={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {/* Kod för att kunna stämpla in/ut */}

              <MainInput
                type="text"
                name="lastFour"
                label="Kod för att kunna stämpla in/ut"
                value={user.lastFour || ""}
                minLength={4}
                maxLength={4}
                exactLengthError={true}
                changeHandler={(e) => {
                  const { name, value } = e.target;
                  // Tillåt endast siffror och max 4 tecken
                  if (/^\d{0,4}$/.test(value)) {
                    setUser((prev) => ({ ...prev, [name]: value }));
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {lastFourError && (
                <p className="text-sm text-red-600 mt-1">{lastFourError}</p>
              )}

              {/* Knappar för att visa roll och enhet */}
              <div className="col-span-2 flex gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowRole(true);
                  }}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition">
                  Lägg till roll
                </button>
                {showRole && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowUnit(true);
                    }}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition">
                    Lägg till enhet
                  </button>
                )}
              </div>

              {/* Rollfält */}
              {showRole && (
                <div className="md:col-span-2 flex flex-col gap-1 relative">
                  <button
                    type="button"
                    onClick={() => setShowRole(false)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 self-start mb-1">
                    <HiTrash /> Ta bort roll
                  </button>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roll
                  </label>
                  <select
                    multiple
                    name="role"
                    value={Array.isArray(user.role) ? user.role : []}
                    onChange={(e) => {
                      const selected = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      setUser((prev) => ({ ...prev, role: selected }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled>
                      -- Välj roll --
                    </option>
                    {roleOptions.map((r, index) => (
                      <option key={index} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Enhetsfält */}
              {showUnit && (
                <div className="md:col-span-2 flex flex-col gap-1 relative">
                  <button
                    type="button"
                    onClick={() => setShowUnit(false)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 self-start mb-1">
                    <HiTrash /> Ta bort enhet
                  </button>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enhet
                  </label>
                  <select
                    name="unit"
                    value={user.unit || ""}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        unit: e.target.value || null,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled>
                      -- Välj enhet --
                    </option>
                    {units.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name}
                      </option>
                    ))}
                  </select>

                  {/* UI-varning */}
                  {user.unit &&
                    user.role?.includes("Enhetschef") &&
                    units
                      .find((u) => u._id === user.unit)
                      ?.users?.some((u) =>
                        Array.isArray(u.role)
                          ? u.role.includes("Enhetschef")
                          : u.role === "Enhetschef"
                      ) && (
                      <p className="text-sm text-orange-600 mt-1 flex items-center gap-1">
                        <HiStop /> Enheten har redan en enhetschef
                      </p>
                    )}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-indigo-200 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-300 transition">
              Spara
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
