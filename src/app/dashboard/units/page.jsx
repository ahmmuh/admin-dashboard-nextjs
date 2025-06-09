import { getUnits } from "@/backend/api";
import MainCard from "@/components/maincard";
import Link from "next/link";
import {
  HiOutlineKey,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";

async function UnitPage({ params }) {
  const units = await getUnits();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-10 border-b-4 border-purple-200 pb-3">
        Alla enheter
      </h1>

      <div className="flex flex-col gap-8">
        {units &&
          units.map((unit) => {
            const chefer = unit.users?.filter((user) => user.role === "Chef");
            const specialister = unit.users?.filter(
              (user) => user.role === "Specialist"
            );

            return (
              <MainCard key={unit._id} title={unit.name}>
                <div className="flex flex-col divide-y divide-gray-300">
                  {chefer.length > 0 && (
                    <CardRow
                      label="Chef"
                      icon={
                        <HiOutlineUser className="text-purple-500 w-5 h-5" />
                      }
                      href={`/dashboard/units/${unit._id}/chefer`}
                      text={chefer.map((c) => c.name).join(", ")}
                    />
                  )}

                  {specialister.length > 0 && (
                    <CardRow
                      icon={
                        <HiOutlineUserGroup className="text-purple-500 w-5 h-5" />
                      }
                      href={`/dashboard/units/${unit._id}/specialister`}
                      text={"Specialister"}
                    />
                  )}

                  <CardRow
                    icon={
                      <HiOutlineClipboardList className="text-purple-500 w-5 h-5" />
                    }
                    href={`/dashboard/tasks`}
                    text="Att göra"
                  />

                  <CardRow
                    label="Nycklar"
                    icon={<HiOutlineKey className="text-purple-500 w-5 h-5" />}
                    href={`/dashboard/keys`}
                    text={`${unit.keys.length} st`}
                  />

                  <CardRow
                    label="Objekt"
                    icon={
                      <HiOutlineOfficeBuilding className="text-purple-500 w-5 h-5" />
                    }
                    href={`/dashboard/units/${unit._id}/workplaces`}
                    text="Mina objekt"
                  />
                </div>
              </MainCard>
            );
          })}
      </div>
    </div>
  );
}

function CardRow({ label, icon, href, text }) {
  return (
    <div className="py-4 flex items-center gap-3 group">
      {icon}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          {label}
        </span>
        <Link href={href}>
          <span className="text-md font-semibold text-gray-900 group-hover:text-purple-600 transition">
            {text}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default UnitPage;
