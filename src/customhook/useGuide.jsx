import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Driver from "driver.js";
import "driver.js/dist/driver.css";
import { systemGuideSteps } from "@/path/to/systemGuideSteps";

export const useGuide = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const driver = new Driver();

    // Enkel match: kör guiden om pattern finns i pathname
    const guide = systemGuideSteps.find((step) =>
      pathname.startsWith(step.pattern.replace(/:.*$/g, ""))
    );

    if (!guide) return;

    driver.defineSteps(guide.steps);
    driver.start();

    driver.on("complete", () => {
      if (guide.nextRoute) {
        const next =
          typeof guide.nextRoute === "function"
            ? guide.nextRoute()
            : guide.nextRoute;
        if (next) router.push(next);
      }
    });
  }, [pathname, router]);
};
