"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getUserById } from "@/backend/userAPI";
import LoadingPage from "@/app/loading";

function UserDetail() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  console.log("USER ID", userId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("Ingen användar-ID angiven i URL");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const foundUser = await getUserById(userId);
        if (!foundUser) {
          throw new Error("Användare hittades inte");
        }
        setUser(foundUser);
      } catch (err) {
        setError(err.message || "Något gick fel");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <LoadingPage message="Laddar användardetaljer..." />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <h4 className="text-red-500 text-lg">{error}</h4>
      </div>
    );
  }

  if (user) console.log("USER INFO", user);

  const userWithKeys = user?.keys?.filter(
    (key) => key.status === "checked-out"
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Användaruppgifter
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div>
          <span className="font-semibold">Namn:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold">E-post:</span> {user.email}
        </div>

        <div>
          <span className="font-semibold">Roll:</span> {user.role?.join(", ")}
        </div>
        <div>
          <span className="font-semibold">Antal utlånade nycklar:</span>{" "}
          {userWithKeys ? userWithKeys.length : 0}
        </div>
        {user.createdAt && (
          <div>
            <span className="font-semibold">Skapad:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString("sv-SE")}
          </div>
        )}
        {user.updatedAt && (
          <div>
            <span className="font-semibold">Senast ändrad:</span>{" "}
            {new Date(user.updatedAt).toLocaleDateString("sv-SE")}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetail;
