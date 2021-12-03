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

  constructor(svgReactElement: SVGSVGElement, topology: WorldTopology) {
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
        scaleFactor = 0.5;

      this.currentScale = scaleFactor / Math.max(dx / width, dy / height);
      const translate = [width / 2 - this.currentScale * x, height / 2 - this.currentScale * y];
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
            .style("fill", function (d) {
              return "#c9c9c9";
            })
            .style("stroke", "white")
            .style("cursor", "pointer")
            .style("opacity", "0.7")
            .style("stroke-width", `${STROKE_WIDTH / scale}px`)
            .on("click", (event: any, feature: any) => {
              event.stopPropagation();
              updateObservers(feature.id);
            })
            .style("opacity", "1")
            .append("title")
            .text((d) => d.properties?.name || "");
        },
        function (update) {
          return update
            .style("stroke-width", `${STROKE_WIDTH / scale}px`)
            .style("fill", (d) => {
              if (d.id === active) return "green";
              return "#c9c9c9";
            })
            .style("opacity", (d) => {
              if (d.id === active) return "1";
              return "0.7";
            });
        },
        function (exit) {
          return exit
            .style("fill", "#ccc")
            .style("opacity", function (d) {
              return "0.7";
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
      this.svgReactElement.innerHTML = "";
      const svg = select("svg");
      svg.on("click", () => this.updateObservers(null));
      const g = svg.append("g");
      g.attr("id", "map");
      this.drawCountries(this.topology.countries.features);
      // const svg = select(`#${this.svgReactElement.id}`);

      //   .selectAll(".country")
      //   .data(this.topology.countries.features, function (d: any) {
      //     return d.properties.id;
      //   })
      //   .join(
      //     function (enter) {
      //       return enter
      //         .append("path")
      //         .attr("class", ".country")
      //         .attr("id", (feature: any) => {
      //           return feature.properties?.id || "";
      //         })
      //         .attr("d", path)
      //         .style("fill", function (d) {
      //           return "#c9c9c9";
      //         })
      //         .style("stroke", "white")
      //         .style("stroke-width", `${STROKE_WIDTH / scale}px`)
      //         .style("cursor", "pointer")
      //         .on("click", (event: any, feature) => {
      //           event.stopPropagation();
      //           // const newId = regionsToShow.includes(feature.properties?.id)
      //           //   ? feature.properties?.id
      //           //   : "";
      //           // setCurrentSelection(newId);
      //           // updateObservers();
      //         })
      //         .style("opacity", "1")
      //         .append("title")
      //         .text((d) => d.properties?.name || "");
      //     },

      //     function (update) {
      //       return update.style("stroke-width", `${STROKE_WIDTH / scale}px`);
      //     }
      //   );
    }
    // const countries = feature(this.topology, this.topology.objects.countries);

    // console.log("COUNTRIES", countries);

    // this.svgReactElement.innerHTML = "";

    // const svg = select(`#${this.svgReactElement.id}`);
    // svg.append("g").attr("id", "map");

    // this.drawCountries(countries.features as any);
  }
}
