<template>
  <div>
    <p>
      This project is <b>merely a proof of concept</b>. The XRPL allows you to send <i>Memos</i> with transactions. The intended use is to add small amounts of
      metadata to transactions. Since up to 1KB of data can be attached, this XRPL feature can be used to send text.
    </p>
    <p>
      Every XRP account <a href="https://xrpcommunity.blog/keys-are-key-secret-keys-signing-transactions/" target="_blank">consists of a public key and
      a private key</a> and the <a href="https://dv7ibjc.dlvr.cloud/shared%20secret.png" target="_blank">Diffie Hellman algorithm</a> allows you to get
      a shared secret based on your private key and someone else's public key (and the other way around). Combining this with the XRPL feature to
      send <i>Memos</i>, you can <b>send encrypted messages only you and the recipient can decode and read</b> 😃
    </p>
    <p>
      Here is my <a href="https://twitter.com/WietseWind/status/1010177041143140352" target="_blank"><i class="fab fa-twitter"></i> announcement</a> about this project.
      You can find the <a href="https://github.com/WietseWind/Secure-XRP-Text" target="_blank"><i class="fab fa-github"></i> source code</a> at Github.
    </p>
    <h4><b>Please read carefully:</b></h4>
    <ul>
      <li class="mt-1 mb-1"><b class="text-danger">This is a proof of concept.</b> Secure messaging using XRP transactions with large <i>Memos</i> is not suited for large scale adoption.</li>
      <li class="mt-1 mb-1"><b class="text-danger">This is a beta.</b> I can think of <a href="https://github.com/WietseWind/Secure-XRP-Text/labels/enhancement" target="_blank"><b>many things</b> (that would require more coding)</a> to create a first stable version. Please don't expect me to add these features any time soon (if ever).</li>
      <li class="mt-1 mb-1"><b class="text-danger">Make sure you trust your device.</b> You need to enter your secret (family seed / mnemonic) in the next screen. This application needs to be able to sign and decrypt messages on your behalf. Please <b>do your own research</b> and make sure:
        <ol>
          <li>You trust
            <a href="https://twitter.com/WietseWind" target="_blank"><i class="fab fa-twitter"></i> me</a>
            <a href="https://www.reddit.com/user/pepperew" target="_blank"><i class="fab fa-reddit"></i></a>
            <a href="https://github.com/WietseWind/" target="_blank"><i class="fab fa-github"></i></a>
            and this
            <a href="https://github.com/WietseWind/Secure-XRP-Text" target="_blank"><i class="fab fa-github"></i> application</a></li>
          <li>You trust your (this) device</li>
          <li>You are not using your HODL wallet with all your funds</li>
        </ol>
      </li>
      <li v-show="approvals > 0" class="mt-1 mb-1"><b class="text-danger">Please think very carefully about what you are going to send to someone else.</b>
        <div class="alert alert-warning text-center">The cryptography used to encrypt your messages <b class="text-primary">is safe today</b>, but <b class="text-danger">may not be in the future</b> (eg. due to quantum computing).</div>
      </li>
      <li v-show="approvals > 1" class="mt-1 mb-1"><b class="text-danger">Please think <u>again</u> about what you are going to send to someone else.</b>
        <div class="alert alert-warning text-center">Your message will be <b>forever</b> recorded on the XRPL. <b class="text-danger">There is no way to remove your message.</b> Please think about what you are sending. Your message is probably more permanent than a tattoo 😇</div>
      </li>
    </ul>
    <button v-if="!hideApproval" @click="approvals++" class="btn btn-block btn-lg btn-primary">
      <span v-if="approvals === 0"><i class="fa fa-check"></i> OK, I understand</span>
      <span v-if="approvals === 1"><i class="fa fa-check"></i> Sure, I will think carefully about what I am going to send</span>
      <span v-if="approvals === 2">Got it. I still want to continue <i class="fa fa-arrow-right"></i></span>
    </button>
    <button v-else disabled class="disabled btn btn-block btn-lg btn-ouline-secondary">Please read...</button>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  data () {
    return {
      hideApproval: false,
      approvals: 0
    }
  },
  watch: {
    approvals () {
      if (this.approvals === 3) {
        this.$state.consent = true
      } else {
        this.hideApproval = true
        setTimeout(() => {
          this.hideApproval = false
        }, 5000)
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
</style>
