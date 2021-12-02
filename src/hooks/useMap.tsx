import { RefObject, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import GeoMap from "../components/WordlMap/utils/GeoMap";
import { RootState } from "../store";
import useMapData from "./useMapData";

interface PropTypes {
  svgRef: RefObject<SVGSVGElement>;
}

const useMap = ({ svgRef }: PropTypes) => {
  const selectedCountry = useSelector((state: RootState) => state.selectedCountry.country);
  const { topologyData } = useMapData();

  const map = useMemo<GeoMap | null>(() => {
    if (topologyData && svgRef.current) {
      const geoMap = new GeoMap(svgRef.current, topologyData);

      // const handleRegionSelected = (id: string) => {
      //   onRegionSelected(id);
      // };

      // const observer = { regionSelected: handleRegionSelected };
      // geoMap.addObserver(observer);
      return geoMap;
    }
    return null;
  }, [topologyData, svgRef]);

  useEffect(() => {
    if (map) {
      map.setSelectedCountry(selectedCountry);
    }
  }, [map, selectedCountry]);

  return map;
};

export default useMap;
