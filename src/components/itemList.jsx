"use client";
import React from "react";

function ItemList({
  title,
  description,
  name,
  address,
  status,
  icon,
  task,
  updatedAt,
  createdAt,
  children,
  ...props
}) {
  // console.log("Enhet i Itemlist ", task?.unit);

  return (
    <>
      {/* {loading && <div>Loading ...</div>} */}
      <ul className="bg-white flex flex-col my-6 " {...props}>
        <li className="p-4 border rounded-lg shadow-sm  hover:bg-gray-50 cursor-pointer">
          <article>
            <h4 className=" text-purple-700 font-semibold">{title}</h4>
            {name && <p className="text-gray-700 font-medium">{name}</p>}
            {address && <p className="text-gray-700 font-medium ">{address}</p>}
            <p>Tilldelad: {task?.unit?.name}</p>

            <p className="text-gray-600">{description}</p>

            <div>
              {status === "Ej påbörjat" && (
                <>
                  <span className="text-gray-500 text-sm">
                    Skapad: {new Date(createdAt).toLocaleString("sv-SE")}{" "}
                  </span>{" "}
                  <p className="text-red-600 text-md font-bold">
                    Status: {status}
                  </p>
                </>
              )}
              {status === "Färdigt" && (
                <p className="text-gray-600 ">
                  <>
                    <span>Uppdaterad av {task?.unit?.name}</span> <br />
                    <span className="text-gray-500 text-sm">
                      Senast ändrad:{" "}
                      {new Date(updatedAt).toLocaleString("sv-SE")}{" "}
                    </span>{" "}
                    <br />
                    <span className="text-green-500 text-md font-bold">
                      Status: {status}
                    </span>
                  </>
                </p>
              )}

              {status === "Påbörjat" && (
                <p className="text-gray-500">
                  <span>Uppdaterad av {task?.unit?.name}</span> <br />
                  <span className="text-gray-500 text-sm">
                    {""} Senast ändrad:{" "}
                    {new Date(updatedAt).toLocaleString("sv-SE")}{" "}
                  </span>
                  <br />
                  <span className=" text-orange-500 text-md font-bold">
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
