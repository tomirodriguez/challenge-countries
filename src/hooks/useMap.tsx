import { Feature } from "geojson";
import { RefObject, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeoMap from "../components/WordlMap/utils/GeoMap";
import { set } from "../reducers/selectedCountryReducer";
import { RootState } from "../store";
import useMapData from "./useMapData";

interface PropTypes {
  svgRef: RefObject<SVGSVGElement>;
}

const useMap = ({ svgRef }: PropTypes) => {
  const selectedCountry = useSelector((state: RootState) => state.selectedCountry.country);
  const { topologyData } = useMapData();
  const dispatch = useDispatch();
  const fillFunction = useCallback((feature: Feature) => {
    switch (feature.properties?.continent) {
      case "AF":
        return "#8942F2";
      case "AN":
        return "#21BAEF";
      case "AS":
        return "#FE7F01";
      case "EU":
        return "#1B69BD";
      case "NA":
        return "#CE3131";
      case "OC":
        return "#94319D";
      case "SA":
        return "#2DA230";
      default:
        return "#ccc";
    }
  }, []);

  const map = useMemo<GeoMap | null>(() => {
    if (topologyData && svgRef.current) {
      const geoMap = new GeoMap(svgRef.current, topologyData, fillFunction);

      const mapObserver = (code: string | null) => {
        dispatch(set(code));
      };

      geoMap.addObserver(mapObserver);
      return geoMap;
    }
    return null;
  }, [topologyData, svgRef, dispatch, fillFunction]);

  useEffect(() => {
    if (map) {
      map.setSelectedCountry(selectedCountry);
    }
  }, [map, selectedCountry]);

  return map;
};

export default useMap;
