"use client";
import LoadingPage from "@/app/loading";
import { getApartmentByID } from "@/backend/apartmentAPI";
import React, { useEffect, useState } from "react";

function ApartmentDetail({ params }) {
  const { apartmentId } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apartment, setApartment] = useState(null);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const foundApartment = await getApartmentByID(apartmentId);
        if (!foundApartment) {
          throw new Error("Lägenhet hittades inte");
        }
        setApartment(foundApartment);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Något gick fel");
        setLoading(false);
      }
    };

    fetchApartment();
  }, [apartmentId]);

  if (loading) {
    return <LoadingPage message="Laddar lägenhetsdetaljer." />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <h4 className="text-red-500 text-lg">{error}</h4>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Lägenhetsinformation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div>
          <span className="font-semibold">Adress:</span>{" "}
          {apartment.apartmentLocation}
        </div>

        <div
          className={`font-semibold ${
            apartment.status === "Ej påbörjat"
              ? "text-red-500"
              : apartment.status === "Påbörjat"
              ? "text-orange-500"
              : "text-green-600"
          }`}>
          <span>Status:</span> {apartment.status}
        </div>

        <div>
          <span className="font-semibold">Startdatum:</span>{" "}
          {new Date(apartment.startDate).toLocaleDateString("sv-SE")}
        </div>
        <div>
          <span className="font-semibold">Slutdatum:</span>{" "}
          {new Date(apartment.endDate).toLocaleDateString("sv-SE")}
        </div>
        <div>
          <span className="font-semibold">Prioritet:</span> {apartment.priority}
        </div>
        <div>
          <span className="font-semibold">Nyckelplats:</span>{" "}
          {apartment.keyLocation}
        </div>
        <div className="md:col-span-2">
          <span className="font-semibold">Beskrivning:</span>
          <p className="mt-1 text-gray-600">{apartment.description}</p>
        </div>
      </div>
      {apartment.status === "Ej påbörjat" && (
        <div className="mt-6 text-sm text-gray-500">
          <p>Skapad: {new Date(apartment.createdAt).toLocaleString("sv-SE")}</p>
        </div>
      )}

      {apartment.status === "Påbörjat" && apartment.status === "Färdigt" && (
        <div className="mt-6 text-sm text-gray-500">
          <p>
            Senast uppdaterad:{" "}
            {new Date(apartment.updatedAt).toLocaleString("sv-SE")}
          </p>
        </div>
      )}
    </div>
  );
}

export default ApartmentDetail;
