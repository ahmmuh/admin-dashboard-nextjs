// components/guides/unitKeysGuide.js
export const unitKeysGuideSteps = [
  {
    element: ".key-item:first-child",
    popover: {
      title: "Nyckel",
      description: "Visar nyckel kopplad till enheten.",
    },
    nextRoute: () => `/dashboard/keyLogs`,
  },
];
