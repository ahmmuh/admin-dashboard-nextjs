// components/guides/chefGuide.js
export const chefGuideSteps = [
  {
    element: ".chef-personlist",
    popover: {
      title: "Enhetschef sida",
      description:
        "Här kan du se information om enhetschef + uppdater eller ta bort knappar, syns bara för avdelningschef/områdeschef",
    },
  },

  {
    element: "#chef-name-input",
    popover: {
      title: "Chefens namn",
      description: "Redigera chefens namn här.",
    },
  },

  {
    element: "#chef-telefon-input",
    popover: {
      title: "Chefens telefon",
      description: "Redigera chefens telefon här.",
    },
  },
  {
    element: "#chef-email-input",
    popover: {
      title: "Chefens e-post",
      description: "Uppdatera chefens email.",
    },
  },

  {
    element: "#chef-role-input",
    popover: {
      title: "Chefens role",
      description: "Redigera chefens role här.",
    },
  },
  {
    element: "#chef-save-btn",
    popover: { title: "Spara chef", description: "Spara ändringar." },
  },
];
