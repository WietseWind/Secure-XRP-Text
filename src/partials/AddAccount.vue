<template>
  <div>
    <div class="stage-1" v-if="accountSelected.address === null">
      <p>
        To allow this app to sign and decrypt transactions (messages) it needs to now your keypair, so you need to enter either your
        family seed (<code>sXXX...</code>) secret, or your mnemonic. <b class="text-success">Your keypair, secret and mnemonic will <u>not</u> be sent over the internet</b> since this application operates fully client side.
      </p>
      <p>
        Your keypair will be stored <b class="text-success">encrypted</b> in this browser using <b>a password you will have to enter</b> after entering your family seed or your mnemonic.
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
            <form onsubmit="return false;">
              <div class="form-group">
                <label>Family seed (<code>sXXX...</code>)</label>
                <input v-on:keyup.enter="selectAccount" autofocus autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="familySeed" type="text" class="form-control form-control-lg" placeholder="Enter your family seed, eg. sXXXXXXXX...">
              </div>
            </form>
          </div>
          <div class="mnemonic" v-if="type === 'mnemonic'">
            <form onsubmit="return false;">
              <div class="form-group">
                <label>Mnemonic (words)</label>
                <textarea autofocus autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="mnemonic" class="form-control form-control-lg" rows="5" placeholder="Enter your mnemonic (lowercase words)"></textarea>
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
    </div> <!-- Stage 1 -->
    <div v-else> <!-- Stage 2 -->
      <p>
        Please enter a passphrase to encrypt the (client side) keystore.
        Every time you open (or refresh) this application, you'll have to enter a password to access your stored keys.
      </p>
      <p>
        If you forget this passphrase: no problem, you can just remove this account and add it again, as long as you know your family seed or mnemonic.
      </p>
      <p class="alert alert-primary text-center">
        <b>This application will store your keys client side! This application will <u>NEVER</u> submit your keys over the internet!</b>
      </p>
      <p class="mt-4 mb-0 pb-0 text-center"><small class="text-secondary">Account:</small></p>
      <h2 class="mt-0 pt-0 text-center"><code class="text-primary">{{ accountSelected.address }}</code></h2>
      <!-- <pre>{{ accountSelected.keypair }}</pre> -->
      <div class="row">
        <div class="d-none col-2 d-lg-block"></div>
        <div class="col-12 col-lg-8">
          <form class="pt-5" onsubmit="return false;">
            <div class="form-group">
              <label><small>Please enter a passphrase (at least 3 words) required to open this application</small><br /><b>Easy for you to remember, but are hard for others to guess.</b></label>
              <PassphraseField :enter="finish" :autofocus="true" v-model="passphrase" :length="3" :safelength="5" />
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="clearfix mt-5"></div>
    <button tabindex="-1" v-if="accountSelected.address === null" @click="$state.consent=false" class="float-left btn btn-xs btn-outline-secondary mt-2"><i class="fa fa-arrow-left"></i> Cancel</button>
    <button tabindex="-1" v-if="accountSelected.address === null" @click="selectAccount" :disabled="validAddress[type] === ''" class="float-right btn btn-lg btn-primary">Next <i class="fa fa-arrow-right"></i></button>

    <button v-if="accountSelected.address !== null" @click="accountSelected.address=null" class="float-left btn btn-xs btn-danger mt-2"><i class="fa fa-arrow-left"></i> Back</button>
    <button v-if="accountSelected.address !== null" @click="finish" :disabled="passphrase === ''" class="float-right btn btn-lg btn-primary">Finish <i class="fa fa-arrow-right"></i></button>
    <!-- <div class="clearfix"></div> -->
    <!-- <pre>{{ validAddress.keypair[type] }}</pre> -->
  </div>
</template>

<script>
import keypairs from 'ripple-keypairs'
import bip39 from 'bip39'
import bip32 from 'ripple-bip32'
import crypto from 'crypto'

import PassphraseField from '@/components/Passphrase'

export default {
  name: 'AddAccount',
  components: {
    PassphraseField
  },
  data () {
    return {
      type: 'familySeed',
      accountSelected: {
        address: null,
        keypair: {}
      },
      passphrase: '',
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
    selectAccount () {
      if (this.validAddress[this.type] !== '') {
        this.accountSelected = {
          address: this.validAddress[this.type],
          keypair: this.validAddress.keypair[this.type]
        }
      }
    },
    finish () {
      this.$state.addAccount(this.accountSelected, crypto.createHash('sha1').update(this.passphrase).digest('hex').slice(0, 32))
    },
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
