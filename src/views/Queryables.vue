<template>
  <div v-if="jsonLoaded">
    <h1>{{ collection.title }}</h1>

    <h2>Queryables</h2>
    <ul>
      <li v-for="q in queryables" :key="q.queryable">{{ q.queryable }} (<code>{{ q.type }}</code>)</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Collection',
  created() {
    this.getJsonAndRefresh()
  },
  watch: {
    $route() {
      this.getJsonAndRefresh()
    }
  },
  computed: {
    ...mapGetters('collection', [
      'collectionById',
      'collectionLoadedById'
    ]),
    ...mapGetters('queryables', [
      'queryablesById',
      'queryablesLoadedById'
    ]),
    collection() {
      return this.collectionById(this.$route.params.collectionId)
    },
    queryables() {
      return this.queryablesById(this.$route.params.collectionId)
    },
    jsonLoaded() {
      return this.collectionLoadedById(this.$route.params.collectionId) && this.queryablesLoadedById(this.$route.params.collectionId)
    }
  },
  methods: {
    getJsonAndRefresh() {
      this.$store.dispatch('collection/getJson', {collectionId: this.$route.params.collectionId})
      this.$store.dispatch('queryables/getJson', {collectionId: this.$route.params.collectionId})
    }
  }
}
</script>
