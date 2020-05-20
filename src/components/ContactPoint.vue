<template>
  <div v-if="jsonldLoaded">
    <div>
      <strong>{{ baseJsonld.name }}</strong><br>
      <a :href="baseJsonld.url" target="_blank">{{ baseJsonld.url }}</a>
    </div>
    <br><br>
    <div>
      <strong>Address</strong><br>
      {{ address.streetAddress }}<br>
      {{ address.addressLocality }}<br>
      {{ address.addressRegion }}<br>
      {{ address.postalCode }}<br>
      {{ address.addressCountry }}<br>
    </div>
    <br><br>
    <div>
      <strong>Contact Point</strong><br>
      Email: <a :href="'mailto:' + contactPoint.email ">{{ contactPoint.email }}</a><br>
      Telephone: <a :href="'tel:' + contactPoint.telephone">{{ contactPoint.telephone }}</a><br>
      Fax: <a :href="'tel:' + contactPoint.faxNumber">{{ contactPoint.faxNumber }}</a><br>
      URL: <a :href="contactPoint.url">{{ contactPoint.url }}</a>
    </div>
    <br><br>
    <div>
      <strong>{{ hoursAvailable.opens }}</strong><br>
      <span>{{ hoursAvailable.description }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ContactPoint',
  computed: {
    ...mapState({
      jsonldLoaded: state => state.base.jsonldLoaded
    }),
    ...mapGetters('base', {
      baseJsonld: 'baseJsonld',
      contactPoint: 'contactPoint',
      address: 'address',
      hoursAvailable: 'hoursAvailable'
    })
  }
}
</script>

<style>
</style>
