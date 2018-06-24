<template>
  <div class="container">
    <div class="mt-5 text-center">
      <h1 class="text-primary">
        <i class="xrp">x</i> <b>XRP Text</b>
        <br />
      </h1>
      <small class="slogan text-secondary"><i class="far fa-comment-alt"></i> Secure Messaging</small>
      <div v-if="!this.$slots.default">
        <div class="row">
          <div class="col-4"></div>
          <div class="col-4"><hr class="mt-5 mb-5" /></div>
        </div>
        <h3 v-if="message" class="text-muted"><i class="fas fa-circle-notch fa-spin"></i> {{ message }}</h3>
      </div>
    </div>
    <div v-if="this.$slots.default">
      <br /><br />
      <div class="card mb-5">
        <h5 class="card-header">{{ message }}</h5>
        <div class="card-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLoading',
  props: {
    message: {
      required: true,
      type: String
    }
  },
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
