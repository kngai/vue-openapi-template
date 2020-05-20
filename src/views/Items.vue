<template>
  <div>
    <h1>Items of {{$route.params.collectionId}}</h1>
    <p>numberMatched: {{ numberMatched }}</p>
    <p>numberReturned: {{ numberReturned }}</p>

    <table>
      <thead>
        <tr>
          <th>id</th>
          <th v-for="(value, key) in features[0].properties" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in features" :key="item.id">
          <th><router-link :to="{name: 'Item', params: {collectionId: $route.params.collectionId, itemId: item.id}}">{{ item.id }}</router-link></th>
          <td v-for="(value, prop) in item.properties" :key="prop">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Items',
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
      jsonLoaded: state => state.collections.jsonLoaded
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
    }
  }
}
</script>

<style>

</style>
