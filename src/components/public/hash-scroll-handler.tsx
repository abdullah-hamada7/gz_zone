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
      let el = document.getElementById(id);
      if (!el && id === "booking") {
        el = document.getElementById("treatments");
      }
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    // 1. Initial page load or route change with hash in URL
    if (typeof window !== "undefined" && window.location.hash) {
      const timer = setTimeout(() => {
        // Only scroll if location still has a hash
        if (window.location.hash) {
          scrollToHash(window.location.hash);
        }
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

      // Case A: Clicking Home Logo or "/" link
      if (href === "/" || href === "/#") {
        if (pathname === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (window.location.hash) {
            window.history.pushState(null, "", "/");
          }
        } else {
          // Clear hash state when navigating to home from another page
          if (typeof window !== "undefined") {
            window.history.replaceState(null, "", window.location.pathname);
          }
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
        const element = document.getElementById(targetHash) || (targetHash === "booking" ? document.getElementById("treatments") : null);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href.startsWith("/") ? href : `${pathname}${href}`);
        }
      } else if (!href.includes("#") && typeof window !== "undefined" && window.location.hash) {
        // Clear hash state when navigating to any non-hash route (e.g., /treatments/slug)
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    document.addEventListener("click", handleAnchorClick, true);

    const handlePopState = () => {
      if (typeof window !== "undefined") {
        if (window.location.hash) {
          const id = window.location.hash.replace("#", "");
          const element = document.getElementById(id) || (id === "booking" ? document.getElementById("treatments") : null);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else if (pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname]);

  return null;
}
