"use client";
import Link from "next/link";
import {
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineKey,
  HiOutlineOfficeBuilding,
  HiOutlineSparkles,
  HiOutlineUserGroup,
} from "react-icons/hi";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-80 bg-blue-900 text-gray-400 px-5 py-6 overflow-y-auto">
      <h4 className="text-2xl text-white font-semibold mb-8">
        <Link href="/dashboard">Översikt</Link>
      </h4>

      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center hover:text-pink-600">
              <HiOutlineHome className="w-5 h-5" />
              <span className="text-lg font-medium pl-3">Start</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/units"
              className="flex items-center hover:text-pink-600">
              <HiOutlineOfficeBuilding className="w-5 h-5" />
              <span className="text-lg font-medium pl-3">Alla enheter</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/apartments"
              className="flex items-center hover:text-pink-600">
              <HiOutlineSparkles className="w-5 h-5" />
              <span className="text-lg font-medium pl-3">Flyttstädning</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/tasks"
              className="flex items-center hover:text-pink-600">
              <HiOutlineDocumentText className="w-5 h-5" />
              <span className="text-lg font-medium pl-3">Att göra</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/keys"
              className="flex items-center hover:text-pink-600">
              <HiOutlineKey className="w-5 h-5" />
              <span className="text-lg font-medium pl-3">Nyckelhantering</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/keyLogs"
              className="flex items-center hover:text-pink-600">
              <HiOutlineClock className="w-5 h-5" />
              <span className="text-lg font-medium pl-3">Nyckelhistorik</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/users"
              className="flex items-center hover:text-pink-600">
              <HiOutlineUserGroup className="w-5 h-5" />
              <span className="text-lg font-medium pl-3">Medarbetare</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
