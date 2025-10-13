// components/guides/timeReportingGuide.js
export const timeReportingGuideSteps = [
  {
    element: "#select-user",
    popover: {
      title: "Välj användare",
      description: "Välj användare för tidrapport.",
    },
    nextRoute: () => `/dashboard/workplaces`,
  },
  {
    element: "#date-from",
    popover: {
      title: "Från datum",
      description: "Välj startdatum.",
    },
  },
  {
    element: "#date-to",
    popover: {
      title: "Till datum",
      description: "Välj slutdatum.",
    },
  },
];
