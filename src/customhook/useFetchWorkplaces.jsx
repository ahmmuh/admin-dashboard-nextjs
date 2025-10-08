"use client";

import { useEffect, useState } from "react";
import { getAllWorkPlaces } from "@/backend/workplaceAPI";

export const useFetchWorkplaces = () => {
  const [workplaces, setWorkplaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkplaces = async () => {
    try {
      setLoading(true);
      const data = await getAllWorkPlaces();
      setWorkplaces(data || []);
    } catch (err) {
      console.error("Fel vid hämtning av arbetsplatser:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkplaces();
  }, []);

  return { workplaces, loading, error };
};
