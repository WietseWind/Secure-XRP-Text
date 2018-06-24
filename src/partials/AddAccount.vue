<template>
  <div>
    <p>
      To allow this app to sign and decrypt transactions (messages) it needs to now your keypair, so you need to enter either your
      family seed (<code>sXXX...</code>) secret, or your mnemonic. <b class="text-success">Your keypair, secret and mnemonic will <u>not</u> be sent over the internet</b> since this application operates fully client side.
    </p>
    <p>
      Your keypair will be stored <b class="text-success">encrypted</b> in this browser using the password you will have to enter after entering your family seed or your mnemonic.
    </p>
    <p class="alert alert-warning text-center">
      Only the family seed/mnemonic on this device if you trust this device and the amount of funds in your account is limited (eg. testing wallet).
    </p>

    <div class="text-center mb-4">
      <div class="btn-group">
      <button @click="type='familySeed'" type="button" class="btn" :class="{ 'btn-primary': type === 'familySeed', 'btn-outline-primary': type !== 'familySeed' }">Family seed (<code :class="{ 'text-white': type === 'familySeed' }">sXXX...</code>)</button>
      <button @click="type='mnemonic'" type="button" class="btn" :class="{ 'btn-primary': type === 'mnemonic', 'btn-outline-primary': type !== 'mnemonic' }">Mnemonic (words)</button>
      </div>
    </div>

    <div class="row">
      <div class="d-none col-2 d-lg-block"></div>
      <div class="col-12 col-lg-8">
        <div class="familySeed" v-if="type === 'familySeed'">
          <form>
            <div class="form-group">
              <label>Family seed (<code>sXXX...</code>)</label>
              <input type="text" class="form-control form-control-lg" placeholder="Enter your family seed, eg. sXXXXXXXX...">
            </div>
          </form>
        </div>
        <div class="mnemonic" v-if="type === 'mnemonic'">
          <form>
            <div class="form-group">
              <label>Mnemonic (words)</label>
              <textarea class="form-control form-control-lg" rows="5" placeholder="Enter your mnemonic (lowercase words)"></textarea>
            </div>
            <div class="form-group form-check">
              <input v-model="mnemonicPassphrase" type="checkbox" class="form-check-input" id="mnemonicPassphrase">
              <label class="form-check-label" for="mnemonicPassphrase">My mnemonic has a passphrase ("25th word")</label>
            </div>
            <div class="form-group" v-if="mnemonicPassphrase">
              <!-- <label>Passphrase ("25th word")</label> -->
              <input type="text" class="form-control form-control-lg" placeholder="Enter your mnemonic passphrase">
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="clearfix mt-5"></div>
    <button @click="$state.consent=false" class="float-left btn btn-xs btn-outline-secondary mt-2"><i class="fa fa-arrow-left"></i> Cancel</button>
    <button disabled class="float-right btn btn-lg btn-primary">Next <i class="fa fa-arrow-right"></i></button>
  </div>
</template>

<script>
export default {
  name: 'AddAccount',
  data () {
    return {
      type: 'familySeed',
      mnemonicPassphrase: false
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
  textarea { resize: none; }
  label[for] { cursor: pointer; }
</style>
