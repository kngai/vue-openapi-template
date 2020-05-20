<template>
  <div>
    <h1>Collections in this service</h1>

    <table v-if="jsonLoaded">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="collection in collections"
          :key="collection.id">
          <td><router-link :to="{name: 'Collection', params: {collectionId: collection.id}}">{{ collection.title }}</router-link></td>
          <td>{{ collection.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Collections',
  created() {
    this.getCollectionsJson()
  },
  computed: {
    ...mapState({
      jsonLoaded: state => state.collections.jsonLoaded
    }),
    ...mapGetters('collections', {
      collections: 'collections'
    })
  },
  methods: {
    getCollectionsJson() {
      this.$store.dispatch('collections/getJson')
    }
  }
}
</script>
