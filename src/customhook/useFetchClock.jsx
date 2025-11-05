"use client";

import { getActiveUsers } from "@/backend/clockAPI";
import { useState, useEffect } from "react";

export const useFetchClock = () => {
  const [clocks, setClocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClocks = async () => {
    try {
      setLoading(true);
      const data = await getActiveUsers();
      setClocks(data?.activeClocks || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClocks();
  }, []);

  return { clocks, loading, error, refetch: fetchClocks };
};
