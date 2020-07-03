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
        <label for="items-limit">Limit:</label>
        <select id="items-limit" name="limit" v-model="limit" @change="changeLimit()">
          <option :value="10">10 (default)</option>
          <option :value="100">100</option>
          <option :value="500">500</option>
          <option :value="1000">1000</option>
        </select>
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
    this.getJsonAndRefresh()
  },
  watch: {
    $route() {
      this.getJsonAndRefresh()
    }
  },
  data() {
    return {
      PYGEOAPI_HOST: process.env.VUE_APP_PYGEOAPI_HOST,
      limit: 10
    }
  },
  computed: {
    ...mapState({
      json: state => state.items.json,
      jsonLoaded: state => state.items.jsonLoaded
    }),
    ...mapGetters('items', {
      features: 'features',
      numberMatched: 'numberMatched',
      numberReturned: 'numberReturned'
    })
  },
  methods: {
    getJsonAndRefresh() {
      if (Object.prototype.hasOwnProperty.call(this.$route.query, 'limit')) {
        this.limit = this.$route.query.limit
      }
      this.$store.dispatch('items/getJson', {collectionId: this.$route.params.collectionId, limit: this.limit})
    },
    lessProperties(properties) {
      const keys = Object.keys(properties)
      const numKeys = keys.length
      let reducedProps = {}
      for (let i = 0; (i < 5) && (i < numKeys); i++) {
        reducedProps[keys[i]] = properties[keys[i]]
      }
      return reducedProps
    },
    changeLimit() {
      this.$router.push({ query: { limit: this.limit } })
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
