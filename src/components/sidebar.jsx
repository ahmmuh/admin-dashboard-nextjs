// "use client";
// import { getWeekNumber } from "@/helper/weekNumber";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBuilding,
//   faCity,
//   faClock,
//   faGear,
//   faPlus,
//   faUsers,
// } from "@fortawesome/free-solid-svg-icons";

// import { usePathname } from "next/navigation";
// import {
//   HiOutlineClock,
//   HiOutlineDocumentText,
//   HiOutlineHome,
//   HiOutlineKey,
//   HiOutlineOfficeBuilding,
//   HiOutlineSparkles,
//   HiOutlineUserGroup,
// } from "react-icons/hi";

// const Sidebar = () => {
//   const pathname = usePathname();

//   const links = [
//     {
//       href: "/dashboard",
//       label: "Start",
//       icon: <HiOutlineHome className="w-5 h-5" />,
//     },
//     {
//       href: "/dashboard/units",
//       label: "Alla enheter",
//       icon: <HiOutlineOfficeBuilding className="w-5 h-5" />,
//     },
//     {
//       href: "/dashboard/apartments",
//       label: "Flyttstädning",
//       icon: <HiOutlineSparkles className="w-5 h-5" />,
//     },
//     {
//       href: "/dashboard/tasks",
//       label: "Att göra",
//       icon: <HiOutlineDocumentText className="w-5 h-5" />,
//     },
//     {
//       href: "/dashboard/keys",
//       label: "Nyckelhantering",
//       icon: <HiOutlineKey className="w-5 h-5" />,
//     },
//     {
//       href: "/dashboard/keyLogs",
//       label: "Nyckelhistorik",
//       icon: <HiOutlineClock className="w-5 h-5" />,
//     },
//     {
//       href: "/dashboard/users",
//       label: "Medarbetare",
//       icon: <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />,
//     },

//     {
//       href: "/dashboard/workplaces",
//       label: "Arbetsplatser",
//       icon: <FontAwesomeIcon icon={faCity} className="w-5 h-5" />,
//     },

//     {
//       href: "/clocks",
//       label: "Stämpla in/ut",
//       icon: <FontAwesomeIcon icon={faClock} className="w-5 h-5" />,
//     },
//     {
//       href: "/dashboard/machines",
//       label: "Maskiner",
//       icon: <FontAwesomeIcon icon={faGear} className="w-5 h-5" />,
//     },
//   ];

//   return (
//     <aside className="fixed top-0 left-0 h-screen w-80 bg-blue-900 text-gray-400 px-5 py-6 overflow-y-auto">
//       <h4 className="text-2xl text-white font-semibold mb-8">
//         <Link href="/dashboard">Översikt</Link>
//       </h4>

//       <nav>
//         <ul className="space-y-4">
//           {links.map((link) => {
//             const isActive =
//               link.href === "/dashboard"
//                 ? pathname === "/dashboard"
//                 : pathname.startsWith(link.href);

//             return (
//               <li
//                 key={link.href}
//                 className={`rounded ${
//                   isActive ? "bg-blue-600 text-white p-1" : ""
//                 }`}>
//                 <Link
//                   href={link.href}
//                   className="flex items-center hover:text-pink-600">
//                   {link.icon}
//                   <span className="text-lg font-medium pl-3">{link.label}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
  HiOutlineKey,
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faClock,
  faGear,
  faKey,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    {
      id: "dashboard-link",
      href: "/dashboard",
      label: "Start",
      icon: <HiOutlineHome className="w-5 h-5" />,
    },
    {
      id: "units-link",
      href: "/dashboard/units",
      label: "Alla enheter",
      icon: <HiOutlineOfficeBuilding className="w-5 h-5" />,
    },
    {
      id: "link-apartments",
      href: "/dashboard/apartments",
      label: "Flyttstädning",
      icon: <HiOutlineSparkles className="w-5 h-5" />,
    },
    {
      id: "link-tasks",
      href: "/dashboard/tasks",
      label: "Att göra",
      icon: <HiOutlineDocumentText className="w-5 h-5" />,
    },
    {
      id: "link-keys",
      href: "/dashboard/keys",
      label: "Nyckelhantering",
      icon: <HiOutlineKey className="w-5 h-5" />,
    },
    {
      id: "link-keys-logs",
      href: "/dashboard/keyLogs",
      label: "Nyckelhistorik",
      icon: <FontAwesomeIcon icon={faKey} className="w-5 h-5" />,
    },
    {
      id: "link-users",
      href: "/dashboard/users",
      label: "Medarbetare",
      icon: <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />,
    },
    {
      id: "link-workplaces",
      href: "/dashboard/workplaces",
      label: "Arbetsplatser",
      icon: <FontAwesomeIcon icon={faCity} className="w-5 h-5" />,
    },
    {
      id: "link-clocks",
      href: "/clocks",
      label: "Stämpla in/ut",
      icon: <FontAwesomeIcon icon={faClock} className="w-5 h-5" />,
    },
    {
      id: "link-machines",
      href: "/dashboard/machines",
      label: "Maskiner",
      icon: <FontAwesomeIcon icon={faGear} className="w-5 h-5" />,
    },
  ];

  return (
    <aside
      id="sidebar"
      className="fixed top-0 left-0 h-screen w-80 bg-blue-900 text-gray-400 px-5 py-6 overflow-y-auto">
      <h4 id="sidebar-title" className="text-2xl text-white font-semibold mb-8">
        <Link href="/dashboard">Översikt</Link>
      </h4>

      <nav>
        <ul className="space-y-4">
          {links.map((link) => {
            const isActive =
              link.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(link.href);

            return (
              <li
                key={link.href}
                id={link.id}
                className={`rounded ${
                  isActive ? "bg-blue-600 text-white p-1" : ""
                }`}>
                <Link
                  href={link.href}
                  className="flex items-center hover:text-pink-600">
                  {link.icon}
                  <span className="text-lg font-medium pl-3">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
