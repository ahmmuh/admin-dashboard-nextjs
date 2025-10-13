// "use client";
// import React from "react";
// import { driver } from "driver.js";
// import "driver.js/dist/driver.css";
// import { useRouter } from "next/navigation";

// // importera alla guide-moduler
// import { dashboardGuideSteps } from "./dashboardGuide";
// import { unitGuideSteps } from "./unitGuide";
// import { chefGuideSteps } from "./chefGuide";
// import { specialistGuideSteps } from "./specialistGuide";
// import { unitTasksGuideSteps } from "./unitTasksGuide";
// import { unitKeysGuideSteps } from "./unitKeysGuide";
// import { keyLogsGuideSteps } from "./keyLogsGuide";
// import { usersGuideSteps } from "./usersGuide";
// import { timeReportingGuideSteps } from "./timeReportingGuide";
// import { workplacesGuideSteps } from "./workplacesGuide";
// import { clocksGuideSteps } from "./clocksGuide";
// import { machinesGuideSteps } from "./machinesGuide";
// import { machineLogsGuideSteps } from "./machineLogsGuide";

// export default function SystemGuideWrapper() {
//   const router = useRouter();

//   const startGuide = () => {
//     const allSteps = [
//       ...dashboardGuideSteps,
//       ...unitGuideSteps,
//       ...chefGuideSteps,
//       ...specialistGuideSteps,
//       ...unitTasksGuideSteps,
//       ...unitKeysGuideSteps,
//       ...keyLogsGuideSteps,
//       ...usersGuideSteps,
//       ...timeReportingGuideSteps,
//       ...workplacesGuideSteps,
//       ...clocksGuideSteps,
//       ...machinesGuideSteps,
//       ...machineLogsGuideSteps,
//       {
//         element: "body",
//         popover: {
//           title: "Slut på guiden 🎉",
//           description:
//             "Hej! Nu har jag visat dig hela systemet — du kan prova och utforska det själv nu.",
//         },
//       },
//     ];

//     const tour = driver({
//       showProgress: true,
//       allowClose: true,
//       overlayOpacity: 0.5,
//       nextBtnText: "Nästa",
//       prevBtnText: "Tillbaka",
//       doneBtnText: "Klar",
//       steps: allSteps,
//       // När användaren klickar nästa: navigera om nextRoute finns
//       onNextClick: async (el, step) => {
//         try {
//           const nextRoute = step?.nextRoute;
//           if (typeof nextRoute === "function") {
//             // anropa utan args — våra nextRoute-funktioner har fallback-värden
//             const path = nextRoute();
//             if (path) await router.push(path);
//           }
//         } catch (err) {
//           // ignorera navigationsfel — tour fortsätter
//           // console.error("Guide navigation error:", err);
//         }
//       },
//     });

//     tour.drive();
//   };

//   return (
//     <div className="fixed bottom-6 right-8 z-50">
//       <button
//         onClick={startGuide}
//         id="start-system-guide-btn"
//         className="bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-md hover:bg-indigo-700 transition">
//         🚀 Starta Guide
//       </button>
//     </div>
//   );
// }

"use client";
import { useRouter } from "next/navigation";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { dashboardGuideSteps } from "./dashboardGuide";
import { unitGuideSteps } from "./unitGuide";
import { chefGuideSteps } from "./chefGuide";
import { specialistGuideSteps } from "./specialistGuide";
import { unitTasksGuideSteps } from "./unitTasksGuide";
import { unitKeysGuideSteps } from "./unitKeysGuide";
import { keyLogsGuideSteps } from "./keyLogsGuide";
import { usersGuideSteps } from "./usersGuide";
import { timeReportingGuideSteps } from "./timeReportingGuide";
import { workplacesGuideSteps } from "./workplacesGuide";
import { clocksGuideSteps } from "./clocksGuide";
import { machinesGuideSteps } from "./machinesGuide";
import { machineLogsGuideSteps } from "./machineLogsGuide";

export default function SystemGuideWrapper() {
  const router = useRouter();

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const startGuide = () => {
    const allSteps = [
      ...dashboardGuideSteps,
      ...unitGuideSteps,
      ...chefGuideSteps,
      ...specialistGuideSteps,
      ...unitTasksGuideSteps,
      ...unitKeysGuideSteps,
      ...keyLogsGuideSteps,
      ...usersGuideSteps,
      ...timeReportingGuideSteps,
      ...workplacesGuideSteps,
      ...clocksGuideSteps,
      ...machinesGuideSteps,
      ...machineLogsGuideSteps,
      {
        element: "body",
        popover: {
          title: "Slut på guiden",
          description:
            "Hej! Nu har jag visat dig hela systemet — du kan prova och utforska det själv nu 🎉",
        },
      },
    ];

    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      overlayOpacity: 0.5,
      nextBtnText: "Nästa",
      prevBtnText: "Tillbaka",
      doneBtnText: "Klar",
      steps: allSteps,

      // 👇 detta hanterar klick på "Nästa"
      onNextClick: async (element, step, driverInstance) => {
        const currentStepIndex = allSteps.findIndex((s) => s === step);
        const nextStep = allSteps[currentStepIndex + 1];
        const nextRoute = nextStep?.nextRoute || step?.nextRoute;

        if (nextRoute) {
          if (typeof nextRoute === "function") {
            const path = nextRoute();
            if (path) {
              await router.push(path);
              await wait(1000);
            }
          } else if (typeof nextRoute === "string") {
            await router.push(nextRoute);
            await wait(1000);
          }
        }

        driverObj.moveNext();
      },
    });

    driverObj.drive();
  };

  return (
    <div className="fixed bottom-6 right-8 z-[9999]">
      <button
        onClick={startGuide}
        className="bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-md hover:bg-indigo-700 transition">
        🚀 Starta Guide
      </button>
    </div>
  );
}
