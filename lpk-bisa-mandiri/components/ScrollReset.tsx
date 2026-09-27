"use client";

import { useEffect } from "react";

export default function ScrollReset() {
  useEffect(() => {
    // Disable browser scroll restoration so page always starts at top
    if (typeof window !== "undefined" && history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
