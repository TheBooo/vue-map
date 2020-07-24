<template>
  <div id="viewDiv"></div>
</template>

<script>
import ArcGISMap from "esri/Map";
import MapView from "esri/views/MapView";
import Search from "esri/widgets/Search";
import Home from "esri/widgets/Home";

export default {
  name: "WebMap",
  methods: {
    loadMap() {
      const map = new ArcGISMap({
        basemap: "topo-vector",
      });
      this.view = new MapView({
        container: this.$el,
        map: map,
        center: [37.7, 55.7],
        zoom: 10,
      });

      // home widget
      const homeBtn = new Home({
        view: this.view,
      });
      this.view.ui.add(homeBtn, "top-left");

      // search widget
      const searchWidget = new Search({
        view: this.view,
      });
      this.view.ui.add(searchWidget, "top-right");

      // onclick event
      this.view.on("click", (e) => {
        searchWidget.clear();
        this.view.popup.clear();
        if (searchWidget.activeSource) {
          let geocoder = searchWidget.activeSource.locator; // World geocode service
          let params = {
            location: e.mapPoint,
          };
          geocoder.locationToAddress(params).then(
            (response) => {
              let address = response.address;
              this.showPopup(address, e.mapPoint);
            },
            (err) => {
              this.showPopup("Адрес не найден", e.mapPoint);
            }
          );
        }
      });
    },

    // popup с информацией
    showPopup(address, pt) {
      this.view.popup.open({
        title:
          +Math.round(pt.longitude * 100000) / 100000 +
          ", " +
          Math.round(pt.latitude * 100000) / 100000,
        content: address,
        location: pt,
      });
    },
  },
  mounted() {
    this.loadMap(); // загрузка карты после рендера
  },
};
</script>

<style>
@import url("https://js.arcgis.com/4.16/esri/themes/light/main.css");

#viewDiv {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
