"use client";

import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { searchUnits } from "@/backend/api";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

function SearchUnit() {
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
        const data = await searchUnits(query);

        // Filtrera bort eventuella null eller trasiga enheter
        const filtered = (data || []).filter(
          (unit) => unit && unit._id && unit.name
        );
        setResults(filtered);
        setError(null);
      } catch (err) {
        // console.error("Sökfel:", err);
        setError("Kunde inte hämta sökresultat.");
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="w-full mx-auto">
      {/* Sökfält */}
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <FiSearch />
        </span>
        <input
          type="text"
          placeholder="Sök enhet..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-blue-500 pl-10 pr-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Sökresultat */}
      {results.length > 0 ? (
        <ul className="overflow-y-auto max-h-44 space-y-2">
          {results.map((unit) => (
            <li
              key={unit._id}
              className="border p-4 rounded hover:bg-gray-100 transition cursor-pointer">
              <Link
                href={`/dashboard/units/${unit._id}/unitDetail`}
                className="text-blue-600 font-semibold">
                <HiOutlineOfficeBuilding /> {unit.name}
              </Link>
              {unit.description && (
                <p className="text-sm text-gray-600 mt-1">{unit.description}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        query.trim() &&
        !error && <p className="text-red-500">Ingen enhet matchar sökningen.</p>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default SearchUnit;
