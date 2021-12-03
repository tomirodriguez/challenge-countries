import { HTMLProps, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBreakpoints from "../../hooks/useBreakpoints";
import useMap from "../../hooks/useMap";
import { RootState } from "../../store";
import styles from "./WorldMap.module.scss";

const WorldMap = ({ className }: HTMLProps<HTMLDivElement>) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const selectedCountry = useSelector((state: RootState) => state.selectedCountry.country);
  const dispatch = useDispatch();
  const breakpoint = useBreakpoints();

  const map = useMap({
    svgRef,
  });

  useEffect(() => {
    if (map) {
      map.drawMap();
    }
  }, [map, dispatch, breakpoint]);

  useEffect(() => {
    if (map) {
      map.setSelectedCountry(selectedCountry);
    }
  }, [map, selectedCountry]);

  return (
    <div className={`card ${className} ${styles.mapContainer}`.trim()}>
      <svg className={styles.worldMap} id="worldMap" ref={svgRef} width="950px" height="500px" />
    </div>
  );
};

export default WorldMap;
