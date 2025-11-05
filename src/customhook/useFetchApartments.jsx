"use client";

import { getApartments } from "@/backend/apartmentAPI";
import { useState, useEffect } from "react";

export const useFetchApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      const data = await getApartments();
      setApartments(data || []);
      console.log("Apartments", data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  return { apartments, loading, error, refetch: fetchApartments };
};
