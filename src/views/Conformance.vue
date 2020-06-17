<template>
  <div>
    <h1>Conformance</h1>

    <ul v-if="jsonLoaded">
      <li v-for="(conformanceUrl, index) in conformsTo" :key="index"><a :href="conformanceUrl" target="_blank">{{ conformanceUrl }}</a></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Collections',
  created() {
    this.getConformanceJson()
  },
  computed: {
    ...mapState({
      jsonLoaded: state => state.conformance.jsonLoaded
    }),
    ...mapGetters('conformance', [
      'conformsTo'
    ])
  },
  methods: {
    getConformanceJson() {
      this.$store.dispatch('conformance/getJson')
    }
  }
}
</script>
