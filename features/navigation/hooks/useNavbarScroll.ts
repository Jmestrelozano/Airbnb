"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 16;

export const useNavbarScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return { isScrolled };
};
