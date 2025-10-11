// "use client";

// import { driver } from "driver.js";
// import "driver.js/dist/driver.css";

// export default function UnitPageGuide() {
//   const startGuide = () => {
//     const driverObj = driver({
//       showProgress: true,
//       nextBtnText: "Nästa",
//       prevBtnText: "Tillbaka",
//       doneBtnText: "Klar",
//       steps: [
//         {
//           element: "#units-title",
//           popover: {
//             title: "Alla enheter",
//             description: "Här ser du alla enheter i systemet.",
//           },
//         },
//         {
//           element: "#search-unit-section",
//           popover: {
//             title: "Sök enhet",
//             description: "Sök efter en specifik enhet genom namn eller chef.",
//           },
//         },
//         {
//           element: "#create-unit-btn",
//           popover: {
//             title: "Skapa enhet",
//             description: "Klicka här för att skapa en ny enhet.",
//           },
//         },
//         {
//           element: "[id^='unit-card-']",
//           popover: {
//             title: "Enhetskort",
//             description:
//               "Varje kort visar en enhet med dess chefer, specialister, uppgifter och nycklar.",
//           },
//         },
//         {
//           element: "[id^='link-specialare']",
//           popover: {
//             title: "Specialare",
//             description: "Här visas alla specialare kopplade till enheten.",
//           },
//         },
//         {
//           element: "[id^='link-att-göra']",
//           popover: {
//             title: "Att göra",
//             description: "Visa alla aktuella städuppgifter för enheten.",
//           },
//         },
//         {
//           element: "[id^='link-nycklar']",
//           popover: {
//             title: "Nycklar",
//             description:
//               "Här hanterar du nycklar som är kopplade till enheten.",
//           },
//         },
//       ],
//     });

//     driverObj.drive();
//   };

//   return (
//     <button
//       onClick={startGuide}
//       className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
//       Starta guide
//     </button>
//   );
// }

"use client";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useRouter } from "next/navigation";

export default function UnitPageGuide({ nextGuide }) {
  const router = useRouter();

  const startGuide = () => {
    const driverObj = driver({
      showProgress: true,
      nextBtnText: "Nästa",
      prevBtnText: "Tillbaka",
      doneBtnText: "Klar",
      steps: [
        {
          element: "#units-title",
          popover: {
            title: "Alla enheter",
            description: "Här ser du alla enheter i systemet.",
          },
        },
        {
          element: "#search-unit-section",
          popover: {
            title: "Sök enhet",
            description: "Sök efter en specifik enhet genom namn eller chef.",
          },
        },
        {
          element: "#create-unit-btn",
          popover: {
            title: "Skapa enhet",
            description: "Klicka här för att skapa en ny enhet.",
          },
        },
        {
          element: "[id^='unit-card-']",
          popover: {
            title: "Enhetskort",
            description:
              "Varje kort visar en enhet med dess chefer, specialister, uppgifter och nycklar.",
          },
        },
        {
          element: "[id^='link-specialare']",
          popover: {
            title: "Specialare",
            description: "Här visas alla specialare kopplade till enheten.",
          },
        },
        {
          element: "[id^='link-att-göra']",
          popover: {
            title: "Att göra",
            description: "Visa alla aktuella städuppgifter för enheten.",
          },
        },
        {
          element: "[id^='link-nycklar']",
          popover: {
            title: "Nycklar",
            description:
              "Här hanterar du nycklar som är kopplade till enheten.",
          },
        },
      ],
      onClose: () => {
        // Kör callback när guiden är klar
        if (nextGuide) nextGuide();
      },
    });

    driverObj.drive();
  };

  return (
    <button
      onClick={startGuide}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
      Starta guide
    </button>
  );
}
