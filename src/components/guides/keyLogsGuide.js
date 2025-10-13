// components/guides/keyLogsGuide.js
export const keyLogsGuideSteps = [
  {
    element: "#search-key-log",
    popover: {
      title: "Sök nyckel",
      description: "Sök i nyckelhistoriken.",
    },
  },
  {
    element: ".key-log-item:first-child",
    popover: {
      title: "Nyckelhistorik",
      description: "Visa detaljer för ett nyckellån.",
    },
  },
  {
    element: "#load-more-btn",
    popover: {
      title: "Visa fler",
      description: "Ladda fler nyckelloggar.",
    },
    nextRoute: () => `/dashboard/users`,
  },
];
