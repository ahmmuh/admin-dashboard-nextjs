export const chefGuideSteps = [
  {
    element: "#add-chef-btn",
    popover: {
      title: "Lägg till chef",
      description: "Skapa ny chef för enheten.",
    },
    nextRoute: (unitId, chef) =>
      `/dashboard/units/${unitId}/chefer/edit?chefId=${
        chef.id
      }&name=${encodeURIComponent(chef.name)}&phone=${encodeURIComponent(
        chef.phone
      )}&email=${encodeURIComponent(chef.email)}`,
  },
  {
    element: ".edit-chef-btn",
    popover: {
      title: "Redigera chef",
      description: "Uppdatera chefens information.",
    },
  },
  {
    element: ".delete-chef-btn",
    popover: {
      title: "Ta bort chef",
      description: "Tar bort chefen permanent.",
    },
  },
  {
    element: "#chef-name-input",
    popover: {
      title: "Chefens namn",
      description: "Redigera chefens namn här.",
    },
    nextRoute: (unitId) => `/dashboard/units/${unitId}/specialister`,
  },
  {
    element: "#chef-email-input",
    popover: {
      title: "Chefens e-post",
      description: "Uppdatera chefens email.",
    },
  },
  {
    element: "#chef-save-btn",
    popover: { title: "Spara chef", description: "Spara ändringar." },
  },
];
