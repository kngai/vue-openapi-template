<template>
  <div>
    <h1>Spatial-Temporal Asset Catalog</h1>

    STaC version: <code>{{ version }}</code>
    <ul v-if="jsonLoaded">
      <li v-for="(link, index) of links" :key="index">
        <a
          :href="link.href"
          :rel="link.rel"
          :type="link.type"
          target="_blank"
          :hreflang="Object.prototype.hasOwnProperty.call(link, 'hreflang') ? link.hreflang : false">{{ link.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Collections',
  created() {
    this.getStacJson()
  },
  computed: {
    ...mapState({
      jsonLoaded: state => state.stac.jsonLoaded
    }),
    ...mapGetters('stac', [
      'links',
      'version'
    ])
  },
  methods: {
    getStacJson() {
      this.$store.dispatch('stac/getJson')
    }
  }
}
</script>
