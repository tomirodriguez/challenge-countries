import { easeCubicOut } from "d3";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { select } from "d3-selection";
import { Feature } from "geojson";
import { WorldTopology } from "../../../hooks/useMapData";

const STROKE_WIDTH = 0.5;

type MapObserver = (code: string | null) => void;

export default class GeoMap {
  readonly svgReactElement: SVGSVGElement;
  readonly topology: WorldTopology;
  private path: any;
  private currentScale: number;
  private selectedCountryCode: string | null;
  private featuresHash: { [code: string]: Feature };
  private observers: MapObserver[];
  private fillFunction: (feature: Feature) => string;

  constructor(svgReactElement: SVGSVGElement, topology: WorldTopology, fillFunction: (feature: Feature) => string) {
    this.svgReactElement = svgReactElement;
    this.topology = topology;
    this.path = this.createPath();
    this.currentScale = 1;
    this.selectedCountryCode = null;
    this.observers = [];

    const features: { [code: string]: Feature } = {};
    topology.countries.features.forEach((feature, index) => {
      features[feature.id || index] = feature;
    });
    this.featuresHash = features;
    this.fillFunction = fillFunction;
  }

  private createPath() {
    return geoPath(this.createProjection());
  }

  private createProjection() {
    const { width, height } = this.svgReactElement.getBoundingClientRect();
    const projection = geoNaturalEarth1().fitSize([width, height], this.topology.countries).precision(1000);

    return projection;
  }

  addObserver = (observer: MapObserver) => {
    this.observers.push(observer);
  };

  removeObserver = (observer: MapObserver) => {
    this.observers = this.observers.filter((obs) => obs !== observer);
  };

  updateObservers = (code: string | null) => {
    this.observers.forEach((observer) => observer(code));
  };

  updateMap = () => {
    const g = select(`#${this.svgReactElement.id} g`);

    const { width, height } = this.svgReactElement.getBoundingClientRect();
    if (this.selectedCountryCode) {
      const feature = this.featuresHash[this.selectedCountryCode];

      const bounds = this.path.bounds(feature),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        borderDistanceFactor = 0.1;

      const scale = Math.max(dx / width, dy / height);

      this.currentScale = Math.max(1 / scale - borderDistanceFactor / scale, 1);
      const translate = [width / 2 - this.currentScale * x, Math.min(height / 2 - this.currentScale * y, 0)];
      this.drawCountries([feature]);

      g.transition().duration(500).attr("transform", `translate(${translate})scale(${this.currentScale})`);
    } else {
      this.currentScale = 1;
      this.drawCountries(this.topology.countries.features);
      g.transition().ease(easeCubicOut).duration(300).attr("transform", `translate(0,0)scale(1)`);
    }
  };

  drawCountries = (data: Feature[]) => {
    const path = this.path;
    const scale = this.currentScale;
    const active = this.selectedCountryCode;
    const updateObservers = this.updateObservers;
    const fillFunction = this.fillFunction;

    select("#map")
      .selectAll(`.country`)
      .data(data, function (d: any) {
        return d.id;
      })
      .join(
        function (enter) {
          return enter
            .append("path")
            .attr("class", "country")
            .attr("id", (feature: any) => {
              return feature.id || "";
            })
            .attr("d", path)
            .style("fill", fillFunction)
            .style("stroke", "white")
            .style("cursor", "pointer")
            .style("opacity", "0.7")
            .style("stroke-width", `${STROKE_WIDTH / scale}px`)
            .on("click", (event: any, feature: any) => {
              event.stopPropagation();
              updateObservers(feature.id);
            })
            .style("opacity", "0.7")
            .append("title")
            .text((d) => d.properties?.name || "");
        },
        function (update) {
          return update.style("stroke-width", `${STROKE_WIDTH / scale}px`).style("opacity", (d) => {
            if (d.id === active) return "1";
            return "0.7";
          });
        },
        function (exit) {
          return exit
            .style("opacity", function (d) {
              return "0.3";
            })
            .style("stroke-width", `${STROKE_WIDTH / scale}px`);
        }
      );
  };

  setSelectedCountry(code: string | null) {
    if (code === this.selectedCountryCode) return;
    this.selectedCountryCode = code;
    this.updateMap();
  }

  drawMap() {
    if (this.topology && this.topology.countries) {
      this.path = this.createPath();
      this.svgReactElement.innerHTML = "";
      const svg = select(this.svgReactElement);
      svg.on("click", () => this.updateObservers(null));
      const g = svg.append("g");
      g.attr("id", "map");
      this.drawCountries(this.topology.countries.features);
    }
  }
}
