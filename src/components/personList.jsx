"use client";
import React from "react";

function PersonList({ name, phone, email, role, children, ...props }) {
  return (
    <ul className="flex flex-col mb-4 sm:w-full" {...props}>
      <li className="p-4 border rounded-lg shadow-sm">
        <article>
          {name && (
            <h4 className="text-2xl text-purple-700 font-semibold">
              Namn: {name}
            </h4>
          )}
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
