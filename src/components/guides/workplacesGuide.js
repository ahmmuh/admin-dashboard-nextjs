// components/guides/workplacesGuide.js
export const workplacesGuideSteps = [
  {
    element: "#create-workplace-btn",
    popover: {
      title: "Skapa arbetsplats",
      description: "Skapa ny arbetsplats.",
    },
    nextRoute: () => `/dashboard/clocks`,
  },
  {
    element: "#search-workplace-input",
    popover: {
      title: "Sök arbetsplats",
      description: "Sök arbetsplats.",
    },
  },
  {
    element: ".workplace-card:first-child",
    popover: {
      title: "Visa arbetsplats",
      description: "Visa arbetsplatsinformation.",
    },
  },
];
