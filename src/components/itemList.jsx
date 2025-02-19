import React from "react";

function ItemList({
  title,
  description,
  name,
  completed,
  location,
  children,
  ...props
}) {
  return (
    <ul className="flex flex-col mt-4 " {...props}>
      <li className="p-4 border rounded-lg shadow-sm  hover:bg-purple-50 cursor-pointer">
        <article>
          <h4 className="text-2xl text-purple-700 font-semibold">{title}</h4>
          {name && <p className="text-gray-700 font-medium">{name}</p>}
          <p className="text-gray-600">{description}</p>
          <p
            className={
              completed === "Ej påbörjat" ? "text-red-600" : "text-green-600"
            }>
            {completed}
          </p>

          {location && (
            <p className="text-sm text-gray-500">Location: {location}</p>
          )}
        </article>
      </li>
      {children && <li>{children}</li>}
    </ul>
  );
}

export default ItemList;
