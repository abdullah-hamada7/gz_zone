"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = (hashStr: string) => {
      const id = hashStr.replace("#", "");
      if (!id) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    // 1. Initial page load or route change with hash in URL
    if (typeof window !== "undefined" && window.location.hash) {
      const timer = setTimeout(() => {
        scrollToHash(window.location.hash);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    // 2. Click listener for all anchor tags targeting hashes or home on current page
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Case A: Clicking Home Logo or "/" link while on the Homepage
      if ((href === "/" || href === "/#") && pathname === "/") {
        if (window.scrollY > 0 || window.location.hash) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
        }
        return;
      }

      // Case B: Clicking hash anchor link
      let targetHash = "";
      let isSamePage = false;

      if (href.startsWith("#")) {
        targetHash = href.substring(1);
        isSamePage = true;
      } else if (href.includes("#")) {
        const [path, hash] = href.split("#");
        targetHash = hash;
        const currentNormalized = pathname === "/" ? "" : pathname;
        const pathNormalized = path === "/" ? "" : path;
        isSamePage = currentNormalized === pathNormalized;
      }

      if (targetHash && isSamePage) {
        const element = document.getElementById(targetHash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href.startsWith("/") ? href : `${pathname}${href}`);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, [pathname]);

  return null;
}
