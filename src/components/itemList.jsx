"use client";
import { getUnitByID } from "@/backend/api";
import React, { useEffect, useState } from "react";

function ItemList({
  title,
  description,
  name,
  completed,
  enhet,
  icon,
  Uppdaterats,
  children,
  ...props
}) {
  console.log("ENHET ID: ", enhet);

  const [takerUnit, setTakerUnit] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function findTakerUnit() {
      try {
        const foundedUnit = await getUnitByID(enhet);
        if (!foundedUnit) return;
        console.log("Founed Unit", foundedUnit);
        setTakerUnit(foundedUnit);
      } catch (error) {
        console.warn("WARNING", error.message);
      }
    }
    findTakerUnit();
  }, [enhet]);

  return (
    <>
      {loading && <div>Loading ...</div>}
      <ul className="flex flex-col mt-4 " {...props}>
        <li className="p-4 border rounded-lg shadow-sm  hover:bg-purple-50 cursor-pointer">
          <article>
            <h4 className="text-2xl text-purple-700 font-semibold">{title}</h4>
            {name && <p className="text-gray-700 font-medium">{name}</p>}
            <p className="text-gray-600">{description}</p>

            <div>
              {completed === "Ej påbörjat" && (
                <p className="text-red-600 text-md font-bold">{completed}</p>
              )}
              {completed === "Färdigt" && (
                <p className="text-gray-600 ">
                  <>
                    <span>
                      Datum: {new Date(Uppdaterats).toLocaleString()}{" "}
                    </span>{" "}
                    <br />
                    <span>Uppdaterad av {takerUnit.name}</span> <br />
                    <span className="text-green-500 font-bold">
                      Status: {completed}
                    </span>
                  </>
                </p>
              )}

              {completed === "Påbörjat" && (
                <p className="text-gray-500 text-md">
                  <span>Datum: {new Date(Uppdaterats).toLocaleString()} </span>{" "}
                  <br />
                  <span>Uppdaterad av {takerUnit.name}</span> <br />
                  <span className="text-orange-500 text-md font-bold">
                    Status: {completed}
                  </span>
                </p>
              )}
            </div>
          </article>
        </li>
        {children && <li>{children}</li>}
      </ul>
    </>
  );
}

export default ItemList;
