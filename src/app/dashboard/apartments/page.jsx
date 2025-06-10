"use client";
import { getApartments } from "@/backend/apartmentAPI";
import ApartmentList from "@/components/apartments/apartmentList";
import React, { useEffect, useState } from "react";

function ApartmentPage() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const apartmentList = await getApartments();

        setApartments(apartmentList || []);
        setLoading(false);
      } catch (error) {
        console.log("Error", error.message);
        setLoading(false);
        setError(error);
      }
    };

    fetchApartments();
  }, []);
  // const apartments = await getApartments();
  console.log("Apartments i ApartmentPage", apartments);

  //Loading

  if (loading) {
    return (
      <div className="flex justify-center items-center p-5">
        <p className="text-2xl font-bold">Loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-5">
        <p className="text-2xl font-bold">{error.message}</p>
      </div>
    );
  }

  if (apartments.length === 0) {
    return (
      <div className="flex justify-center items-center p-5">
        <p>Det finns inga lägenheter att visa just nu.</p>
      </div>
    );
  }

  return <ApartmentList apartments={apartments} />;
}

export default ApartmentPage;
