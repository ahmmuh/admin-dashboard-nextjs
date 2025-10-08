// // "use client";

// // import { addTask } from "@/backend/taskApi";
// // import { useFetchPlaces } from "@/customhook/useFetchPlaces";
// // import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
// // import { useRouter } from "next/navigation";
// // import React, { useState } from "react";

// // function CreateTaskClientComponent() {
// //   const router = useRouter();

// //   const [task, setTask] = useState({
// //     title: "",
// //     location: "",
// //     coordinates: null,
// //     description: "",
// //   });

// //   const { placeResults, loading, fetchPlaceData } = useFetchPlaces();

// //   // Validate form
// //   const isFormValid = () =>
// //     task.title.trim() !== "" && task.description.trim() !== "";

// //   // Hantera input för plats (autocomplete)
// //   const handlePlaceInputChange = (e) => {
// //     const { value } = e.target;
// //     setTask((prev) => ({ ...prev, title: value }));
// //     if (value.length > 1) fetchPlaceData(value); // sök när minst 2 tecken
// //   };

// //   // Hantera textarea
// //   const changeHandler = (e) => {
// //     const { name, value } = e.target;
// //     setTask((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // Submit task
// //   const submitHandler = async (e) => {
// //     e.preventDefault();
// //     if (!isFormValid()) {
// //       displayErrorMessage("Fyll i titel och beskrivning");
// //       return;
// //     }

// //     try {
// //       const newTask = {
// //         title: task.title,
// //         description: task.description,
// //         location: task.location,
// //         coordinates: task.coordinates,
// //       };

// //       // await addTask(newTask);
// //       console.log("NY TASK", newTask);

// //       displaySuccessMessage("Ny task har lagts till!");
// //       setTask({ title: "", location: "", coordinates: null, description: "" });
// //       // router.push("/dashboard/tasks");
// //     } catch (error) {
// //       console.error(`Fel vid skapande av task: ${error.message}`);
// //       displayErrorMessage(`Fel vid skapande av task: ${error.message}`);
// //     }
// //   };

// //   return (
// //     <div className="p-2">
// //       <h4 className="text-2xl text-blue-500 mb-3 ">Skapa morgonjobb</h4>

// //       <form onSubmit={submitHandler}>
// //         {/* Platsinput */}
// //         <div className="mb-3 relative">
// //           <input
// //             className="bg-white w-full p-2 rounded-2xl border"
// //             type="text"
// //             name="title"
// //             placeholder="Ange plats, t.ex. Katedralskolan"
// //             value={task.title}
// //             onChange={handlePlaceInputChange}
// //             autoComplete="off"
// //           />
// //           {loading && <div>Vi hämtar platser åt dig...</div>}

// //           {/* Visa autocomplete-resultat */}
// //           {placeResults.length > 0 && (
// //             <div className="bg-white p-2 rounded-2xl my-2 max-h-60 overflow-y-scroll border absolute z-10 w-full">
// //               {placeResults.map((place, index) => (
// //                 <div
// //                   key={index}
// //                   className="border-b border-purple-600 hover:bg-gray-100 cursor-pointer p-2"
// //                   onClick={() => {
// //                     setTask((prev) => ({
// //                       ...prev,
// //                       title: place.name,
// //                       location: place.adress,
// //                       coordinates: place.coordinates,
// //                     }));
// //                     fetchPlaceData(""); // rensa resultat
// //                   }}>
// //                   {place.name} ({place.adress})
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Beskrivning */}
// //         <div className="mb-3">
// //           <textarea
// //             rows={10}
// //             className="bg-white w-full p-2 rounded-2xl border"
// //             placeholder="Beskriv uppdraget, t.ex. Vi har personalbrist på Katedralskolan och behöver hjälp med två våningar"
// //             name="description"
// //             onChange={changeHandler}
// //             value={task.description}></textarea>
// //         </div>

// //         {/* Submit */}
// //         <button
// //           type="submit"
// //           className="cursor-pointer p-2 w-80 border rounded-2xl bg-indigo-200  border-indigo-300  shadow-sm hover:bg-indigo-300 transition">
// //           Spara
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default CreateTaskClientComponent;

