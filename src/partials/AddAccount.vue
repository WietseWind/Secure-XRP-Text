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
              <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="familySeed" type="text" class="form-control form-control-lg" placeholder="Enter your family seed, eg. sXXXXXXXX...">
            </div>
          </form>
        </div>
        <div class="mnemonic" v-if="type === 'mnemonic'">
          <form>
            <div class="form-group">
              <label>Mnemonic (words)</label>
              <textarea autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="mnemonic" class="form-control form-control-lg" rows="5" placeholder="Enter your mnemonic (lowercase words)"></textarea>
            </div>
            <div class="form-group form-check">
              <input v-model="useMnemonicPassphrase" type="checkbox" class="form-check-input" id="useMnemonicPassphrase">
              <label class="form-check-label" for="useMnemonicPassphrase">My mnemonic has a passphrase ("25th word")</label>
            </div>
            <div class="form-group" v-if="useMnemonicPassphrase">
              <!-- <label>Passphrase ("25th word")</label> -->
              <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="mnemonicPassphrase" type="text" class="form-control form-control-lg" placeholder="Enter your mnemonic passphrase">
            </div>
          </form>
        </div>
        <h4 class="text-center" v-if="validAddress[type] && !validAddress.calculating">
          <small class="text-muted">Your calculated account address:</small><br />
          <code class="d-inline-block pt-2 text-primary"><b>{{ validAddress[type] }}</b></code>
        </h4>
        <div class="alert text-center" v-if="validAddress.calculating" :class="{ 'alert-secondary text-muted': 1 === 1 }">
          <i class="fas fa-circle-notch fa-spin"></i> Calculating account address...
        </div>
      </div>
    </div>

    <div class="clearfix mt-5"></div>
    <button @click="$state.consent=false" class="float-left btn btn-xs btn-outline-secondary mt-2"><i class="fa fa-arrow-left"></i> Cancel</button>
    <button :disabled="validAddress[type] === ''" class="float-right btn btn-lg btn-primary">Next <i class="fa fa-arrow-right"></i></button>
    <!-- <div class="clearfix"></div> -->
    <!-- <pre>{{ validAddress.keypair[type] }}</pre> -->
  </div>
</template>

<script>
import keypairs from 'ripple-keypairs'
import bip39 from 'bip39'
import bip32 from 'ripple-bip32'

export default {
  name: 'AddAccount',
  data () {
    return {
      type: 'familySeed',
      useMnemonicPassphrase: false,
      familySeed: '',
      mnemonic: '',
      mnemonicPassphrase: '',
      validAddress: {
        calculating: false,
        familySeed: '',
        mnemonic: '',
        keypair: {
          familySeed: {
            privateKey: '',
            publicKey: ''
          },
          mnemonic: {
            privateKey: '',
            publicKey: ''
          }
        }
      }
    }
  },
  watch: {
    type () {
      // recalculate
    },
    familySeed () {
      this.validAddress.familySeed = ''
      let familySeed = this.familySeed.trim()
      if (familySeed.match(/^s[0-9a-zA-Z]{20,30}/) && familySeed.length > 26) {
        try {
          let keypair = keypairs.deriveKeypair(this.familySeed)
          let address = keypairs.deriveAddress(keypair.publicKey)
          this.validAddress.familySeed = address
          this.validAddress.keypair[this.type].publicKey = keypair.publicKey
          this.validAddress.keypair[this.type].privateKey = keypair.privateKey
        } catch (e) {
          console.log(e)
        }
      }
    },
    mnemonic () {
      this.mnemonicToAccount()
    },
    useMnemonicPassphrase () {
      if (!this.useMnemonicPassphrase) {
        if (this.mnemonicPassphrase.trim() !== '') {
          this.validAddress.calculating = true
          this.mnemonicPassphrase = ''
          this.validAddress.mnemonic = ''
        }
      }
    },
    mnemonicPassphrase () {
      this.mnemonicToAccount()
    }
  },
  methods: {
    mnemonicToAccount () {
      clearTimeout(window.mnemonicCalculate)
      if (this.mnemonic.trim().toLowerCase().replace(/[ ]+/g, ' ').split(' ').length >= 24) {
        window.mnemonicCalculate = setTimeout(() => {
          this.validAddress.mnemonic = ''
          this.validAddress.calculating = true
          setTimeout(() => {
            try {
              let seed = bip39.mnemonicToSeed(this.mnemonic.trim().toLowerCase().replace(/[ ]+/g, ' '), this.useMnemonicPassphrase && this.mnemonicPassphrase.trim() !== '' ? this.mnemonicPassphrase : null)
              let m = bip32.fromSeedBuffer(seed)
              let keyPair = m.derivePath("m/44'/144'/0'/0/0").keyPair.getKeyPairs()
              this.validAddress.keypair[this.type].publicKey = keyPair.publicKey
              this.validAddress.keypair[this.type].privateKey = keyPair.privateKey
              this.validAddress.mnemonic = keypairs.deriveAddress(keyPair.publicKey)
              this.validAddress.calculating = false
            } catch (e) {
              this.validAddress.calculating = false
              console.log(e)
            }
          }, 100)
        }, 1000)
      } else {
        this.validAddress.mnemonic = ''
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  textarea { resize: none; }
  label[for] { cursor: pointer; }
</style>
