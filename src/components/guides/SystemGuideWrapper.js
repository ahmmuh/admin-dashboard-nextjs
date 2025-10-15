// "use client";
// import { useRouter, usePathname } from "next/navigation";
// import { driver } from "driver.js";
// import "driver.js/dist/driver.css";
// import { dashboardGuideSteps } from "./dashboardGuide";
// import { unitGuideSteps } from "./unitGuide";
// import { getChefGuideSteps } from "./chefGuide";
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
//   const pathname = usePathname(); // t.ex. "/dashboard/units/68445f72ce036da93d05f2c8/chefer"
//   const unitId = pathname.split("/")[3] || ":unitId"; // hämtar unitId från URL
//   const chefId = ""; // chefId behövs ej här

//   const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   const startGuide = () => {
//     const allSteps = [
//       ...dashboardGuideSteps,
//       ...unitGuideSteps,
//       ...getChefGuideSteps(unitId, { _id: chefId }),
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
//           title: "Slut på guiden",
//           description:
//             "Hej! Nu har jag visat dig hela systemet — du kan prova och utforska det själv nu 🎉",
//         },
//       },
//     ];

//     console.log(
//       "TEST GUIDE STARTAR -> här kommer pathname vid navigering till chefsida",
//       pathname
//     );
//     const driverObj = driver({
//       showProgress: true,
//       allowClose: true,
//       overlayOpacity: 0.5,
//       nextBtnText: "Nästa",
//       prevBtnText: "Tillbaka",
//       doneBtnText: "Klar",
//       steps: allSteps,
//       onNextClick: async (element, step) => {
//         const currentStepIndex = allSteps.findIndex((s) => s === step);
//         const nextStep = allSteps[currentStepIndex + 1];
//         const nextRoute = nextStep?.nextRoute || step?.nextRoute;

//         if (nextRoute) {
//           const path =
//             typeof nextRoute === "function"
//               ? nextRoute(unitId, chefId)
//               : nextRoute;

//           if (path) {
//             await router.push(path);
//             await wait(500);
//           }
//         }

//         driverObj.moveNext();
//       },
//     });

//     driverObj.drive();
//   };

//   return (
//     <div className="fixed bottom-6 right-8 z-[9999]">
//       <button
//         onClick={startGuide}
//         className="bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-md hover:bg-indigo-700 transition">
//         🚀 Starta Guide
//       </button>
//     </div>
//   );
// }

// //OK KOD
// "use client";

// import { useRouter, usePathname } from "next/navigation";
// import { driver } from "driver.js";
// import "driver.js/dist/driver.css";

// import { dashboardGuideSteps } from "./dashboardGuide";
// import { unitGuideSteps } from "./unitGuide";
// import { getChefGuideSteps } from "./chefGuide";
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
//   const pathname = usePathname();
//   const unitId = pathname.split("/")[3] || ":unitId";
//   const chefId = ""; // Om du behöver chefId dynamiskt kan du uppdatera här

//   // Väntar på att ett DOM-element finns
//   const waitForElement = async (selector, timeout = 5000) => {
//     const interval = 50;
//     let elapsed = 0;
//     return new Promise((resolve, reject) => {
//       const check = () => {
//         const el = document.querySelector(selector);
//         if (el) return resolve(el);
//         if (elapsed >= timeout)
//           return reject(`Element ${selector} hittades inte`);
//         elapsed += interval;
//         setTimeout(check, interval);
//       };
//       check();
//     });
//   };

//   const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   const startGuide = () => {
//     const allSteps = [
//       ...dashboardGuideSteps,
//       ...unitGuideSteps,
//       ...getChefGuideSteps(unitId, { _id: chefId }),
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
//           title: "Slut på guiden",
//           description:
//             "Hej! Nu har jag visat dig hela systemet — du kan prova och utforska det själv nu 🎉",
//         },
//       },
//     ];

//     const driverObj = driver({
//       showProgress: true,
//       allowClose: true,
//       overlayOpacity: 0.5,
//       nextBtnText: "Nästa",
//       prevBtnText: "Tillbaka",
//       doneBtnText: "Klar",
//       steps: allSteps,
//       onNextClick: async (element, step) => {
//         const currentStepIndex = allSteps.findIndex((s) => s === step);
//         const nextStep = allSteps[currentStepIndex + 1];
//         const nextRoute = nextStep?.nextRoute || step?.nextRoute;

