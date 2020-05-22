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
      <div class="twelve columns">
        <items-map v-if="jsonLoaded" :geojson="json"></items-map>
      </div>
    </div>

    <div class="row">
      <div class="twelve columns">
        <table class="items" v-if="jsonLoaded">
          <thead>
            <tr>
              <th>id</th>
              <template v-for="(value, key) in lessProperties(features[0].properties)">
                <th v-if="!key.includes('_')" :key="key">{{ key }}</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in features" :key="item.id">
              <th><router-link :to="{name: 'Item', params: {collectionId: $route.params.collectionId, itemId: item.id}}">{{ item.id }}</router-link></th>
              <template v-for="(value, prop) in lessProperties(item.properties)">
                <td v-if="prop === 'name'" :key="prop"><a :href="item.properties['name_alt']" target="_blank">{{ value }}</a></td>
                <td v-else-if="!prop.includes('_')" :key="prop">{{ value }}</td>
              </template>
            </tr>
          </tbody>
        </table>
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
      let reducedProps = {}
      for (let i = 0; i<4; i++) {
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
