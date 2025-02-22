"use client";
import React from "react";

function PersonList({ name, phone, email, children, ...props }) {
  return (
    <ul className="flex flex-col mb-4" {...props}>
      <li className="p-4 border rounded-lg shadow-sm">
        <article>
          {name && (
            <h4 className="text-2xl text-purple-700 font-semibold">{name}</h4>
          )}
          {phone && <p className="text-gray-700 font-medium"> {phone}</p>}
          {email && <p className="text-gray-700 font-medium"> {email}</p>}
        </article>
      </li>
      {children && <li>{children}</li>}
    </ul>
  );
}

export default PersonList;
