"use client";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function ChefPageGuide() {
  const startGuide = () => {
    const d = driver({
      showProgress: true,
      nextBtnText: "Nästa",
      prevBtnText: "Tillbaka",
      doneBtnText: "Klar",
      steps: [
        {
          element: "#chef-personlist",
          popover: {
            title: "Chef för enheten",
            description:
              "Här ser du namn, telefon, e-post och roll för enhetschefen.",
            position: "bottom",
          },
        },
        {
          element: "#chef-actions",
          popover: {
            title: "Actions",
            description: "Här kan du redigera eller ta bort chefen.",
            position: "bottom",
          },
        },
      ],
    });

    d.drive();
  };

  return (
    <button
      onClick={startGuide}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
      Starta guide för chef
    </button>
  );
}
