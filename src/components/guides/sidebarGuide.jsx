"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function SidebarTour() {
  useEffect(() => {
    const sidebarTour = driver({
      showProgress: true,
      allowClose: true,
      overlayOpacity: 0.5,
      nextBtnText: "Nästa",
      prevBtnText: "Tillbaka",
      doneBtnText: "Klar",

      steps: [
        {
          element: "#sidebar-title",
          popover: {
            title: "Översikt",
            description:
              "Härifrån kan du snabbt navigera till alla delar av systemet.",
            position: "right",
          },
        },
        {
          element: "#link-units",
          popover: {
            title: "Alla enheter",
            description:
              "Här ser du alla enheter, deras ansvariga och tillhörande uppgifter.",
            position: "right",
          },
        },
        {
          element: "#link-tasks",
          popover: {
            title: "Att göra",
            description:
              "Här visas alla uppgifter (tasks) som är aktiva eller pågående.",
            position: "right",
          },
        },
        {
          element: "#link-keys",
          popover: {
            title: "Nyckelhantering",
            description: "Hantera nycklar och se vem som har vilka nycklar.",
            position: "right",
          },
        },
        {
          element: "#link-users",
          popover: {
            title: "Medarbetare",
            description:
              "Se och hantera alla registrerade städare och personal.",
            position: "right",
          },
        },
      ],
    });

    // Starta guiden när komponenten laddas
    sidebarTour.drive();
  }, []);

  return null;
}
