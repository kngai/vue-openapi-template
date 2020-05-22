<template>
  <section>
    <div class="row">
      <div class="twelve column">
        <h1>Items of {{$route.params.collectionId}}</h1>
        <p>numberMatched: {{ numberMatched }}</p>
        <p>numberReturned: {{ numberReturned }}</p>
      </div>
    </div>

    <div class="row">
      <div class="six columns">
        <table class="items" v-if="jsonLoaded">
          <thead>
            <tr>
              <th>id</th>
              <th v-for="(value, key) in lessProperties(features[0].properties)" :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in features" :key="item.id">
              <th><router-link :to="{name: 'Item', params: {collectionId: $route.params.collectionId, itemId: item.id}}">{{ item.id }}</router-link></th>
              <template v-for="(value, prop) in lessProperties(item.properties)">
                <td v-if="(value+'').includes('http')" :key="prop"><a :href="value" target="_blank">{{ value.substring(0, 20) }}...</a></td>
                <td v-else :key="prop">{{ value }}</td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="six columns">
        <items-map v-if="jsonLoaded" :geojson="json"></items-map>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ItemsMap from '@/components/ItemsMap.vue'

export default {
  name: 'Items',
  components: {
    ItemsMap
  },
  created() {
    this.getJson()
  },
  data() {
    return {
      PYGEOAPI_HOST: process.env.VUE_APP_PYGEOAPI_HOST
    }
  },
  computed: {
    ...mapState({
      json: state=> state.items.json,
      jsonLoaded: state => state.items.jsonLoaded
    }),
    ...mapGetters('items', {
      features: 'features',
      numberMatched: 'numberMatched',
      numberReturned: 'numberReturned'
    })
  },
  methods: {
    getJson() {
      this.$store.dispatch('items/getJson', {id: this.$route.params.collectionId})
    },
    lessProperties(properties) {
      const keys = Object.keys(properties)
      const numKeys = keys.length
      let reducedProps = {}
      for (let i = 0; (i < 5) && (i < numKeys); i++) {
        reducedProps[keys[i]] = properties[keys[i]]
      }
      return reducedProps
    }
  }
}
</script>

<style>
table.items {
  table-layout: fixed;
  width: 100%;
  word-break: break-all;
}
</style>
