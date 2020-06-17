<template>
  <l-map
    class="items-map"
    ref="itemsMap"
    :center="center"
    :zoom="zoom"
    :max-zoom="maxZoom">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-geo-json
      ref="geojsonLayer"
      :geojson="geojson"
      :options="geojsonOptions"
      @add="fitItemsToView">
    </l-geo-json>
  </l-map>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility'

import {LMap, LTileLayer, LGeoJson} from 'vue2-leaflet'

export default {
  name: 'ItemsMap',
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  props: {
    geojson: {
      type: [Object],
      default: () => {
        return {
          type: 'FeatureCollection',
          features: []
        }
      }
    }
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [45, -75],
      zoom: 10,
      maxZoom: 18,
      geojsonOptions: {
        onEachFeature: this.popupItem
      }
    }
  },
  methods: {
    fitItemsToView() {
      const geojsonBounds = this.$refs.geojsonLayer.mapObject.getBounds()
      this.$refs.itemsMap.mapObject.fitBounds(geojsonBounds, {maxZoom: 10})
    },
    popupItem(feature, layer) {
      layer.bindPopup(String(layer.feature.id), {closeButton: false})
    }
  }
}
</script>

<style scoped>
.items-map {
  height: 350px;
}
</style>
