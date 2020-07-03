<template>
  <div>
    <h1>Item {{$route.params.itemId}} of {{$route.params.collectionId}}</h1>

    <div class="row">
      <div class="six columns">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, prop) in properties" :key="prop">
              <th>{{ prop }}</th>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="six columns">
        <items-map v-if="jsonLoaded" :geojson="json"></items-map>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ItemsMap from '@/components/ItemsMap.vue'

export default {
  name: 'Item',
  components: {
    ItemsMap
  },
  created() {
    this.getJsonAndRefresh()
  },
  watch: {
    $route() {
      this.getJsonAndRefresh()
    }
  },
  data() {
    return {
      PYGEOAPI_HOST: process.env.VUE_APP_PYGEOAPI_HOST
    }
  },
  computed: {
    ...mapState({
      json: state=> state.item.json,
      jsonLoaded: state => state.item.jsonLoaded
    }),
    ...mapGetters('item', {
      properties: 'properties'
    })
  },
  methods: {
    getJsonAndRefresh() {
      this.$store.dispatch('item/getJson', {id: this.$route.params.collectionId, itemId: this.$route.params.itemId})
    }
  }
}
</script>

<style>

</style>
