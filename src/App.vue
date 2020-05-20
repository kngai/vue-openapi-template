<template>
  <div id="app" class="container">
    <app-header></app-header>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  created() {
    this.getRootJson()
  },
  components: {
    AppHeader,
    AppFooter
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
