<template>
  <header>
    <img src="@/assets/logo.png" alt="Logo">
    <nav>
      <router-link to="/">Home</router-link> | <router-link to="/collections">Collections</router-link> | <router-link to="/processes">Processes</router-link> | <router-link to="/conformance">Conformance</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
</style>
