"use client";

import Loading from "@/app/loading";
import { getUnits } from "@/backend/api";
import { getUserById } from "@/backend/userAPI";
import MainInput from "@/components/input";
import { displaySuccessMessage } from "@/helper/toastAPI";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function UserProfile() {
  const params = useParams();
  const userId = params.userId;
  console.log("User ID i UserProfile", userId);

  const router = useRouter();
  const roles = ["Chef", "Specialist"];
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUser, setUserLoading] = useState(true);

  const [error, setError] = useState(null);
  const [userError, setUserError] = useState(null);

  const [user, setUser] = useState(null);

  //   name: "",
  // email: "",
  // phone: "",
  // username: "",
  // password: "",
  // role: "",
  // unit: "",

  // Fetch USER

  const fetchUser = async () => {
    try {
      const foundUser = await getUserById(userId);
      console.log("Found user before:  if (!foundUser) return;", foundUser);
      if (!foundUser) return;

      console.log("Found user", foundUser);
      setUser({
        ...foundUser,
        unit: foundUser.unit?._id || foundUser.unit,
      });
      setUserLoading(false);
    } catch (error) {
      console.log("Error", error);
      setUserError(error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    console.log("Running fetchUser useEffect...");
    fetchUser();
  }, [userId]);

  console.log("FOUND USER ", user);
  const fetchUnits = async () => {
    try {
      const foundUnit = await getUnits();
      if (!foundUnit) return;

      console.log("Found Unit", foundUnit);
      setUnits(foundUnit);
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
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
        password: user.password,
        role: user.role,
        unit: user?.unit,
      };
      displaySuccessMessage("Användaren uppdaterats");
      router.push("/dashboard/");
    } catch (error) {
      console.error("Uppdatering misslyckades", error);
    }
  };

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center">
        <h4 className="text-blue-400">Hämtar användare ....</h4>
      </div>
    );
  }

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center p-5">
  //       <h5 className="text-red-500">{error}</h5>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Uppdatera användare
        </h2>

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

              <div className="md:col-span-2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Roll
                </label>
                <select
                  id="role"
                  name="role"
                  value={user?.role}
                  onChange={changeHandler}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="" disabled>
                    -- Välj roll --
                  </option>
                  {roles.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lägg till en användare i en ENHET */}

              <div className="md:col-span-2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Enhet
                </label>
                <select
                  id="unit"
                  name="unit"
                  value={user?.unit}
                  onChange={changeHandler}
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
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-green-300 text-black rounded-md hover:bg-green-400 transition">
              Spara
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
