import { HTMLProps, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMap from "../../hooks/useMap";
import { set } from "../../reducers/selectedCountryReducer";
import { RootState } from "../../store";
import styles from "./WorldMap.module.scss";

const WorldMap = ({ className }: HTMLProps<HTMLDivElement>) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const selectedCountry = useSelector((state: RootState) => state.selectedCountry.country);
  const dispatch = useDispatch();

  const map = useMap({
    svgRef,
  });

  useEffect(() => {
    if (map) {
      const mapObserver = (code: string | null) => {
        dispatch(set(code));
      };

      map.addObserver(mapObserver);
      map.drawMap();
    }
  }, [map, dispatch]);

  useEffect(() => {
    if (map) {
      map.setSelectedCountry(selectedCountry);
    }
  }, [map, selectedCountry]);

  return (
    <div className={`card ${className} ${styles.mapContainer}`.trim()}>
      <svg className={styles.geoMap} id="worldMap" ref={svgRef} width="950px" height="500px" />
    </div>
  );
};

export default WorldMap;
