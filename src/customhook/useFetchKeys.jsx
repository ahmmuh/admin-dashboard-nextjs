// hooks/useFetchKeys.js (eller .ts om du använder TypeScript)
import { useEffect, useState } from "react";
import { getAllKeys } from "@/backend/keyAPI";

export function useFetchKeys() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const keyList = await getAllKeys();
        if (keyList.length === 0) {
          console.log("Nycklar finns inte");
        }
        console.log("Alla hämtade nycklar", keyList);
        setKeys(keyList);
      } catch (err) {
        console.error("Fel vid hämtning av nycklar:", err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKeys();
  }, []);

  return { keys, loading, error };
}
