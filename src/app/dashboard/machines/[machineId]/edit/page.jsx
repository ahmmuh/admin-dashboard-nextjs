// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { useFetchMachines, editMachine } from "@/customhook/useFetchMachine";
// import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
// import LoadingPage from "@/app/loading";

// export default function EditMachinePage() {
//   const { machineId } = useParams();
//   const router = useRouter();
//   const {
//     machines,
//     editMachine,
//     loading: machinesLoading,
//   } = useFetchMachines();

//   const [form, setForm] = useState({
//     name: "",
//     unitName: "",
//     isAvailable: true,
//   });
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     if (!machinesLoading && machines) {
//       const machine = machines.find((m) => m._id === machineId);
//       if (machine) {
//         setForm({
//           name: machine.name || "",
//           unitName: machine.unitId?.name || "-", // 👈 visa enhetens namn
//           isAvailable: machine.isAvailable ?? true,
//         });
//         setNotFound(false);
//       } else {
//         setNotFound(true);
//       }
//       setLoading(false);
//     }
//   }, [machines, machinesLoading, machineId]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Skickar data till updateMachine:", form);

//     try {
//       await editMachine(machineId, {
//         name: form.name,
//         isAvailable: form.isAvailable,
//       });
//       displaySuccessMessage("Maskin uppdaterad ✅");
//       router.push("/dashboard/machines");
//     } catch (err) {
//       console.error(err);
//       displayErrorMessage("Kunde inte uppdatera maskinen ❌");
//     }
//   };

//   if (machinesLoading || loading)
//     return <LoadingPage message="Hämtar användare..." />;

//   if (notFound)
//     return (
//       <p className="text-red-500">
//         ❌ Ingen maskin hittades med id: {machineId}
//       </p>
//     );

//   return (
//     <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold mb-8 text-center">Redigera maskin</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Namn */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Namn</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 text-lg"
//             required
//           />
//         </div>

//         {/* Enhet (readonly namn) */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Enhet</label>
//           <input
//             type="text"
//             value={form.unitName}
//             readOnly
//             className="w-full border rounded px-4 py-2 text-lg bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         {/* Status */}
//         <div className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             name="isAvailable"
//             checked={form.isAvailable}
//             onChange={handleChange}
//             className="h-5 w-5"
//           />
//           <label className="text-lg">Tillgänglig</label>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-4 pt-6">
//           <button
//             type="button"
//             onClick={() => router.push("/dashboard/machines")}
//             className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-lg text-lg">
//             Avbryt
//           </button>
//           <button
//             type="submit"
//             className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg">
//             Spara ändringar
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFetchMachines } from "@/customhook/useFetchMachine";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import LoadingPage from "@/app/loading";

export default function EditMachinePage() {
  const { machineId } = useParams();
  const router = useRouter();
  const {
    machines,
    editMachine,
    loading: machinesLoading,
  } = useFetchMachines();

  const [form, setForm] = useState({
    name: "",
    unitName: "",
  });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!machinesLoading && machines) {
      const machine = machines.find((m) => m._id === machineId);
      if (machine) {
        setForm({
          name: machine.name || "",
          unitName: machine.unitId?.name || "-",
        });
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }
  }, [machines, machinesLoading, machineId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Skickar data till updateMachine:", form);

    try {
      await editMachine(machineId, {
        name: form.name,
      });
      displaySuccessMessage("Maskin uppdaterad ✅");
      router.push("/dashboard/machines");
    } catch (err) {
      console.error(err);
      displayErrorMessage("Kunde inte uppdatera maskinen ❌");
    }
  };

  if (machinesLoading || loading)
    return <LoadingPage message="Hämtar användare..." />;

  if (notFound)
    return (
      <p className="text-red-500">
        ❌ Ingen maskin hittades med id: {machineId}
      </p>
    );

  return (
    <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Redigera maskin</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Namn */}
        <div>
          <label className="block text-sm font-medium mb-2">Namn</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 text-lg"
            required
          />
        </div>

        {/* Enhet (readonly namn) */}
        <div>
          <label className="block text-sm font-medium mb-2">Enhet</label>
          <input
            type="text"
            value={form.unitName}
            readOnly
            className="w-full border rounded px-4 py-2 text-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => router.push("/dashboard/machines")}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-lg text-lg">
            Avbryt
          </button>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg">
            Spara ändringar
          </button>
        </div>
      </form>
    </div>
  );
}
