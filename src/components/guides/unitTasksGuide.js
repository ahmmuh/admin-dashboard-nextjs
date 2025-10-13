// components/guides/unitTasksGuide.js
export const unitTasksGuideSteps = [
  {
    element: "#create-task-btn",
    popover: {
      title: "Skapa uppgift",
      description: "Lägg till nya uppgifter för enheten.",
    },
    nextRoute: (unitId) => `/dashboard/units/${unitId ?? ":unitId"}/unitKeys`,
  },
  {
    element: ".task-item:first-child",
    popover: {
      title: "Existerande uppgift",
      description: "Visar status och beskrivning för uppgiften.",
    },
  },
];