// // "use client";

// // import { addTask } from "@/backend/taskApi";
// // import { useFetchPlaces } from "@/customhook/useFetchPlaces";
// // import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
// // import { useRouter } from "next/navigation";
// // import React, { useState } from "react";

// // function CreateTaskClientComponent() {
// //   const router = useRouter();

// //   const [task, setTask] = useState({
// //     title: "",
// //     location: "",
// //     coordinates: null,
// //     description: "",
// //   });

// //   const { placeResults, loading, fetchPlaceData } = useFetchPlaces();

// //   // Validate form
// //   const isFormValid = () =>
// //     task.title.trim() !== "" &&
// //     task.description.trim() !== "" &&
// //     task.coordinates;

// //   // Hantera input för plats (autocomplete)
// //   const handlePlaceInputChange = (e) => {
// //     const { value } = e.target;
// //     setTask((prev) => ({ ...prev, title: value }));
// //     if (value.length > 1) fetchPlaceData(value); // sök när minst 2 tecken
// //   };

// //   // Hantera textarea
// //   const changeHandler = (e) => {
// //     const { name, value } = e.target;
// //     setTask((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // Submit task
// //   const submitHandler = async (e) => {
// //     e.preventDefault();
// //     if (!isFormValid()) {
// //       displayErrorMessage(
// //         "Fyll i titel, beskrivning och välj en plats med koordinater"
// //       );
// //       return;
// //     }

// //     try {
// //       const newTask = {
// //         title: task.title,
// //         description: task.description,
// //         adress: task.location, // textadressen
// //         location: {
// //           type: "Point",
// //           coordinates: task.coordinates, // [lon, lat]
// //         },
// //       };

// //       await addTask(newTask); // skicka till backend
// //       console.log("NY TASK", newTask);

// //       displaySuccessMessage("Ny task har lagts till!");
// //       setTask({ title: "", location: "", coordinates: null, description: "" });
// //       // router.push("/dashboard/tasks");
// //     } catch (error) {
// //       console.error(`Fel vid skapande av task: ${error.message}`);
// //       displayErrorMessage(`Fel vid skapande av task: ${error.message}`);
// //     }
// //   };

// //   return (
// //     <div className="p-2">
// //       <h4 className="text-2xl text-blue-500 mb-3 ">Skapa morgonjobb</h4>

// //       <form onSubmit={submitHandler}>
// //         {/* Platsinput */}
// //         <div className="mb-3 relative">
// //           <input
// //             className="bg-white w-full p-2 rounded-2xl border"
// //             type="text"
// //             name="title"
// //             placeholder="Ange plats, t.ex. Katedralskolan"
// //             value={task.title}
// //             onChange={handlePlaceInputChange}
// //             autoComplete="off"
// //           />
// //           {loading && <div>Vi hämtar platser åt dig...</div>}

// //           {/* Visa autocomplete-resultat */}
// //           {placeResults.length > 0 && (
// //             <div className="bg-white p-2 rounded-2xl my-2 max-h-60 overflow-y-scroll border absolute z-10 w-full">
// //               {placeResults.map((place, index) => (
// //                 <div
// //                   key={index}
// //                   className="border-b border-purple-600 hover:bg-gray-100 cursor-pointer p-2"
// //                   onClick={() => {
// //                     setTask((prev) => ({
// //                       ...prev,
// //                       title: place.name,
// //                       location: place.adress,
// //                       coordinates: place.coordinates,
// //                     }));
// //                     fetchPlaceData(""); // rensa resultat
// //                   }}>
// //                   {place.name} ({place.adress})
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Beskrivning */}
// //         <div className="mb-3">
// //           <textarea
// //             rows={10}
// //             className="bg-white w-full p-2 rounded-2xl border"
// //             placeholder="Beskriv uppdraget, t.ex. Vi har personalbrist på Katedralskolan och behöver hjälp med två våningar"
// //             name="description"
// //             onChange={changeHandler}
// //             value={task.description}></textarea>
// //         </div>

