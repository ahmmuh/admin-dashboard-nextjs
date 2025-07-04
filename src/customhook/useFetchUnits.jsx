import { getUnits } from "@/backend/api";
import { useEffect, useState } from "react";

export function useFetchUnits() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUnits = async () => {
    try {
      const units = await getUnits();
      if (units.length === 0) {
        console.log("Unit finns inte");
      }
      console.log("Alla hämtade Unit", units);
      setUnits(units);
    } catch (err) {
      console.error("Fel vid hämtning av Unit:", err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  return { units, loading, error };
}
