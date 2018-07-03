<template>
  <div>
    <div class="container-fluid" id="compose" v-if="$state.composer.$ui.show" :class="{ minimized: $state.composer.$ui.minimized }">
      <div class="row">
        <div class="d-none d-md-block col-md-3 col-lg-4 col-xl-6"></div>
        <div class="col-12 col-md-9 col-lg-8 col-xl-6">
          <div class="card">
            <div class="card-header pr-1 pt-1 pb-1 pl-2" @click="showComposer">
              <button v-if="!$state.composer.$ui.minimized" @click="$state.composer.$ui.show=false" class="btn text-secondary btn-md pt-0 pb-0 ml-1 pl-1 pr-1 float-right btn-light">
                <i class="fas fa-window-close"></i>
              </button>
              <button v-if="!$state.composer.$ui.minimized" @click="$state.composer.$ui.minimized=true" class="btn text-secondary btn-md pt-0 pb-0 ml-1 pl-1 pr-1 float-right btn-light">
                <i class="fas fa-window-minimize"></i>
              </button>
              <span class="text-muted"><i class="np far fa-fw fa-envelope-open"></i>
                <span v-if="$state.composer.subject.trim() === ''">Compose message</span>
                <span v-else>
                  <span v-if="!$state.composer.$ui.minimized">Compose: <q>{{ $state.composer.subject }}</q></span>
                  <span v-else>{{ $state.composer.subject }}</span>
                </span>
              </span>
            </div>
            <div class="card-body pl-3 pt-2 pb-0 d-flex flex-column mb-0 pb-0" v-if="!$state.composer.$ui.minimized">
              <div class="form-group row pb-0 mb-2">
                <label class="col-sm-2 col-form-label">Recipient</label>
                <div class="col-sm-8">
                  <TypeAhead ref="recipient" v-model="$state.composer.recipient" :classes="'ta-recipient'" :placeholder="placeholder" src=":keyword"
                    :getResponse="getResponse" :selectFirst="true" :limit="100" :queryParamName="queryParamName"
                    :minChars="2" :delayTime="250" :onHit="onHit" :highlighting="highlighting"
                    :fetch="fetch"
                  ></TypeAhead>
                </div>
                <div class="col-sm-2 pl-0">
                  <input v-model="$state.composer.value" class="text-right form-control alert-success border-success" placeholder="+0 XRP">
                </div>
              </div>
              <div class="form-group row pb-0 mb-2" v-if="$state.accounts.length > 0">
                <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
                <div class="col-sm-10">
                  <select class="form-control form-control-sm" v-model="$state.composer.from">
                    <option value="" disabled>Select your account</option>
                    <option v-bind:key="a.address" v-for="a in $state.accounts" :value="a.address">{{ a.name }} ({{ a.address }})</option>
                  </select>
                </div>
              </div>
              <div class="form-group row pb-0 mb-2">
                <label class="col-sm-2 col-form-label col-form-label-sm">Subject</label>
                <div class="col-sm-10">
                  <input class="form-control form-control-sm" v-model="$state.composer.subject" placeholder="...">
                </div>
              </div>
              <textarea class="mt-2 mb-0 form-control" v-model.lazy="$state.composer.text" v-debounce="250" placeholder="Your message..."></textarea>
            </div>
            <div class="card-footer bg-transparent no-border bt-0 pt-2" v-if="!$state.composer.$ui.minimized">
              <div class="content-length">
                <div class="fill" :style="'width: ' + lengthPercentage + '%;'"></div>
              </div>
              <a @click="$state.composeClear(); $refs.recipient.query = ''" class="float-left mt-2 text-secondary d-block">
                <small>
                  <i class="fa fa-times"></i>
                  Destroy message
                </small>
              </a>
              <button class="btn float-right" :disabled="!$state.composeMessageValid" :class="{ 'btn-primary' : $state.composeMessageValid, 'btn-light text-muted' : !$state.composeMessageValid }"><i class="far fa-paper-plane"></i> Send message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Debounce from 'v-debounce'
import TypeAhead from 'vue2-bootstrap4-typeahead'

