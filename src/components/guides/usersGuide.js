// components/guides/usersGuide.js
export const usersGuideSteps = [
  {
    element: "#create-user-btn",
    popover: {
      title: "Ny användare",
      description: "Skapa ny användare.",
    },
    nextRoute: () => `/dashboard/timeReporting`,
  },
  {
    element: "#search-user-input",
    popover: {
      title: "Sök användare",
      description: "Sök efter användare.",
    },
  },
  {
    element: ".user-card:first-child",
    popover: {
      title: "Visa användare",
      description: "Visa användarens information.",
    },
  },
];
