<template>
  <l-map
    class="items-map"
    ref="itemsMap"
    :center="center"
    :zoom="zoom"
    :max-zoom="maxZoom">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-geo-json :geojson="geojson" @add="fitItemsToView"></l-geo-json>
  </l-map>
</template>

<script>
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
      type: [Object, Array],
      default: null
    }
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [45, -75],
      zoom: 10,
      maxZoom: 18
    }
  },
  methods: {
    fitItemsToView(event) {
      this.$refs.itemsMap.mapObject.fitBounds(event.target.getBounds(), {maxZoom: 10})
    }
  }
}
</script>

<style scoped>
.items-map {
  height: 350px;
}
</style>
