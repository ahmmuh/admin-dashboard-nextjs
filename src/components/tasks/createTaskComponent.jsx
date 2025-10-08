// "use client";

// import LoadingPage from "@/app/loading";
// import { addTask } from "@/backend/taskApi";
// import { useFetchWorkplaces } from "@/customhook/useFetchWorkplaces";
// import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// function CreateTaskClientComponent() {
//   const router = useRouter();
//   const { workplaces, loading } = useFetchWorkplaces();

//   const [task, setTask] = useState({
//     title: "",
//     address: "",
//     coordinates: null,
//     description: "",
//   });

//   const [filteredWorkplaces, setFilteredWorkplaces] = useState([]);
//   const [showResults, setShowResults] = useState(false);

//   // Sök bland sparade arbetsplatser
//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setTask((prev) => ({ ...prev, title: value }));

//     if (value.trim().length > 0) {
//       const results = workplaces.filter((wp) =>
//         wp.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredWorkplaces(results);
//       setShowResults(true);
//     } else {
//       setFilteredWorkplaces([]);
//       setShowResults(false);
//     }
//   };

//   // Beskrivning
//   const handleDescriptionChange = (e) => {
//     setTask((prev) => ({ ...prev, description: e.target.value }));
//   };

//   // Skicka formuläret
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const newTask = {
//         title: task.title,
//         description: task.description,
//         address: task.address,
//         location: {
//           type: "Point",
//           coordinates: task.coordinates?.map(Number),
//         },
//       };

//       console.log("NY TASK:", newTask);
//       await addTask(newTask);
//       displaySuccessMessage("Ny task har lagts till!");
//       setTask({ title: "", address: "", coordinates: null, description: "" });
//       router.back();
//     } catch (error) {
//       console.error("Fel vid skapande av task:", error.message);
//       displayErrorMessage(`Fel vid skapande av task: ${error.message}`);
//     }
//   };

//   const isFormValid =
//     task.title.trim() !== "" &&
//     task.description.trim() !== "" &&
//     task.coordinates &&
//     task.coordinates.length === 2;

//   return (
//     <div className="p-2">
//       <h4 className="text-2xl text-blue-500 mb-3">Skapa morgonjobb</h4>

//       <form onSubmit={handleSubmit}>
//         {/* Sök bland arbetsplatser */}
//         <div className="mb-3 relative">
//           <input
//             className="bg-white w-full p-2 rounded-2xl border"
//             type="text"
//             name="title"
//             placeholder="Sök efter arbetsplats..."
//             value={task.title}
//             onChange={handleSearch}
//             autoComplete="off"
//             onFocus={() => setShowResults(true)}
//           />

//           {loading && <LoadingPage message="Laddar arbetsplatser..." />}

//           {/* Visa matchande arbetsplatser */}
//           {showResults && filteredWorkplaces.length > 0 && (
//             <div className="bg-white p-2 rounded-2xl my-2 max-h-60 overflow-y-scroll border absolute z-10 w-full shadow-md">
//               {filteredWorkplaces.map((wp) => (
//                 <div
//                   key={wp._id}
//                   className="border-b border-indigo-300 hover:bg-indigo-100 cursor-pointer p-2 transition"
//                   onMouseDown={() => {
//                     setTask({
//                       title: wp.name,
//                       address: wp.address || "",
//                       coordinates: wp.location?.coordinates || null,
//                       description: "",
//                     });
//                     setShowResults(false);
//                   }}>
//                   <p className="font-semibold">{wp.name}</p>
//                   {wp.address && (
//                     <p className="text-sm text-gray-500">{wp.address}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Visa vald adress */}
//         {task.address && (
//           <p className="text-sm text-gray-700 mb-2">
//             📍 <strong>Adress:</strong> {task.address}
//           </p>
//         )}

//         {/* Beskrivning */}
//         <div className="mb-3">
//           <textarea
//             rows={8}
//             className="bg-white w-full p-2 rounded-2xl border"
//             placeholder="Beskriv uppdraget..."
//             name="description"
//             onChange={handleDescriptionChange}
//             value={task.description}></textarea>
//         </div>

//         {/* Spara */}
//         <button
//           type="submit"
//           disabled={!isFormValid}
//           className="cursor-pointer p-2 w-80 border rounded-2xl bg-indigo-200 border-indigo-300 shadow-sm hover:bg-indigo-300 transition disabled:bg-gray-200">
//           Spara
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateTaskClientComponent;

"use client";

import LoadingPage from "@/app/loading";
import { addTask } from "@/backend/taskApi";
import { useFetchWorkplaces } from "@/customhook/useFetchWorkplaces";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function CreateTaskClientComponent() {
  const router = useRouter();
  const { workplaces, loading } = useFetchWorkplaces();

  const [task, setTask] = useState({
    title: "",
    address: "",
    coordinates: null,
    description: "",
  });

  const [filteredWorkplaces, setFilteredWorkplaces] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Sök bland sparade arbetsplatser
  const handleSearch = (e) => {
    const value = e.target.value;
    setTask((prev) => ({ ...prev, title: value }));

    if (value.trim().length > 0) {
      const results = workplaces.filter((wp) =>
        wp.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredWorkplaces(results);
      setShowResults(true);
    } else {
      setFilteredWorkplaces([]);
      setShowResults(false);
    }
  };

  // Beskrivning
  const handleDescriptionChange = (e) => {
    setTask((prev) => ({ ...prev, description: e.target.value }));
  };

  // Skicka formuläret
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTask = {
        title: task.title,
        description: task.description,
        address: task.address,
        location: {
          type: "Point",
          coordinates: task.coordinates?.map(Number),
        },
      };

      console.log("NY TASK:", newTask);
      await addTask(newTask);
      displaySuccessMessage("Ny task har lagts till!");
      setTask({ title: "", address: "", coordinates: null, description: "" });
      router.back();
    } catch (error) {
      console.error("Fel vid skapande av task:", error.message);
      displayErrorMessage(`Fel vid skapande av task: ${error.message}`);
    }
  };

  const isFormValid =
    task.title.trim() !== "" &&
    task.description.trim() !== "" &&
    task.coordinates &&
    task.coordinates.length === 2;

  return (
    <div className="p-2">
      <h4 className="text-2xl text-blue-500 mb-3">Skapa morgonjobb</h4>

      <form onSubmit={handleSubmit}>
        {/* Sök bland arbetsplatser */}
        <div className="mb-3 relative">
          <input
            className="bg-white w-full p-2 rounded-2xl border"
            type="text"
            name="title"
            placeholder="Sök efter arbetsplats..."
            value={task.title}
            onChange={handleSearch}
            autoComplete="off"
            onFocus={() => setShowResults(true)}
          />

          {loading && <LoadingPage message="Laddar arbetsplatser..." />}

          {/* Visa matchande arbetsplatser eller fallback */}
          {showResults && (
            <div className="bg-white p-2 rounded-2xl my-2 max-h-60 overflow-y-scroll border absolute z-10 w-full shadow-md">
              {filteredWorkplaces.length > 0 ? (
                filteredWorkplaces.map((wp) => (
                  <div
                    key={wp._id}
                    className="border-b border-indigo-300 hover:bg-indigo-100 cursor-pointer p-2 transition"
                    onMouseDown={() => {
                      setTask({
                        title: wp.name,
                        address: wp.address || "",
                        coordinates: wp.location?.coordinates || null,
                        description: "",
                      });
                      setShowResults(false);
                    }}>
                    <p className="font-semibold">{wp.name}</p>
                    {wp.address && (
                      <p className="text-sm text-gray-500">{wp.address}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-2 text-center text-sm text-gray-500">
                  Ingen arbetsplats hittades.{" "}
                  <button
                    type="button"
                    className="text-blue-600 underline hover:text-blue-800"
                    onMouseDown={() =>
                      router.push("/dashboard/workplaces/create")
                    }>
                    Skapa ny arbetsplats
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Visa vald adress */}
        {task.address && (
          <p className="text-sm text-gray-700 mb-2">
            📍 <strong>Adress:</strong> {task.address}
          </p>
        )}

        {/* Beskrivning */}
        <div className="mb-3">
          <textarea
            rows={8}
            className="bg-white w-full p-2 rounded-2xl border"
            placeholder="Beskriv uppdraget..."
            name="description"
            onChange={handleDescriptionChange}
            value={task.description}></textarea>
        </div>

        {/* Spara */}
        <button
          type="submit"
          disabled={!isFormValid}
          className="cursor-pointer p-2 w-80 border rounded-2xl bg-indigo-200 border-indigo-300 shadow-sm hover:bg-indigo-300 transition disabled:bg-gray-200">
          Spara
        </button>
      </form>
    </div>
  );
}

export default CreateTaskClientComponent;
