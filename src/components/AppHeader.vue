<template>
  <header>
    <img src="@/assets/logo.png" alt="pygeoapi logo">
    <br>
    <small>Host of pygeoapi instance: <code><a :href="host">{{ host }}</a></code></small>
    <nav>
      <router-link to="/">Home</router-link> | <router-link to="/collections">Collections</router-link> | <router-link to="/stac">STaC</router-link> | <router-link to="/processes">Processes</router-link> | <router-link to="/conformance">Conformance</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      host: process.env.VUE_APP_PYGEOAPI_HOST
    }
  }
}
</script>

<style scoped>
</style>
