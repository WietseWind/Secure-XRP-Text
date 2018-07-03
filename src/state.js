import Vue from 'vue'
import localforage from 'localforage'
import crypto from 'crypto'

localforage.config({ name: 'XrpMessaging', version: 1.0, storeName: 'xrpmessaging', description: 'Send encrypted messages on the XRPL' })

export default new Vue({
  name: 'Store',
  data () {
    return {
      ready: false,
      listing: 'inbox',
      user: { name: '' },
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
      encryptedAccounts: [],
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
    },
    'encryptedAccounts': {
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
    addAccount (accountData, passHash) {
      this.encryptedAccounts.push({
        address: accountData.address,
        name: accountData.address,
        encryptedKeypair: this.encrypt(JSON.stringify(accountData.keypair), passHash)
      })
      this.accounts.push({ address: accountData.address, name: accountData.address, keypair: accountData.keypair })
    },
    login (passHash) {
      try {
        let decrypted = this.decrypt(this.encryptedAccounts[0].encryptedKeypair, passHash)
        let decryptedString = Buffer.from(decrypted, 'hex').toString('utf-8')
        let decryptedKeypair = JSON.parse(decryptedString)
        if (typeof decryptedKeypair.privateKey === 'string' && typeof decryptedKeypair.publicKey === 'string') {
          this.accounts.push(Object.assign(this.encryptedAccounts[0], {
            keypair: decryptedKeypair
          }))
        }
      } catch (e) {
        console.log('Unable to decrypt', e)
      }
    },
    encrypt (text, secret) {
      const IV_LENGTH = 16
      let iv = crypto.randomBytes(IV_LENGTH)
      let cipher = crypto.createCipheriv('aes-' + (secret.length * 4) + '-cbc', Buffer.from(secret, 'hex'), iv)
      let encrypted = cipher.update(text)
      encrypted = Buffer.concat([encrypted, cipher.final()])
      return iv.toString('hex') + encrypted.toString('hex')
    },
    decrypt (text, secret) {
      let iv = Buffer.from(text.substr(0, 32), 'hex')
      let encryptedText = Buffer.from(text.substr(32), 'hex')
      let decipher = crypto.createDecipheriv('aes-' + (secret.length * 4) + '-cbc', Buffer.from(secret, 'hex'), iv)
      let decrypted = decipher.update(encryptedText)
      decrypted = Buffer.concat([decrypted, decipher.final()])
      return decrypted.toString('hex').toUpperCase()
    },
    logout () {
      console.log('Logout')
      this.accounts = []
    },
    purge () {
      console.log('Destroy (Purge)')
      this.accounts = []
      this.encryptedAccounts = []
      this.consent = false
    },
    persist () {
      console.log('Persist $state')
      localforage.setItem('state', {
        user: this.user,
        consent: this.consent,
        composer: this.composer,
        encryptedAccounts: this.encryptedAccounts
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
