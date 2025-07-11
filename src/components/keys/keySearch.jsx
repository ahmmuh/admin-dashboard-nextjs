import React, { useState, useEffect } from "react";
import { searchKeys } from "@/backend/keyAPI";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

function KeySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const data = await searchKeys(query);
        setResults(data);
        setError(null);
      } catch (err) {
        setResults([]);
        setError(err.message);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="w-full mx-auto">
      {/* Input + ikon wrapper */}
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <FiSearch />
        </span>
        <input
          type="text"
          placeholder="Sök nyckel..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-blue-500 pl-10 pr-4 py-2 w-full rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}

      <ul className={` ${results.length > 0 ? "overflow-y-scroll h-44" : ""}`}>
        {results.map((key) => (
          <li key={key._id} className="border border-b-purple-600 pb-3">
            🔑{" "}
            <strong>
              <Link
                href={`/dashboard/${key.unit}/unitKeys`}
                className="text-blue-600 ">
                {key.keyLabel}
              </Link>
            </strong>{" "}
            ({key.location})
          </li>
        ))}
      </ul>
      {results.length === 0 && query.trim() && (
        <p className="text-red-500 mt-3">Ingen nyckel matchar sökningen.</p>
      )}
    </div>
  );
}

export default KeySearch;
