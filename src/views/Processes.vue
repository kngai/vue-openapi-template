<template>
  <div>
    <h1>Processes</h1>
    <table>
      <thead>
        <th>Name</th>
        <th>Description</th>
        <th>Keywords</th>
        <th>Version</th>
      </thead>
      <tbody>
        <tr v-for="proc in processes" :key="proc.id">
          <td><router-link :to="{name: 'Process', params: {processId: proc.id}}">{{ proc.title }}</router-link></td>
          <td>{{ proc.description }}</td>
          <td><keywords :keywords="proc.keywords"></keywords></td>
          <td>{{ proc.version }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Keywords from '@/components/Keywords.vue'

export default {
  name: 'Processes',
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
      json: state=> state.processes.json,
      jsonLoaded: state => state.processes.jsonLoaded
    }),
    ...mapGetters('processes', [
      'processes'
    ])
  },
  methods: {
    getJsonAndRefresh() {
      this.$store.dispatch('processes/getJson')
    }
  }
}
</script>

<style>

</style>
