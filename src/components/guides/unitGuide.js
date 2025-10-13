// export const unitGuideSteps = [
//   {
//     element: "#link-units",
//     popover: {
//       title: "Alla enheter",
//       description: "Här är en lista av alla enheter",
//     },
//     nextRoute: (unitId) => `/dashboard/units/${unitId ?? ":unitId"}/chefer`,
//   },
//   {
//     element: "#add-unit-btn",
//     popover: {
//       title: "Skapa enhet",
//       description: "Lägg till en ny enhet här.",
//     },
//   },
//   {
//     element: "#search-unit-input",
//     popover: {
//       title: "Sök enhet",
//       description: "Sök bland alla enheter.",
//     },
//   },
//   {
//     element: ".unit-card:first-child",
//     popover: {
//       title: "Enhet",
//       description:
//         "Här ser du information om en enhet: chef, specialister, att göra och nycklar.",
//     },
//   },
//   ,
//   {
//     element: ".edit-unit-btn",
//     popover: {
//       title: "Redigera enhet",
//       description: "Uppdatera information om enheten.",
//     },
//   },
//   {
//     element: ".delete-unit-btn",
//     popover: {
//       title: "Ta bort enhet",
//       description: "Tar bort enheten permanent.",
//     },
//   },
// ];

//NY
export const unitGuideSteps = [
  {
    element: "#link-units",
    popover: {
      title: "Alla enheter",
      description: "Här är en lista av alla enheter",
    },
    nextRoute: (unitId) => `/dashboard/units/${unitId ?? ":unitId"}/chefer`,
  },
  {
    element: "#add-unit-btn",
    popover: {
      title: "Skapa enhet",
      description: "Lägg till en ny enhet här.",
    },
  },
  {
    element: "#search-unit-input",
    popover: {
      title: "Sök enhet",
      description: "Sök bland alla enheter.",
    },
  },
  {
    element: ".unit-card:first-child",
    popover: {
      title: "Enhet",
      description:
        "Här ser du information om en enhet: chef, specialister, att göra och nycklar.",
    },
  },
  {
    element: ".unit-card:first-child .edit-unit-btn",
    popover: {
      title: "Redigera enhet",
      description: "Uppdatera information om enheten.",
    },
  },
  {
    element: ".unit-card:first-child .delete-unit-btn",
    popover: {
      title: "Ta bort enhet",
      description: "Tar bort enheten permanent.",
    },
  },
  {
    element: ".unit-card:first-child a[href*='chefer']",
    popover: {
      title: "Enhetschef",
      description: "Här kan du se enhetschef kopplad till denna enhet.",
    },
    nextRoute: (unitId, chefId) =>
      `/dashboard/units/${unitId}/chefer/${chefId}`,
  },
  {
    element: ".unit-card:first-child a[href*='specialister']",
    popover: {
      title: "Specialare",
      description: "Här ser du alla specialare kopplade till enheten.",
    },
  },
  {
    element: ".unit-card:first-child a[href*='unitTasks']",
    popover: {
      title: "Att göra-lista",
      description: "Lista över alla uppgifter för enheten.",
    },
  },
  {
    element: ".unit-card:first-child a[href*='unitKeys']",
    popover: {
      title: "Nycklar",
      description: "Här ser du alla nycklar för enheten.",
    },
  },
];
