<template>
  <div>
    <button @click="$state.showComposer()" class="mb-3 btn btn-md btn-block btn-danger">
      <i class="fas fa-plus-circle"></i> Compose
    </button>
    <div class="list-group mb-3">
      <router-link :to="{ name: 'Home' }" class="list-group-item pt-2 pb-2 pl-3 pr-3 d-flex justify-content-between align-items-center list-group-item-action" :class="{ active: $state.listing === 'inbox' }">
        Inbox
        <span class="float-right badge badge-light text-primary">14</span>
      </router-link>
      <router-link :to="{ name: 'Sent' }" class="list-group-item pt-2 pb-2 pl-3 pr-3 d-flex justify-content-between align-items-center list-group-item-action" :class="{ active: $state.listing === 'sent' }">
        Sent
      </router-link>
      <!-- <a class="list-group-item pt-2 pb-2 pl-3 pr-3 d-flex justify-content-between align-items-center list-group-item-action" href="#">
        Drafts
        <span class="float-right badge badge-secondary">3</span>
      </a> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageMenu',
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
</style>
