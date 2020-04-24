<template>
  <div>
    <h1>{{ rootld.name }}</h1>

    <p>{{ rootld.description }}</p>

    <strong>Keywords</strong>:
    <ul>
      <li v-for="keyword in rootld.keywords" :key="keyword">{{ keyword }}</li>
    </ul>

    <div>
      <strong>Terms of service:</strong> <span>{{ rootld.termsOfService }}</span><br>
      <strong>License:</strong> <a :href="rootld.license" target="_blank">{{ rootld.license }}</a>
    </div>

    <hr>

    <h2>Collections</h2>

    <a :href="collections.href">Source collections</a>

    <h2>Processess</h2>
    <a :href="pygeoapiHost + '/processes'">Source processes</a>

    <h2>API Definition</h2>
    <a :href="openApiDefinition.href + '?f=html'">Source OpenAPI definition as HTML</a><br>
    <a :href="openApiDefinition.href + '?f=json'">Source OpenAPI definition as JSON</a>

    <h2>Conformance</h2>
    <a :href="pygeoapiHost + '/conformance'">Source conformances</a>

    <hr>

    <contact-point :provider="provider"></contact-point>
  </div>
</template>

<script>
import axios from 'axios'
import ContactPoint from '@/components/ContactPoint.vue'

export default {
  name: 'Home',
  components: {
    ContactPoint
  },
  created() {
    this.getRoot()
  },
  data() {
    return {
      pygeoapiHost: process.env.VUE_APP_PYGEOAPI_HOST,
      rootld: {},
      root: {}
    }
  },
  methods: {
    getRoot() {
      const path = this.pygeoapiHost

      // jsonld
      axios.get(path + '?f=jsonld')
        .then((res) => {
          this.rootld = res.data
        })
        .catch((error) => {
          console.error(error)
        })

      // json
      axios.get(path + '?f=json')
        .then((res) => {
          this.root = res.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getLink(linkName) {
      if (Object.prototype.hasOwnProperty.call(this.root, 'links')) {
        return this.root.links.filter(link => link.href === this.pygeoapiHost + '/' + linkName)[0]
      } else {
        return {}
      }
    }
  },
  computed: {
    provider() {
      if (Object.prototype.hasOwnProperty.call(this.rootld, 'provider')) {
        return this.rootld.provider
      } else {
        return {}
      }
    },
    collections() {
      return this.getLink('collections')
    },
    conformance() {
      return this.getLink('conformance')
    },
    openApiDefinition() {
      return this.getLink('openapi')
    }
  }
}
</script>
