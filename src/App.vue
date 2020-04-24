<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
  created() {
    this.getRootJson()
  },
  components: {
    AppHeader
  },
  methods: {
    getRootJson() {
      this.$store.dispatch('base/getJson')
      this.$store.dispatch('base/getJsonld')
    }
  }
}
</script>

<style>

</style>
