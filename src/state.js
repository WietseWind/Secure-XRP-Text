import Vue from 'vue'
import localforage from 'localforage'

localforage.config({ name: 'XrpMessaging', version: 1.0, storeName: 'xrpmessaging', description: 'Send encrypted messages on the XRPL' })

export default new Vue({
  name: 'Store',
  data () {
    return {
      ready: false,
      listing: 'inbox',
      user: { name: 'Wietse' },
      ui: { topRightMenu: false },
      consent: false,
      composer: {
        $ui: { show: false, minimized: false },
        recipient: '',
        from: '',
        subject: '',
        text: '',
        value: ''
      },
      accounts: [],
      messages: {
        $cursor: { ledger: 0 },
        inbox: [],
        sent: []
      }
    }
  },
  watch: {
    consent () {
      localforage.removeItem('state')
      this.persist()
    },
    'composer': {
      deep: true,
      handler () {
        this.persist()
      }
    }
  },
  computed: {
    composeMessageValid () {
      return (this.composer.recipient + '').trim() !== '' &&
             (this.composer.from + '').trim() !== '' &&
             (this.composer.subject + '').trim() !== '' &&
             (this.composer.text + '').trim() !== ''
    }
  },
  methods: {
    logout () {
      console.log('Destroy')
      this.accounts = []
      this.consent = false
    },
    persist () {
      console.log('Persist $state')
      localforage.setItem('state', {
        user: this.user,
        consent: this.consent,
        composer: this.composer
      })
    },
    /**
     * Composer
     */
    showComposer () {
      this.composer.$ui.show = true
      this.composer.$ui.minimized = false
    },
    composeClear () {
      this.composer.from = ''
      this.composer.receipient = ''
      this.composer.subject = ''
      this.composer.text = ''
      this.composer.value = ''
      this.composer.$ui.minimized = false
      this.composer.$ui.show = false
    }
  },
  created () {
    localforage.getItem('state').then(s => {
      if (s) {
        console.log('Assigned data: ', s)
        Object.assign(this, s)
      }
      this.ready = true
    })
  }
})
