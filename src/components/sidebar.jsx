"use client";
import Link from "next/link";

const Sidebar = ({ units }) => {
  console.log("Units from Sidebar", units);

  return (
    <aside className="bg-blue-900 flex flex-col px-5 py-2 w-80 text-gray-400">
      <h4 className="text-2xl my-4">Dashboard</h4>
      <nav className="flex flex-col">
        <ul className="space-y-3">
          {units.map((unit) => (
            <Link href={`/units/${unit._id}`} key={unit._id} className=" ">
              <span className="block text-lg font-medium p-3 border-b-2 text-gray-400 hover:text-pink-600">
                {unit.name}
              </span>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
