<template>
  <div>
    <h1>Item {{$route.params.itemId}} of {{$route.params.collectionId}}</h1>

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
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Item',
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
      jsonLoaded: state => state.item.jsonLoaded
    }),
    ...mapGetters('item', {
      properties: 'properties'
    })
  },
  methods: {
    getJson() {
      this.$store.dispatch('item/getJson', {id: this.$route.params.collectionId, itemId: this.$route.params.itemId})
    }
  }
}
</script>

<style>

</style>
