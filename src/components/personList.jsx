"use client";
import React from "react";

function PersonList({ unit, name, phone, email, role, children, ...props }) {
  return (
    <ul className="flex flex-col  sm:w-full" {...props}>
      {unit && (
        <h4 className="text-2xl text-blue-500">Enhetschef på {unit} </h4>
      )}
      <li className="p-4 border rounded-lg shadow-sm">
        <article>
          {name && <h6 className=" text-gray-700 font-medium">Namn: {name}</h6>}
          {phone && (
            <p className="text-gray-700 font-medium"> Telefon: {phone}</p>
          )}
          {email && (
            <p className="text-gray-700 font-medium"> E-postadress: {email}</p>
          )}
          {role && <p className="text-gray-700 font-medium"> Roll: {role}</p>}
        </article>
      </li>
      {children && <li>{children}</li>}
    </ul>
  );
}

export default PersonList;