// //         {/* Submit */}
// //         <button
// //           type="submit"
// //           className="cursor-pointer p-2 w-80 border rounded-2xl bg-indigo-200 border-indigo-300 shadow-sm hover:bg-indigo-300 transition">
// //           Spara
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default CreateTaskClientComponent;

// "use client";

// import { addTask } from "@/backend/taskApi";
// import { useFetchPlaces } from "@/customhook/useFetchPlaces";
// import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// function CreateTaskClientComponent() {
//   const router = useRouter();

//   const [task, setTask] = useState({
//     title: "",
//     address: "", // textadress som användaren skriver eller väljer
//     coordinates: null, // [lon, lat] från autocomplete
//     description: "",
//   });

//   const { placeResults, loading, fetchPlaceData } = useFetchPlaces();

//   // Validera formulär
//   const isFormValid = () =>
//     task.title.trim() !== "" &&
//     task.description.trim() !== "" &&
//     task.coordinates &&
//     task.coordinates.length === 2;

//   // Hantera input för plats (autocomplete)
//   const handlePlaceInputChange = (e) => {
//     const { value } = e.target;
//     setTask((prev) => ({ ...prev, title: value }));
//     if (value.length > 1) fetchPlaceData(value);
//   };

//   // Hantera textarea
//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setTask((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit task
//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!isFormValid()) {
//       displayErrorMessage(
//         "Fyll i titel, beskrivning och välj en plats med koordinater"
//       );
//       return;
//     }

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

//       await addTask(newTask); // skickar till backend
//       console.log("NY TASK", newTask);

//       displaySuccessMessage("Ny task har lagts till!");
//       setTask({ title: "", address: "", coordinates: null, description: "" });
//       router.back();
//     } catch (error) {
//       console.error(`Fel vid skapande av task: ${error.message}`);
//       displayErrorMessage(`Fel vid skapande av task: ${error.message}`);
//     }
//   };

//   return (
//     <div className="p-2">
//       <h4 className="text-2xl text-blue-500 mb-3">Skapa morgonjobb</h4>

//       <form onSubmit={submitHandler}>
//         {/* Platsinput */}
//         <div className="mb-3 relative">
//           <input
//             className="bg-white w-full p-2 rounded-2xl border"
//             type="text"
//             name="title"
//             placeholder="Ange plats, t.ex. Katedralskolan"
//             value={task.title}
//             onChange={handlePlaceInputChange}
//             autoComplete="off"
//           />
//           {loading && <div>Vi hämtar platser åt dig...</div>}

//           {/* Visa autocomplete-resultat */}
//           {placeResults.length > 0 && (
//             <div className="bg-white p-2 rounded-2xl my-2 max-h-60 overflow-y-scroll border absolute z-10 w-full">
//               {placeResults.map((place, index) => (
//                 <div
//                   key={index}
//                   className="border-b border-purple-600 hover:bg-gray-100 cursor-pointer p-2"
//                   onClick={() => {
//                     setTask((prev) => ({
//                       ...prev,
//                       title: place.name,
//                       address: place.adress, // ⚡ textadressen
//                       coordinates: place.coordinates?.map(Number), // ⚡ GeoJSON coordinates
//                     }));
//                     fetchPlaceData(""); // rensa resultat
//                   }}>
//                   {place.name} ({place.adress})
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Beskrivning */}
//         <div className="mb-3">
//           <textarea
//             rows={10}
//             className="bg-white w-full p-2 rounded-2xl border"
//             placeholder="Beskriv uppdraget, t.ex. Vi har personalbrist på Katedralskolan och behöver hjälp med två våningar"
//             name="description"
//             onChange={changeHandler}
//             value={task.description}></textarea>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="cursor-pointer p-2 w-80 border rounded-2xl bg-indigo-200 border-indigo-300 shadow-sm hover:bg-indigo-300 transition">
//           Spara
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateTaskClientComponent;

// "use client";

// import { addTask } from "@/backend/taskApi";
// import { useFetchPlaces } from "@/customhook/useFetchPlaces";
// import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// function CreateTaskClientComponent() {
//   const router = useRouter();

