<template>
  <div class="main">
    <div class="container app">
      <div class="row">
        <div class="menu col-12 col-sm-4 col-md-3 col-lg-2">
          <MessageMenu />
        </div>
        <div class="col-12 col-sm-8 col-md-9 col-lg-10">
          <MessageListing />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageListing from '@/components/MessageListing'
import MessageMenu from '@/components/MessageMenu'

export default {
  name: 'Sent',
  components: {
    MessageListing,
    MessageMenu
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    this.$state.listing = 'sent'
  }
}
</script>

<style lang="scss" scoped>
</style>
