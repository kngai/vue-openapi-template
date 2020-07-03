<template>
  <div>
    <h1>Process: {{ id }}</h1>

    <table>
      <thead>
        <th>Key</th>
        <th>Value</th>
      </thead>
      <tbody>
        <tr>
          <th>Id</th>
          <td>{{ id }}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>{{ title }}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td>{{ description }}</td>
        </tr>
        <tr>
          <th>Keywords</th>
          <td><keywords :keywords="keywords"></keywords></td>
        </tr>
        <tr>
          <th>Version</th>
          <td>{{ version }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Links</h2>
    <ul>
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
import Keywords from '@/components/Keywords.vue'

export default {
  name: 'Process',
  components: {
    Keywords
  },
  created() {
    this.getJsonAndRefresh()
  },
  watch: {
    $route() {
      this.getJsonAndRefresh()
    }
  },
  computed: {
    ...mapState({
      json: state => state.proc.json,
      jsonLoaded: state => state.proc.jsonLoaded
    }),
    ...mapGetters('proc', [
      'keywords',
      'links',
      'version',
      'description',
      'title',
      'id'
    ])
  },
  methods: {
    getJsonAndRefresh() {
      this.$store.dispatch('proc/getJson', {id: this.$route.params.processId})
    }
  }
}
</script>

<style>

</style>
