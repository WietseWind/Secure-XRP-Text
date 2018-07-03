<template>
  <div class="passphrase">
    <span @click="switchViewmode()" class="view-mode" :class="{ 'text-muted': viewMode === 'password', 'text-primary': viewMode !== 'password' }"><i class="fa fa-eye fa-fw"></i></span>
    <span class="passphrase-wordcount" :class="{ 'bg-danger': passphraseWordCount < minWords && passphraseWordCount > 0, 'bg-light text-muted': passphraseWordCount === 0, 'bg-warning': passphraseWordCount >= minWords && passphraseWordCount < safeWords, 'bg-success' : passphraseWordCount >= safeWords }">{{ passphraseWordCount }}</span>
    <input ref="inp" v-on:keyup.enter="onEnter" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" :type="viewMode" class="form-control passphrase" v-model="passphrase" :placeholder="placeholderTxt" :autofocus="autofocus" :disabled="disabled" />
  </div>
</template>

<script>
export default {
  name: 'Passphrase',
  props: {
    value: String,
    length: Number,
    safelength: Number,
    placeholder: String,
    disabled: Boolean,
    autofocus: {
      type: Boolean,
      default: true
    },
    enter: Function
  },
  data () {
    return {
      passphrase: this.value,
      viewMode: 'password'
    }
  },
  watch: {
    passphrase () {
      this.$emit('input', this.passphraseWordCount >= this.minWords ? this.formattedPassphrase : '')
    }
  },
  mounted () {
    if (this.autofocus) {
      this.$refs.inp.focus()
    }
  },
  computed: {
    placeholderTxt () {
      if (typeof this.placeholder === 'string') {
        return this.placeholder
      }
      return 'Type your passphrase' // '(min. ' + this.minWords + ' words)'
    },
    minWords () {
      return parseInt(this.length || 6)
    },
    safeWords () {
      return parseInt(this.safelength || 10)
    },
    formattedPassphrase () {
      return this.passphrase.toLowerCase().replace(/[^a-zA-Z\u00C0-\u017F ]/g, ' ').replace(/[ ]+/g, ' ').trim()
    },
    passphraseWordCount () {
      return this.formattedPassphrase.split(' ').filter((w) => {
        return w.length > 1
      }).length
    }
  },
  methods: {
    switchViewmode () {
      this.viewMode = this.viewMode === 'password' ? 'text' : 'password'
    },
    onEnter () {
      if (typeof this.enter === 'function' && this.value.length > 0) {
        this.enter()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  i.fa {
    &.fa-eye {
      cursor: pointer;
    }
  }
  div.passphrase { position: relative; }
  input.passphrase { padding-right: 62px; }
  span.view-mode {
    padding: 0px 10px;
    font-weight: bold;
    border-radius: 4px;
    position: absolute;
    margin-top: 8px;
    right: 22px;
    margin-right: 9px;
    color: white;
  }
  span.passphrase-wordcount {
    padding: 0px 8px;
    padding-top: calc((100% - (100% - 10px)) / 2);
    font-size: 0.8rem;
    width: 30px;
    text-align: center;
    height: calc(100% - 10px);
    font-weight: normal;
    border-radius: 4px;
    position: absolute;
    margin-top: .3rem;
    right: 0;
    margin-right: 5px;
    color: white;
    cursor: default;
  }
</style>
