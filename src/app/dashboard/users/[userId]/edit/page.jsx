"use client";

import LoadingPage from "@/app/loading";
import { getUnits, updateUser } from "@/backend/api";
import { getUserById } from "@/backend/userAPI";
import MainInput from "@/components/input";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import { displaySuccessMessage } from "@/helper/toastAPI";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";

function UserProfile() {
  const params = useParams();
  const userId = params.userId;

  const router = useRouter();
  const role = [
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
  const [userError, setUserError] = useState(null);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(false);
  const [userEnhet, setUserEnhet] = useState(false);

  const { currentUser } = useFetchCurrentUser();

  // Hämta användare
  const fetchUser = async () => {
    try {
      const foundUser = await getUserById(userId);
      if (!foundUser) return;
      setUser({
        ...foundUser,
        unit: foundUser.unit?._id || foundUser.unit,
      });
      setUserLoading(false);
    } catch (error) {
      setUserError(error);
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
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();
    try {
      const userInfo = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        role: user.role,
        unit: user?.unit,
      };
      await updateUser(userId, userInfo);
      displaySuccessMessage("Användaren uppdaterats");
      router.push("/dashboard/users");
    } catch (error) {
      console.error("Uppdatering misslyckades", error);
    }
  };

  if (loadingUser) {
    return <LoadingPage />;
  }

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-5">
        <h5 className="text-red-500">{error}</h5>
      </div>
    );
  }

  const handleUserRole = (e) => {
    e.preventDefault();
    setUserRole(true);
  };

  const handleUserEnhet = (e) => {
    e.preventDefault();
    setUserEnhet(true);
  };

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
                value={user?.name}
                changeHandler={changeHandler}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <MainInput
                type="email"
                name="email"
                placeholder="E-postadress"
                label="E-postadress"
                value={user?.email}
                changeHandler={changeHandler}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <MainInput
                type="number"
                name="phone"
                placeholder="Telefon"
                label="Telefon"
                value={user?.phone}
                changeHandler={changeHandler}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <MainInput
                type="text"
                name="username"
                placeholder="Användarnamn"
                label="Användarnamn"
                value={user?.username}
                changeHandler={changeHandler}
                className="w-full p-2 border border-gray-300 rounded-md"
              />

              {/* Knappar för att visa roll och enhet */}
              <div className="col-span-2 flex gap-3">
                <button
                  type="button"
                  onClick={handleUserRole}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition">
                  Lägg till roll
                </button>
                {userRole && (
                  <button
                    type="button"
                    onClick={handleUserEnhet}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition">
                    Lägg till enhet
                  </button>
                )}
              </div>

              {/* Rollfält med ta bort-knapp */}
              {userRole && (
                <div className="md:col-span-2 flex flex-col gap-1 relative">
                  <button
                    type="button"
                    onClick={() => setUserRole(false)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 self-start mb-1">
                    <HiTrash /> Ta bort roll
                  </button>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Roll
                  </label>
                  <select
                    multiple
                    id="role"
                    name="role"
                    value={Array.isArray(user?.role) ? user.role : []}
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
                    {role.map((r, index) => (
                      <option key={index} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Enhetsfält med ta bort-knapp */}
              {userEnhet && (
                <div className="md:col-span-2 flex flex-col gap-1 relative">
                  <button
                    type="button"
                    onClick={() => setUserEnhet(false)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 self-start mb-1">
                    <HiTrash /> Ta bort enhet
                  </button>
                  <label
                    htmlFor="unit"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Enhet
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    value={user?.unit || ""}
                    onChange={changeHandler}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled>
                      -- Välj enhet --
                    </option>
                    {units &&
                      units?.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4  bg-indigo-200  border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-300 transition">
              Spara
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