//   const [task, setTask] = useState({
//     title: "",
//     address: "", // textadress
//     coordinates: null, // [lon, lat]
//     description: "",
//   });

//   const [showResults, setShowResults] = useState(false);

//   const { placeResults, loading, fetchPlaceData } = useFetchPlaces();

//   // Validera formulär
//   const isFormValid = () =>
//     task.title.trim() !== "" &&
//     task.description.trim() !== "" &&
//     task.coordinates &&
//     task.coordinates.length === 2;

//   // Hantera input för plats (autocomplete)
//   const handlePlaceInputChange = (e) => {
//     const { value } = e.target;
//     setTask((prev) => ({ ...prev, title: value }));

//     if (value.length > 1) {
//       fetchPlaceData(value);
//       setShowResults(true);
//     } else {
//       setShowResults(false);
//     }
//   };

//   // Hantera textarea
//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setTask((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit task
//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!isFormValid()) {
//       displayErrorMessage(
//         "Fyll i titel, beskrivning och välj en plats med koordinater"
//       );
//       return;
//     }

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

//       await addTask(newTask);
//       displaySuccessMessage("Ny task har lagts till!");
//       setTask({ title: "", address: "", coordinates: null, description: "" });
//       router.back();
//     } catch (error) {
//       console.error(`Fel vid skapande av task: ${error.message}`);
//       displayErrorMessage(`Fel vid skapande av task: ${error.message}`);
//     }
//   };

//   return (
//     <div className="p-2">
//       <h4 className="text-2xl text-blue-500 mb-3">Skapa morgonjobb</h4>

//       <form onSubmit={submitHandler}>
//         {/* Platsinput */}
//         <div className="mb-3 relative">
//           <input
//             className="bg-white w-full p-2 rounded-2xl border"
//             type="text"
//             name="title"
//             placeholder="Ange plats, t.ex. Katedralskolan"
//             value={task.title}
//             onChange={handlePlaceInputChange}
//             autoComplete="off"
//             onFocus={() => task.title.length > 1 && setShowResults(true)}
//             onBlur={() => setTimeout(() => setShowResults(false), 150)}
//           />

//           {loading && <div>Vi hämtar platser åt dig...</div>}

//           {/* Visa autocomplete-resultat */}
//           {showResults && placeResults.length > 0 && (
//             <div className="bg-white p-2 rounded-2xl my-2 max-h-60 overflow-y-scroll border absolute z-10 w-full">
//               {placeResults.map((place, index) => (
//                 <div
//                   key={index}
//                   className="border-b border-purple-600 hover:bg-gray-100 cursor-pointer p-2"
//                   onClick={() => {
//                     setTask((prev) => ({
//                       ...prev,
//                       title: place.name,
//                       address: place.adress,
//                       coordinates: place.coordinates?.map(Number),
//                     }));
//                     setShowResults(false);
//                   }}>
//                   {place.name} ({place.adress})
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Beskrivning */}
//         <div className="mb-3">
//           <textarea
//             rows={10}
//             className="bg-white w-full p-2 rounded-2xl border"
//             placeholder="Beskriv uppdraget, t.ex. Vi har personalbrist på Katedralskolan och behöver hjälp med två våningar"
//             name="description"
//             onChange={changeHandler}
//             value={task.description}></textarea>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="cursor-pointer p-2 w-80 border rounded-2xl bg-indigo-200 border-indigo-300 shadow-sm hover:bg-indigo-300 transition">
//           Spara
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateTaskClientComponent;

// "use client";

// import { addTask } from "@/backend/taskApi";
// import { useFetchPlaces } from "@/customhook/useFetchPlaces";
// import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// function CreateTaskClientComponent() {
//   const router = useRouter();

//   const [task, setTask] = useState({
//     title: "",
//     address: "",
//     coordinates: null, // [lon, lat]
//     description: "",
//   });

//   const [showResults, setShowResults] = useState(false);

//   const { placeResults, loading, fetchPlaceData } = useFetchPlaces();

