<template>
  <l-map class="items-map" ref="itemsMap">
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
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
  },
  methods: {
    fitItemsToView(event) {
      this.$refs.itemsMap.mapObject.fitBounds(event.target.getBounds())
    }
  }
}
</script>

<style scoped>
.items-map {
  height: 350px;
}
</style>
