<template>
  <footer>
    <hr>
    Powered by <a href="https://pygeoapi.io"><img class="pygeoapi-footer-logo" src="@/assets/pygeoapi.png" alt="pygeoapi logo"></a> {{ version }}
  </footer>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      version: process.env.VUE_APP_PYGEOAPI_VERSION
    }
  }
}
</script>

<style scoped>
.pygeoapi-footer-logo {
  height: 24px;
  vertical-align: middle;
}
</style>
