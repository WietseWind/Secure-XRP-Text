<template>
  <div>
    <p class="mt-0 mb-0 pb-0 text-center"><small class="text-secondary">Account:</small></p>
    <h2 class="mt-0 pt-0 text-center"><code class="text-primary">{{ $state.encryptedAccounts[0].address }}</code></h2>
    <!-- <pre>{{ accountSelected.keypair }}</pre> -->
    <div class="row">
      <div class="d-none col-2 d-lg-block"></div>
      <div class="col-12 col-lg-8">
        <form class="pt-5" onsubmit="return false;">
          <div class="form-group">
            <label><b>Please enter your passphrase:</b></label>
            <PassphraseField :enter="login" :autofocus="true" v-model="passphrase" :length="3" :safelength="5" />
          </div>
          <div class="form-group">
            <p class="alert alert-warning text-center" v-if="triedToLogin > 1">
              <small>Forgot your passphrase? Click the <b>Reset</b> button (bottom left) to purge te application data and reconfigure your account (allowing you to enter a new passphrase).</small>
            </p>
          </div>
        </form>
      </div>
    </div>

    <div class="clearfix mt-5"></div>
    <button tabindex="-1" @click="$state.purge" :disabled="triedToLogin < 0" class="float-left btn btn-xs btn-outline-secondary mt-2"><i class="fa fa-trash"></i> Reset</button>
    <button @click="login" :disabled="passphrase === ''" class="float-right btn btn-lg btn-primary">Login <i class="fa fa-arrow-right"></i></button>
  </div>
</template>

<script>
import crypto from 'crypto'
import PassphraseField from '@/components/Passphrase'

export default {
  name: 'AddAccount',
  components: {
    PassphraseField
  },
  data () {
    return {
      passphrase: '',
      triedToLogin: 0
    }
  },
  watch: {
  },
  methods: {
    login () {
      this.triedToLogin++
      this.$state.login(crypto.createHash('sha1').update(this.passphrase).digest('hex').slice(0, 32))
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  label[for] { cursor: pointer; }
</style>
