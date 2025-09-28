import { useState } from "react";

export default function ClockInOut() {
  const [numbers, setNumbers] = useState([]); // här sparas varje siffra

  const handleClick = (num) => {
    if (numbers.length < 4) {
      setNumbers([...numbers, num]);
    }
  };

  const handleClear = () => setNumbers([]);

  const handleSubmit = (type) => {
    if (numbers.length === 4) {
      const lastFour = numbers.join(""); // ex: "1234"
      console.log(type, lastFour);

      // Skicka till API
      fetch(`/api/clock/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastFour }),
      });

      setNumbers([]); // rensa efter stämpling
    } else {
      alert("Fyll i 4 siffror!");
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-10">
      <div className="text-center text-2xl mb-4">
        {numbers.join("") || "____"}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
          <button
            key={n}
            onClick={() => handleClick(n)}
            className="p-4 bg-gray-200 rounded text-xl">
            {n}
          </button>
        ))}
      </div>

      <div className="flex justify-between mb-4">
        <button
          onClick={handleClear}
          className="p-2 bg-red-500 text-white rounded">
          Rensa
        </button>
        <button
          onClick={() => handleSubmit("in")}
          className="p-2 bg-green-500 text-white rounded">
          Stämpla in
        </button>
        <button
          onClick={() => handleSubmit("out")}
          className="p-2 bg-blue-500 text-white rounded">
          Stämpla ut
        </button>
      </div>
    </div>
  );
}
