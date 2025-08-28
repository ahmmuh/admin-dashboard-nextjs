import { getPlaces } from "@/backend/openStreetMapPlaceApi";
import { useState, useCallback } from "react";

export const useFetchPlaces = () => {
  const [placeResults, setPlaceResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlaceData = useCallback(async (query) => {
    setLoading(true);
    try {
      const results = await getPlaces(query);
      setPlaceResults(results);
    } catch (error) {
      console.error("Fel vid hämtning av platser:", error.message);
      setPlaceResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { placeResults, loading, fetchPlaceData };
};
