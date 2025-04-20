"use client";
import Link from "next/link";

const Sidebar = ({ units }) => {
  console.log("Units from Sidebar", units);

  return (
    <aside className="bg-blue-900 flex flex-col  px-5 py-2 w-80 min-h-screen  text-gray-400">
      <h4 className="text-2xl my-4">
        <Link href={`/dashbiard`}>Dashboard</Link>
      </h4>
      <nav className="flex flex-col">
        <ul className="space-y-3">
          <Link href={"/dashboard"}>
            <span className="block text-lg font-medium p-3 border-b-2 text-gray-400 hover:text-pink-600">
              Start
            </span>
          </Link>
          <Link href={"/units"}>
            <span className="block text-lg font-medium p-3 border-b-2 text-gray-400 hover:text-pink-600">
              Alla enheter
            </span>
          </Link>

          <Link href={"/apartments"}>
            <span className="block text-lg font-medium p-3 border-b-2 text-gray-400 hover:text-pink-600">
              Lägenheter (Flytstäd)
            </span>
          </Link>
          <Link href={"/keys"}>
            <span className="block text-lg font-medium p-3 border-b-2 text-gray-400 hover:text-pink-600">
              Nyckel hantering
            </span>
          </Link>
          <Link href={"/keyLogs"}>
            <span className="block text-lg font-medium p-3 border-b-2 text-gray-400 hover:text-pink-600">
              Nyckel loggar
            </span>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
