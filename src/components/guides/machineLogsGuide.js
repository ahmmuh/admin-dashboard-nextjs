// components/guides/machineLogsGuide.js
export const machineLogsGuideSteps = [
  {
    element: "#search-machine-log",
    popover: {
      title: "Sök loggar",
      description: "Sök i maskinloggar.",
    },
    nextRoute: () => `/dashboard`,
  },
  {
    element: ".machine-log-item:first-child",
    popover: {
      title: "Maskinlogg",
      description: "Visa detaljer i maskinloggen.",
    },
  },
];
