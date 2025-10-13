// components/guides/machinesGuide.js
export const machinesGuideSteps = [
  {
    element: "#create-machine-btn",
    popover: {
      title: "Lägg till maskin",
      description: "Skapa ny maskin.",
    },
    nextRoute: () => `/dashboard/machineLogs`,
  },
  {
    element: ".machine-item:first-child",
    popover: {
      title: "Maskin",
      description: "Visa maskinstatus och historik.",
    },
  },
];