export default {
  name: 'Composer',
  directives: {
    Debounce
  },
  components: {
    TypeAhead
  },
  data () {
    return {
      editRecipient: false,
      queryParamName: ':keyword',
      placeholder: 'Contact name or account address...',
      lengthPercentage: 0
    }
  },
  watch: {
  },
  methods: {
    focusRecipient () {
      //
    },
    showComposer (e) {
      let tag = e.target.tagName.toLowerCase()
      if (tag !== 'button' && tag !== 'i') {
        this.$state.composer.$ui.minimized = false
        if (!this.$state.composer.$ui.show) {
          this.$state.composer.$ui.show = true
        }
      }
    },
    /**
     * Suggester
     */
    getResponse (response) {
      return response
    },
    onHit (item) {
      if (typeof item !== 'undefined') {
        this.$state.composer.recipient = item
      }
    },
    highlighting (item) {
      return item
    },
    fetch (query) {
      return new Promise((resolve, reject) => {
        resolve([
          'Pepper Parrot',
          'Pepper Potts',
          'Pepper Parrot (Test Wallet)'
        ])
      })
    }
  },
  mounted () {
    if ((this.$state.composer.recipient + '').trim() !== '') {
      this.$refs.recipient.query = (this.$state.composer.recipient + '').trim()
    }
  }
}
</script>

<style lang="scss">
  // Todo: check if composing
  body {
    // overflow: hidden;
  }
  a.dropdown-item.active {
    color: white;
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
  .ta-recipient input {
    // font-weight: bold;
    padding-left: .5em;
  }
</style>

<style lang="scss" scoped>
  .bt-0 { border-top: 1px solid transparent; }
  a { cursor: pointer; }
  .np { pointer-events: none; }
  div.container-fluid#compose {
    position: fixed;
    bottom: 0;
    transform: scale(1);
    z-index: 10;

    &.minimized {
      div.row {
        div.card {
          cursor: pointer;
          float: right;
          min-width: 220px;
          max-width: 15vw;
          white-space: nowrap;
          -webkit-box-shadow: -5px -2px 40px -7px rgba(0,0,0,0);
          -moz-box-shadow: -5px -2px 40px -7px rgba(0,0,0,0);
          box-shadow: -5px -2px 40px -7px rgba(0,0,0,0);
          transition: box-shadow 0.3s linear;

          &:hover {
            -webkit-box-shadow: -5px -2px 40px -7px rgba(0,0,0,0.14);
            -moz-box-shadow: -5px -2px 40px -7px rgba(0,0,0,0.14);
            box-shadow: -5px -2px 40px -7px rgba(0,0,0,0.14);
          }

          div.card-header {
            border-bottom: none;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    div.row {
      div.card {
        -webkit-box-shadow: -2px -2px 76px -30px rgba(0,0,0,0.74);
        -moz-box-shadow: -2px -2px 76px -30px rgba(0,0,0,0.74);
        box-shadow: -2px -2px 76px -30px rgba(0,0,0,0.74);

        border-bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        div.card-body {
          min-height: 45vh;

          textarea {
            resize: none;
            flex: 1;
          }
        }

        div.card-footer {
          position: relative;
          overflow: hidden;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;

          div.content-length {
            border: none;
            background-color: #f0f0f0;
            width: 100%;
            height: 2px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: visible;

            .fill {
              overflow: visible; display: block; position: absolute;
              height: 100%; width: 0; max-width: 100%; left: 0; top: 0; bottom: 0;
              background-color: rgba(87, 202, 104, 1);
              transition: width 0.7s ease-in-out;

              &:before {
                content: ''; display: block; position: absolute;
                right: 3px; top: 2px; height: 100%; width: 3px;
                box-shadow:5px -1px 5px rgba(87, 202, 104, 1);
              }

              &:after {
                content: ''; display: block; position: absolute;
                right: 0px; top: -10px; height: 10px; width: 150%; min-width: 100px;
                background-color: #ca0000;
                -webkit-box-shadow: inset 10px -2px 2px rgba(87, 202, 104, .45);
                   -moz-box-shadow: inset 10px -2px 2px rgba(87, 202, 104, .45);
                        box-shadow: inset 10px -2px 2px rgba(87, 202, 104, .45);
                background: transparent;
                -webkit-mask-image: -webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0)), to(rgba(0,0,0,1)));
                   -moz-mask-image: -webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0)), to(rgba(0,0,0,1)));
                        mask-image: -webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0)), to(rgba(0,0,0,1)));
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    // Todo: check if composing
    div.container-fluid#compose {
      width: 100%;
      padding: 0;
      margin: 0;
      height: 100%;

      div.row {
        height: 100%;
        div.card {
          height: 100%;
        }
      }

      &.minimized {
        display: none;
      }
    }
  }
</style>
