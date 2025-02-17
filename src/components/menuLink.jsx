import Link from "next/link";
import React from "react";

function MenuLink() {
  const links = [
    { id: 1, name: " Enhet 1", href: "/units" },
    { id: 2, name: " Enhet 2", href: "/units" },
    { id: 3, name: " Enhet 3", href: "/units" },
    { id: 4, name: " Enhet 4", href: "/units" },
    { id: 5, name: " Enhet 5", href: "/units" },
    { id: 6, name: " Enhet 6", href: "/units" },
  ];
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Meny</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.id}
            className="border-b-2 border-solid">
            <span className="block text-lg font-medium text-gray-800 hover:text-blue-600">
              {link.name}
            </span>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default MenuLink;
