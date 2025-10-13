export const specialistGuideSteps = [
  {
    element: "#add-specialist-btn",
    popover: {
      title: "Lägg till specialist",
      description: "Skapa ny specialist för enheten.",
    },
    nextRoute: (unitId, specialist) =>
      `/dashboard/units/${unitId}/specialister/edit?specialistId=${
        specialist.id
      }&name=${encodeURIComponent(specialist.name)}&phone=${encodeURIComponent(
        specialist.phone
      )}&email=${encodeURIComponent(specialist.email)}`,
  },
  {
    element: ".edit-specialist-btn",
    popover: {
      title: "Redigera specialist",
      description: "Uppdatera specialistens information.",
    },
  },
  {
    element: ".delete-specialist-btn",
    popover: {
      title: "Ta bort specialist",
      description: "Tar bort specialisten permanent.",
    },
  },
  {
    element: "#specialist-name-input",
    popover: {
      title: "Specialistens namn",
      description: "Redigera namnet här.",
    },
    nextRoute: (unitId) => `/dashboard/units/${unitId}/unitTasks`,
  },
  {
    element: "#specialist-email-input",
    popover: { title: "E-postadress", description: "Uppdatera kontaktinfo." },
  },
  {
    element: "#specialist-save-btn",
    popover: { title: "Spara specialist", description: "Spara ändringar." },
  },
];
