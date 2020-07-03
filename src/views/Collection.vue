<template>
  <div>
    <h1 v-if="jsonLoaded">{{collection.title}}</h1>

    <div v-if="jsonLoaded">
      <strong>Keywords:</strong> <keywords :keywords="keywords"></keywords>
      <p>{{collection.description}}</p>

      <h2>Queryables</h2>
      <ul>
        <li v-for="q in queryables" :key="q.queryable">{{ q.queryable }} (<code>{{ q.type }}</code>)</li>
      </ul>

      <h2>Browse</h2>
      <ul>
        <li><router-link :to="{name: 'Items', params: {collectionId: $route.params.collectionId}}">Browse through the items of "{{collection.title}}"</router-link></li>
        <li><router-link :to="{name: 'Queryables', params: {collectionId: $route.params.collectionId}}">Browse through the queryables of "{{collection.title}}"</router-link></li>
      </ul>

      <h2>pygeoapi Links</h2>
      <ul>
        <li v-for="(link, index) in collection.links" :key="index">
          <a :href="link.href" :type="link.type" target="_blank">{{link.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Keywords from '@/components/Keywords.vue'

export default {
  name: 'Collection',
  components: {
    Keywords
  },
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
      'collectionLoadedById',
      'keywordsById'
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
    },
    keywords() {
      return this.keywordsById(this.$route.params.collectionId)
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