//         if (nextRoute) {
//           const path =
//             typeof nextRoute === "function"
//               ? nextRoute(unitId, chefId)
//               : nextRoute;

//           if (path) {
//             await router.push(path);

//             // Vänta på att elementet på nästa steg finns
//             try {
//               await waitForElement(nextStep.element, 5000);
//               await wait(100); // liten extra delay för säkerhet
//             } catch (err) {
//               console.warn(err);
//             }
//           }
//         }

//         driverObj.moveNext();
//       },
//     });

//     driverObj.drive();
//   };

//   return (
//     <div className="fixed bottom-6 right-8 z-[9999]">
//       <button
//         onClick={startGuide}
//         className="bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-md hover:bg-indigo-700 transition">
//         🚀 Starta Guide
//       </button>
//     </div>
//   );
// }

"use client";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// Importera alla guider
import { dashboardGuideSteps } from "./dashboardGuide";
import { unitGuideSteps } from "./unitGuide";
import { chefGuideSteps } from "./chefGuide";
import { specialistGuideSteps } from "./specialistGuide";
import { unitTasksGuideSteps } from "./unitTasksGuide";
import { unitKeysGuideSteps } from "./unitKeysGuide";
import { keyLogsGuideSteps } from "./keyLogsGuide";
import { timeReportingGuideSteps } from "./timeReportingGuide";
import { workplacesGuideSteps } from "./workplacesGuide";
import { clocksGuideSteps } from "./clocksGuide";
import { machinesGuideSteps } from "./machinesGuide";
import { machineLogsGuideSteps } from "./machineLogsGuide";
import { usePathname } from "next/navigation";
  
export default function SystemGuideWrapper() {
  // const router = useRouter();
  const pathname = usePathname();

  // Identifiera sida
  const getCurrentGuide = () => {
    if (
      pathname.includes("/dashboard/units/") &&
      pathname.includes("/chefer")
    ) {
      return chefGuideSteps;
    }
    if (
      pathname.includes("/dashboard/units/") &&
      pathname.includes("/specialister")
    ) {
      return specialistGuideSteps;
    }
    if (
      pathname.includes("/dashboard/units/") &&
      pathname.includes("/unitTasks")
    ) {
      return unitTasksGuideSteps;
    }
    if (
      pathname.includes("/dashboard/units/") &&
      pathname.includes("/unitKeys")
    ) {
      return unitKeysGuideSteps;
    }
    if (pathname.includes("/dashboard/units")) {
      return unitGuideSteps;
    }
    if (pathname.includes("/dashboard/keyLogs")) {
      return keyLogsGuideSteps;
    }
    if (pathname.includes("/dashboard/timeReporting")) {
      return timeReportingGuideSteps;
    }
    if (pathname.includes("/dashboard/workplaces")) {
      return workplacesGuideSteps;
    }
    if (pathname.includes("/dashboard/clocks")) {
      return clocksGuideSteps;
    }
    if (pathname.includes("/dashboard/machines")) {
      return machinesGuideSteps;
    }
    if (pathname.includes("/dashboard/machineLogs")) {
      return machineLogsGuideSteps;
    }
    // Default till dashboard
    return dashboardGuideSteps;
  };

  const waitForElement = async (selector, timeout = 5000) => {
    const interval = 50;
    let elapsed = 0;
    return new Promise((resolve, reject) => {
      const check = () => {
        const el = document.querySelector(selector);
        if (el) return resolve(el);
        if (elapsed >= timeout)
          return reject(`Element ${selector} hittades inte`);
        elapsed += interval;
        setTimeout(check, interval);
      };
      check();
    });
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const startGuide = () => {
    const steps = getCurrentGuide();

    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      overlayOpacity: 0.5,
      nextBtnText: "Nästa",
      prevBtnText: "Tillbaka",
      doneBtnText: "Klar",
      steps,
      onNextClick: async (element, step) => {
        // Vänta på nästa steg-element
        try {
          await waitForElement(step.element, 5000);
          await wait(100);
        } catch (err) {
          console.warn(err);
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
