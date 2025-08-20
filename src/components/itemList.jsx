"use client";
import LoadingPage from "@/app/loading";
import { getUnitByID } from "@/backend/api";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
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
  console.log("Enhet i Itemlist ", task?.unit);

  return (
    <>
      {/* {loading && <div>Loading ...</div>} */}
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
                    <span>Uppdaterad av {task?.unit?.name}</span> <br />
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
                  <span>Uppdaterad av {task?.unit?.name}</span> <br />
                  <span className="text-orange-500 text-md font-bold">
                    Status: {status}
                    <span className="text-gray-400 text-sm">
                      {""} | Senast ändrad:{" "}
                      {new Date(updatedAt).toLocaleString()}{" "}
                    </span>
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
