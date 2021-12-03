import { FeatureCollection, GeometryCollection } from "geojson";
import { useEffect, useState } from "react";
import { feature } from "topojson-client";
import { Topology } from "topojson-specification";
import topology from "../topojson/countries-50m-opt-continents.json";

export interface WorldTopology {
  countries: FeatureCollection<GeometryCollection>;
}

const useMapData = () => {
  const [topologyData, setTopologyData] = useState<WorldTopology | null>(null);

  useEffect(() => {
    if (topology) {
      const { countries } = (topology as unknown as Topology).objects;

      setTopologyData({
        countries: feature(topology as any, countries) as any,
      });
    }
  }, []);
  return {
    topologyData,
  };
};

export default useMapData;
