export const dashboardGuideSteps = [
  {
    element: "#dashboard-link",
    popover: {
      title: "Startsida",
      description: "Detta är huvudpanelen. Här börjar testet.",
    },
    nextRoute: () => `/dashboard/units`,
  },
  {
    element: "#units-link",
    popover: {
      title: "Enheter",
      description: "Klicka här för att gå till alla enheter.",
    },
    nextRoute: () => `/dashboard/units`,
  },
];
