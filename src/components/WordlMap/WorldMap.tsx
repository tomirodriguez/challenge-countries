import { HTMLProps, useEffect, useRef } from "react";
import useMap from "../../hooks/useMap";
import styles from "./WorldMap.module.scss";

const WorldMap = ({ className }: HTMLProps<HTMLDivElement>) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const map = useMap({
    svgRef
  });

  useEffect(() => {
    if (map) {
      map.drawMap();
    }
  }, [map]);

  return (
    <div className={`card ${className} ${styles.mapContainer}`.trim()}>
      <svg className={styles.geoMap} id="worldMap" ref={svgRef} width="950px" height="500px" />
    </div>
  );
};

export default WorldMap;
