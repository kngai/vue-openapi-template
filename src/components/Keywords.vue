<template>
  <span>
    <span v-for="(keyword, index) of keywords" class="tag" :key="index">{{ keyword }}</span>
  </span>
</template>

<script>
export default {
  name: 'Keywords',
  props: {
    keywords: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.tag {
  background-color: #09F;
  border-radius: 3px;
  border-style: none;
  color: #FFF;
  padding: 0.2em;
  font-size: 0.8em;
  margin-right: 0.2em;
}
</style>
