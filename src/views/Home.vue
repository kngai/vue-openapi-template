<template>
  <div class="row">
    <div class="two-thirds column">
      <h1>{{ baseJsonld.name }}</h1>

      <p>{{ baseJsonld.description }}</p>

      <strong>Keywords</strong>: <keywords :keywords="keywords"></keywords>

      <div>
        <strong>Terms of service:</strong> <span>{{ baseJsonld.termsOfService }}</span><br>
        <strong>License:</strong> <a :href="baseJsonld.license" target="_blank">{{ baseJsonld.license }}</a>
      </div>

      <h2>pygeoapi Links</h2>
      <ul v-if="jsonLoaded">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            :rel="link.rel"
            :type="link.type"
            target="_blank"
            :hreflang="Object.prototype.hasOwnProperty.call(link, 'hreflang') ? link.hreflang : false">{{ link.title }}
          </a>
        </li>
      </ul>
    </div>

    <contact-point class="one-third column"></contact-point>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ContactPoint from '@/components/ContactPoint.vue'
import Keywords from '@/components/Keywords.vue'

export default {
  name: 'Home',
  components: {
    ContactPoint,
    Keywords
  },
  computed: {
    ...mapState({
      jsonldLoaded: state => state.base.jsonldLoaded,
      jsonLoaded: state => state.base.jsonLoaded,
    }),
    ...mapGetters('base', {
      baseJsonld: 'baseJsonld',
      keywords: 'keywords',
      links: 'links'
    })
  }
}
</script>

<style>
</style>
