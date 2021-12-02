import { geoNaturalEarth1, geoPath } from "d3-geo";
import { select } from "d3-selection";
import { Feature } from "geojson";
import { WorldTopology } from "../../../hooks/useMapData";
import { Country } from "../../../utils/models";

const STROKE_WIDTH = 0.5;

export default class GeoMap {
  readonly svgReactElement: SVGSVGElement;
  readonly topology: WorldTopology;
  private path: any;
  private currentScale: number;
  private selectedCountry: Country | null;
  private featuresHash: { [code: string]: Feature };

  constructor(svgReactElement: SVGSVGElement, topology: WorldTopology) {
    this.svgReactElement = svgReactElement;
    this.topology = topology;
    this.path = this.createPath();
    this.currentScale = 1;
    this.selectedCountry = null;

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

  reset() {}

  updateMap = () => {
    const g = select(`#${this.svgReactElement.id} g`);

    const { width, height } = this.svgReactElement.getBoundingClientRect();

    if (this.selectedCountry) {
      // const { type, id } = this.activeFeature.properties;
      // this.currentProvinceId = id.substr(0, 2);
      // const bounds = this.path.bounds(this.activeFeature),
      //   dx = bounds[1][0] - bounds[0][0],
      //   dy = bounds[1][1] - bounds[0][1],
      //   x = (bounds[0][0] + bounds[1][0]) / 2,
      //   y = (bounds[0][1] + bounds[1][1]) / 2,
      //   scaleFactor = type === "province" ? 0.8 : 0.3;
      // this.currentScale = scaleFactor / Math.max(dx / width, dy / (height - 300));
      // const translate = [width / 2 - this.currentScale * x, height / 2 - this.currentScale * y];
      // this.drawProvinces(
      //   this.topology.provinces.features.filter((feature) => feature.properties?.id === this.currentProvinceId)
      // );
      // this.drawDepartments(
      //   this.topology.departments.features.filter((feature) =>
      //     feature.properties?.id.startsWith(this.currentProvinceId)
      //   )
      // );
      // g.transition().duration(500).attr("transform", `translate(${translate})scale(${this.currentScale})`);
    } else {
      // this.currentScale = 1;
      // this.currentProvinceId = "";
      // this.drawProvinces(this.topology.provinces.features);
      // this.drawDepartments([]);
      // g.transition().ease(easeCubicOut).duration(300).attr("transform", `translate(0,0)scale(1)`);
    }
  };

  setSelectedCountry(country: Country | null) {
    if (country === this.selectedCountry) return;
    this.selectedCountry = country;
    if (!country) this.reset();
    else this.updateMap();
  }

  drawMap() {
    const path = this.path;
    const scale = this.currentScale;

    if (this.topology && this.topology.countries) {
      this.svgReactElement.innerHTML = "";

      const svg = select(`#${this.svgReactElement.id}`);

      const g = svg.append("g");
      g.attr("id", "map")
        .selectAll(".country")
        .data(this.topology.countries.features, function (d: any) {
          return d.properties.id;
        })
        .join(
          function (enter) {
            return enter
              .append("path")
              .attr("class", ".country")
              .attr("id", (feature: any) => {
                return feature.properties?.id || "";
              })
              .attr("d", path)
              .style("fill", function (d) {
                return "#c9c9c9";
              })
              .style("stroke", "white")
              .style("stroke-width", `${STROKE_WIDTH / scale}px`)
              .style("cursor", "pointer")
              .on("click", (event: any, feature) => {
                event.stopPropagation();
                console.log("EVENT MAP: SELECTION", feature);

                // const newId = regionsToShow.includes(feature.properties?.id)
                //   ? feature.properties?.id
                //   : "";
                // setCurrentSelection(newId);
                // updateObservers();
              })
              .style("opacity", "1")
              .append("title")
              .text((d) => d.properties?.name || "");
          },

          function (update) {
            return update.style("stroke-width", `${STROKE_WIDTH / scale}px`);
          }
        );
    }
    // const countries = feature(this.topology, this.topology.objects.countries);

    // console.log("COUNTRIES", countries);

    // this.svgReactElement.innerHTML = "";

    // const svg = select(`#${this.svgReactElement.id}`);
    // svg.append("g").attr("id", "map");

    // this.drawCountries(countries.features as any);
  }
}
