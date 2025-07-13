import React, { useState, useEffect } from "react";
import { searchKeys } from "@/backend/keyAPI";
import { FiSearch } from "react-icons/fi";
import KeyModal from "../modals/keyModal";

function KeySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleKeyClick = (key) => {
    setSelectedKey(key);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full mx-auto">
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

      <ul
        className={`mt-4 ${
          results.length > 0 ? "overflow-y-scroll h-44" : ""
        }`}>
        {results.map((key) => (
          <li
            key={key._id}
            onClick={() => handleKeyClick(key)}
            className="border-b border-purple-600 pb-3 cursor-pointer hover:bg-gray-100 px-2">
            🔑 <strong className="text-blue-600">{key.keyLabel}</strong>{" "}
            <span className="text-sm text-gray-500">({key.location})</span>
          </li>
        ))}
      </ul>

      {results.length === 0 && query.trim() && (
        <p className="text-red-500 mt-3">Ingen nyckel matchar sökningen.</p>
      )}

      {isModalOpen && selectedKey && (
        <KeyModal
          keyLabel={selectedKey.keyLabel}
          // keyType={selectedKey.keyType}
          location={selectedKey.location}
          unit={selectedKey.unit}
          status={selectedKey.status}
          createdAt={selectedKey.createdAt}
          updatedAt={selectedKey.updatedAt}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default KeySearch;
