<template>
  <div v-if="providerLoaded">
    <div>
      <strong>{{ provider.name }}</strong><br>
      <a :href="provider.url" target="_blank">{{ provider.url }}</a>
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
export default {
  name: 'ContactPoint',
  props: {
    provider: Object
  },
  computed: {
    providerLoaded() {
      return Object.keys(this.provider).length > 0
    },
    contactPoint() {
      return this.provider.contactPoint
    },
    hoursAvailable() {
      return this.contactPoint.hoursAvailable
    },
    address() {
      return this.provider.address
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