//   // Validering
//   const isFormValid = () =>
//     task.title.trim() !== "" &&
//     task.description.trim() !== "" &&
//     task.coordinates &&
//     task.coordinates.length === 2;

//   // Hantera platsinput
//   const handlePlaceInputChange = (e) => {
//     const { value } = e.target;
//     setTask((prev) => ({ ...prev, title: value }));

//     if (value.length > 1) {
//       fetchPlaceData(value);
//       setShowResults(true);
//     } else {
//       setShowResults(false);
//     }
//   };

//   // Hantera textarea
//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setTask((prev) => ({ ...prev, [name]: value }));
//   };

//   // Skicka formulär
//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const newTask = {
//         title: task.title,
//         description: task.description,
//         address: task.address,
//         location: {
//           type: "Point",
//           coordinates: task.coordinates?.map(Number), // [lon, lat]
//         },
//       };

//       await addTask(newTask);
//       displaySuccessMessage("Ny task har lagts till!");
//       setTask({ title: "", address: "", coordinates: null, description: "" });
//       router.back();
//     } catch (error) {
//       console.error(`Fel vid skapande av task: ${error.message}`);
//       displayErrorMessage(`Fel vid skapande av task: ${error.message}`);
//     }
//   };

//   return (
//     <div className="p-2">
//       <h4 className="text-2xl text-blue-500 mb-3">Skapa morgonjobb</h4>

//       <form onSubmit={submitHandler}>
//         {/* Platsinput */}
//         <div className="mb-3 relative">
//           <input
//             className="bg-white w-full p-2 rounded-2xl border"
//             type="text"
//             name="title"
//             placeholder="Ange plats, t.ex. Katedralskolan"
//             value={task.title}
//             onChange={handlePlaceInputChange}
//             autoComplete="off"
//             onFocus={() => task.title.length > 1 && setShowResults(true)}
//             onBlur={() => setTimeout(() => setShowResults(false), 150)}
//           />

//           {loading && <div>Vi hämtar platser åt dig...</div>}

//           {/* Visa autocomplete-resultat */}
//           {showResults && placeResults.length > 0 && (
//             <div className="bg-white p-2 rounded-2xl my-2 max-h-60 overflow-y-scroll border absolute z-10 w-full">
//               {placeResults.map((place, index) => (
//                 <div
//                   key={index}
//                   className="border-b border-purple-600 hover:bg-gray-100 cursor-pointer p-2"
//                   onClick={() => {
//                     // ✅ Hämta koordinater automatiskt från OSM-resultatet
//                     setTask((prev) => ({
//                       ...prev,
//                       title: place.name || place.display_name,
//                       address: place.display_name || place.name,
//                       coordinates: [
//                         parseFloat(place.lon),
//                         parseFloat(place.lat),
//                       ],
//                     }));
//                     setShowResults(false);
//                   }}>
//                   {place.display_name || place.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Beskrivning */}
//         <div className="mb-3">
//           <textarea
//             rows={10}
//             className="bg-white w-full p-2 rounded-2xl border"
//             placeholder="Beskriv uppdraget, t.ex. Vi har personalbrist på Katedralskolan och behöver hjälp med två våningar"
//             name="description"
//             onChange={changeHandler}
//             value={task.description}></textarea>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="cursor-pointer p-2 w-80 border rounded-2xl bg-indigo-200 border-indigo-300 shadow-sm hover:bg-indigo-300 transition">
//           Spara
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateTaskClientComponent;

"use client";

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
            onBlur={() => setTimeout(() => setShowResults(false), 150)}
          />

          {loading && (
            <p className="text-gray-500 mt-1">Laddar arbetsplatser...</p>
          )}

          {/* Visa matchande arbetsplatser */}
          {showResults && filteredWorkplaces.length > 0 && (
            <div className="bg-white p-2 rounded-2xl my-2 max-h-60 overflow-y-scroll border absolute z-10 w-full">
              {filteredWorkplaces.map((wp) => (
                <div
                  key={wp._id}
                  className="border-b border-indigo-300 hover:bg-gray-100 cursor-pointer p-2"
                  onClick={() => {
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
              ))}
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
