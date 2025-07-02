"use client";
import { getUnitByID } from "@/backend/api";
import React, { useEffect, useState } from "react";

function ItemList({
  title,
  description,
  name,
  status,
  icon,
  task,
  updatedAt,
  createdAt,
  children,
  ...props
}) {
  // console.log("ENHET ID: ", enhet);

  const [takerUnit, setTakerUnit] = useState({});
  const [loading, setLoading] = useState(false);
  // console.log("Enhet i Itemlist ", enhet);
  useEffect(() => {
    async function findTakerUnit() {
      try {
        const foundedUnit = await getUnitByID(task.unit);
        if (!foundedUnit) return;
        console.log("Founed Unit", foundedUnit);
        setTakerUnit(foundedUnit);
      } catch (error) {
        console.warn("WARNING", error.message);
      }
    }
    findTakerUnit();
  }, [task.unit]);

  return (
    <>
      {loading && <div>Loading ...</div>}
      <ul className="flex flex-col my-6 " {...props}>
        <li className="p-4 border rounded-lg shadow-sm  hover:bg-purple-50 cursor-pointer">
          <article>
            <h4 className="text-2xl text-purple-700 font-semibold">{title}</h4>
            {name && <p className="text-gray-700 font-medium">{name}</p>}
            <p className="text-gray-600">{description}</p>

            <div>
              {status === "Ej påbörjat" && (
                <>
                  <span>Skapades: {new Date(createdAt).toLocaleString()} </span>{" "}
                  <p className="text-red-600 text-md font-bold">
                    Status: {status}
                  </p>
                </>
              )}
              {status === "Färdigt" && (
                <p className="text-gray-600 ">
                  <>
                    <span>Uppdaterad av {takerUnit.name}</span> <br />
                    <span>
                      Datum: {new Date(updatedAt).toLocaleString()}{" "}
                    </span>{" "}
                    <br />
                    <span className="text-green-500 font-bold">
                      Status: {status}
                    </span>
                  </>
                </p>
              )}

              {status === "Påbörjat" && (
                <p className="text-gray-500 text-md">
                  <span>Uppdaterad av {takerUnit.name}</span> <br />
                  <span>
                    Datum: {new Date(updatedAt).toLocaleString()}{" "}
                  </span>{" "}
                  <br />
                  <span className="text-orange-500 text-md font-bold">
                    Status: {status}
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
