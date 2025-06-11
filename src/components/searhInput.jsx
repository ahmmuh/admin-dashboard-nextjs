import React, { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";

function SearchInput({
  type = "text",
  placeholder = "Sök...",
  onSearch,
  delay = 300, // debounce delay i ms
  name,
  className = "",
}) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // Debounce-funktionalitet
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [inputValue, delay]);

  // När debounce-värdet ändras, anropa sökfunktionen
  useEffect(() => {
    if (onSearch) onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const clearInput = () => {
    setInputValue("");
    setDebouncedValue("");
    if (onSearch) onSearch("");
  };

  return (
    <div className={`my-6 w-full ${className}`}>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <FiSearch />
        </span>
        {inputValue && (
          <button
            onClick={clearInput}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500"
            type="button"
            aria-label="Rensa sökfält">
            <FiX />
          </button>
        )}
        <input
          type={type}
          name={name}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10 py-2 border border-orange-300 rounded-md w-full 
                     focus:outline-none focus:ring-2 focus:ring-orange-200 
                     focus:border-orange-300 placeholder-gray-400 shadow-sm"
        />
      </div>
    </div>
  );
}

export default SearchInput;
