<template>
  <div>
    <h1 v-if="jsonLoaded">{{collection.title}}</h1>

    <div v-if="jsonLoaded">
      <p>{{collection.description}}</p>

      <strong>Keywords:</strong> <keywords :keywords="keywords"></keywords>

      <h2>Browse</h2>
      <router-link :to="{name: 'Items', params: {collectionId: $route.params.collectionId}}">Browse through the items of "{{collection.title}}"</router-link>

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
    this.getCollectionJson()
  },
  computed: {
    ...mapGetters('collection', [
      'collectionById',
      'collectionLoadedById',
      'keywordsById'
    ]),
    collection() {
      return this.collectionById(this.$route.params.collectionId)
    },
    jsonLoaded() {
      return this.collectionLoadedById(this.$route.params.collectionId)
    },
    keywords() {
      return this.keywordsById(this.$route.params.collectionId)
    }
  },
  methods: {
    getCollectionJson() {
      this.$store.dispatch('collection/getJson', {id: this.$route.params.collectionId})
    }
  }
}
</script>
