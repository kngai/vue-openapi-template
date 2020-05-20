<template>
  <div>
    <h1>Item {{$route.params.itemId}} of {{$route.params.collectionId}}</h1>
  </div>
</template>

<script>


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
  },
  methods: {
    getJson() {
      // this.$store.dispatch('item/getJson', {collectionId: this.$route.params.collectionId, itemId: this.$route.params.itemId})
    }
  }
}
</script>

<style>

</style>
