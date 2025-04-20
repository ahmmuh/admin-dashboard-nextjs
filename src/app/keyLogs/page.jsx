"use client";
import { getKeyLogs } from "@/backend/keyAPI";
import React, { useEffect, useState } from "react";

function KeyLogPage() {
  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchLogs() {
    try {
      const logData = await getKeyLogs();
      console.log("KEY LOG DATA", logData);
      setLogs(logData);
      setLoading(false);
    } catch (error) {
      console.error("Error vid hämtning av KEY LOGS");
      setLoading(false);
      setError(error);
      fetchLogs();
    }
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <h5>Loading .....</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-red-600 p-10">
        <h4 className="text-2xl text-white-500">Error</h4>
      </div>
    );
  }

  return <div>Key Log Page</div>;
}

export default KeyLogPage;
