//NY KOD

"use client";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

export default function SystemGuideSteps() {
  useEffect(() => {
    const systemGuideTour = driver({
      showProgress: true,
      allowClose: true,
      overlayOpacity: 0.5,
      nextBtnText: "Nästa",
      prevBtnText: "Tillbaka",
      doneBtnText: "Klar",
      steps: [
        // === DASHBOARD / START ===
        {
          element: "#dashboard-link",
          popover: {
            title: "Startsida",
            description: "Detta är huvudpanelen. Här börjar testet.",
          },
          nextRoute: () => `/dashboard`,
        },
        {
          element: "#units-link",
          popover: {
            title: "Enheter",
            description: "Klicka här för att gå till alla enheter.",
          },
          nextRoute: () => `/dashboard/units`,
        },

        // === ENHETER LISTA ===
        {
          element: "#start-guide-btn",
          popover: {
            title: "Starta guide",
            description: "Klicka här för att starta enhetsguiden.",
          },
          nextRoute: (unitId) => `/dashboard/units/${unitId}/chefer`,
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
            title: "Enhet Öst 1",
            description: "Visar chef, specialister, att göra och nycklar.",
          },
        },
        {
          element: ".edit-unit-btn",
          popover: {
            title: "Redigera enhet",
            description: "Uppdatera information om enheten.",
          },
        },
        {
          element: ".delete-unit-btn",
          popover: {
            title: "Ta bort enhet",
            description: "Tar bort enheten permanent.",
          },
        },

        // === CHEFER LISTA ===
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

        // === CHEFER EDIT ===
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

        // === SPECIALISTER LISTA ===
        {
          element: "#add-specialist-btn",
          popover: {
            title: "Lägg till specialist",
            description: "Skapa ny specialist för enheten.",
          },
          nextRoute: (unitId, specialist) =>
            `/dashboard/units/${unitId}/specialister/edit?specialistId=${
              specialist.id
            }&name=${encodeURIComponent(
              specialist.name
            )}&phone=${encodeURIComponent(
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

        // === SPECIALISTER EDIT ===
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
          popover: {
            title: "E-postadress",
            description: "Uppdatera kontaktinfo.",
          },
        },
        {
          element: "#specialist-save-btn",
          popover: {
            title: "Spara specialist",
            description: "Spara ändringar.",
          },
        },

        // === UNIT TASKS ===
        {
          element: "#create-task-btn",
          popover: {
            title: "Skapa uppgift",
            description: "Lägg till nya uppgifter för enheten.",
          },
          nextRoute: (unitId) => `/dashboard/units/${unitId}/unitKeys`,
        },
        {
          element: ".task-item:first-child",
          popover: {
            title: "Existerande uppgift",
            description: "Visar status och beskrivning för uppgiften.",
          },
        },

        // === UNIT KEYS ===
        {
          element: ".key-item:first-child",
          popover: {
            title: "Nyckel",
            description: "Visar nyckel kopplad till enheten.",
          },
          nextRoute: () => `/dashboard/keyLogs`,
        },

        // === KEY LOGS ===
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

        // === USERS ===
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

        // === TIME REPORTING ===
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

        // === WORKPLACES ===
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

        // === CLOCKS ===
        {
          element: "#clock-in-out",
          popover: {
            title: "Stämpla in/ut",
            description: "Stämpla in eller ut med kod.",
          },
          nextRoute: () => `/dashboard/machines`,
        },

        // === MACHINES ===
        {
          element: "#create-machine-btn",
          popover: {
            title: "Lägg till maskin",
            description: "Skapa ny maskin.",
          },
          nextRoute: () => `/dashboard/machineLogs`,
        },
        {
          element: ".machine-item:first-child",
          popover: {
            title: "Maskin",
            description: "Visa maskinstatus och historik.",
          },
        },

        // === MACHINE LOGS ===
        {
          element: "#search-machine-log",
          popover: {
            title: "Sök loggar",
            description: "Sök i maskinloggar.",
          },
          nextRoute: () => `/dashboard`,
        },
        {
          element: ".machine-log-item:first-child",
          popover: {
            title: "Maskinlogg",
            description: "Visa detaljer i maskinloggen.",
          },
        },

        // === AVSLUTNING ===
        {
          element: "body",
          popover: {
            title: "Slut på guiden",
            description:
              "Hej! Nu har jag visat dig hela systemet — du kan prova och utforska det själv nu 🎉",
          },
        },
      ],
    });

    systemGuideTour.drive();
  }, []);

  return null;
}

//VI SKA DELA UPP GUIDN
