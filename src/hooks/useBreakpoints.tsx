import { useEffect, useState } from "react";

export enum Breakpoint {
  MOBILE,
  TABLET,
  DESKTOP,
  WIDESCREEN,
}

interface BreakpointStats {
  from: number;
  to: number;
  type: Breakpoint;
}

const breakpointsList = {
  MOBILE: { from: 0, to: 767, type: Breakpoint.MOBILE },
  TABLET: { from: 768, to: 1023, type: Breakpoint.TABLET },
  DESKTOP: { from: 1024, to: 1365, type: Breakpoint.DESKTOP },
  WIDESCREEN: { from: 1366, to: 999999, type: Breakpoint.WIDESCREEN },
};

const useBreakpoints = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);

  useEffect(() => {
    // can be AMP - MOBILE is default resolution
    if (!window) return setBreakpoint(breakpointsList.MOBILE.type);

    const listener = () => {
      const { innerWidth } = window;

      const breakpointsArray = [
        breakpointsList.MOBILE,
        breakpointsList.TABLET,
        breakpointsList.DESKTOP,
        breakpointsList.WIDESCREEN,
      ];

      breakpointsArray.some((breakpointStats: BreakpointStats) => {
        if (innerWidth < breakpointStats.to && innerWidth >= breakpointStats.from) {
          setBreakpoint(breakpointStats.type);
          return true;
        }
        return false;
      });
    };

    listener();

    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, []);

  return breakpoint;
};

export default useBreakpoints;
