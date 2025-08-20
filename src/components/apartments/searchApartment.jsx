"use client";

import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { searchApartments } from "@/backend/apartmentAPI";

function SearchApartment() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const data = await searchApartments(query);
        setResults(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Kunde inte hämta sökresultat.");
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="w-full mx-auto">
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <FiSearch />
        </span>
        <input
          type="text"
          placeholder="Sök lägenhet..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-blue-500 pl-10 pr-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {results && results.length > 0 ? (
        <ul className="overflow-y-auto h-44 ">
          {results &&
            results.map((apt) => (
              <li
                key={apt._id}
                className="border p-4 rounded hover:bg-gray-100 transition cursor-pointer">
                <Link
                  href={`/dashboard/apartments/${apt._id}`}
                  className="text-blue-600 font-semibold">
                  🏠 {apt.apartmentLocation}
                </Link>
                <p className="text-sm text-gray-600">
                  Tilldelad: {apt.assignedUnit?.name || "Ingen"} | Status:{" "}
                  <span
                    className={
                      apt.status === "Ej påbörjat"
                        ? "text-red-500"
                        : apt.status === "Påbörjat"
                        ? "text-orange-500"
                        : "text-green-600"
                    }>
                    {apt.status}
                  </span>
                </p>
              </li>
            ))}
        </ul>
      ) : (
        query.trim() && (
          <p className="text-red-500">Ingen lägenhet matchar sökningen.</p>
        )
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default SearchApartment;
