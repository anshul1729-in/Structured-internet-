// Small helper hook that lets components adjust layout for mobile screens.
// This keeps responsive logic in one place instead of scattering window.innerWidth checks.

import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  // Initialise based on the current window width so we render correctly on first paint.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

