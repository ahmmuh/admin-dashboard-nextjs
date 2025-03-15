import { fetchPlaces } from "@/helper/fetchPlaces";
import React, { useState, useCallback } from "react";

export const useFetchPlaces = () => {
  const [placeResults, setPlaceResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchPlaceData = useCallback(async (query) => {
    if (!query) {
      setPlaceResults([]);
      return;
    }
    setLoading(true);
    try {
      const results = await fetchPlaces(query);
      setPlaceResults(results || []);
    } catch (error) {
      console.error("Error vid hämtning av platser", error.message);
      setPlaceResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { placeResults, loading, fetchPlaceData };
};
