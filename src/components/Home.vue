<template>
  <div class="main">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="header container-fluid bg-light">
        <div class="container">
          <router-link to="/" class="logo">
            <i class="xrp">x</i> <b>XRP Text</b>
          </router-link>
          <small class="slogan text-secondary"><i class="far fa-comment-alt"></i> Secure Messaging</small>
          <div class="float-right col-1 col-md-2 col-lg-3 col-xl-2 text-right pr-0">
            <div class="btn-group float-right">
              <button v-on:blur="ui.trMenu=false" @click="ui.trMenu=!ui.trMenu" type="button" class="btn bg-light btn-outline-none">
                <span class="d-none d-sm-inline-block">{{ ui.userName }}</span>
                <i class="fas fa-caret-down"></i>
              </button>
            </div>
            <div v-if="ui.trMenu" class="dropdown-menu d-block dropdown-menu-right">
              <router-link tag="button" to="/" class="dropdown-item" type="router-link">Accounts</router-link>
              <router-link tag="button" to="/" class="dropdown-item" type="router-link">Keypairs</router-link>
              <div class="dropdown-divider"></div>
              <router-link tag="button" to="/" class="dropdown-item text-muted" type="router-link"><i class="fas fa-sign-out-alt"></i> Sign out</router-link>
            </div>
          </div>
          <div class="float-right d-none d-md-block col-5 col-lg-4 col-xl-5">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search...">
              <div class="input-group-append">
                <button class="btn btn-secondary" type="button">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container app">
      <div class="row">
        <div class="menu col-12 col-sm-4 col-md-3 col-lg-2">
          <router-link to="/" class="mb-3 btn btn-md btn-block btn-danger">
            <i class="fas fa-plus-circle"></i> Compose
          </router-link>
          <div class="list-group mb-4">
            <a class="list-group-item pt-2 pb-2 pl-3 pr-3 d-flex justify-content-between align-items-center list-group-item-action active" href="#">
              Inbox
              <span class="float-right badge badge-light text-primary">14</span>
            </a>
            <a class="list-group-item pt-2 pb-2 pl-3 pr-3 d-flex justify-content-between align-items-center list-group-item-action" href="#">
              Sent
            </a>
            <a class="list-group-item pt-2 pb-2 pl-3 pr-3 d-flex justify-content-between align-items-center list-group-item-action" href="#">
              Drafts
              <span class="float-right badge badge-secondary">3</span>
            </a>
          </div>
        </div>
        <div class="col-12 col-sm-8 col-md-9 col-lg-10">
          <h2 class="float-left text-dark"><i class="fas fa-inbox"></i> Inbox</h2>
          <button class="mb-3 float-right btn btn-md btn-outline-secondary">
            <i class="fas fa-sync-alt fa-fw"></i>
          </button>
          <div class="clearfix"></div>
          <div class="content">
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action d-block d-md-flex list-group-item-warning pl-0 pl-md-3 pr-0 pr-md-3 pt-2 pb-2 align-items-center">
                <i class="d-none d-md-inline-block far fa-fw fa-envelope"></i>
                <div class="d-block d-md-none pr-3 float-right text-right"><small>13:22</small></div>
                <div class="col-9 col-md-3">
                  <b>John Doe</b>
                </div>
                <div class="col-12 col-md-6"><b>Dapibus ac facilisis in</b></div>
                <div class="d-none d-md-inline-block col-12 col-md-3 text-right"><b>13:22</b></div>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-block d-md-flex list-group-item-warning pl-0 pl-md-3 pr-0 pr-md-3 pt-2 pb-2 align-items-center">
                <i class="d-none d-md-inline-block far fa-fw fa-envelope"></i>
                <div class="d-block d-md-none pr-3 float-right text-right"><small>12:15</small></div>
                <div class="col-9 col-md-3">
                  <b>John Doe</b>
                </div>
                <div class="col-12 col-md-6"><b>Dapibus ac facilisis in</b></div>
                <div class="d-none d-md-inline-block col-12 col-md-3 text-right"><b>12:15</b></div>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-block d-md-flex pl-0 pl-md-3 pr-0 pr-md-3 pt-2 pb-2 align-items-center">
                <i class="d-none d-md-inline-block text-muted far fa-fw fa-envelope-open"></i>
                <div class="d-block d-md-none pr-3 float-right text-right"><small>Yesterday</small></div>
                <div class="col-9 col-md-3">
                  rXyZ123AbCf...
                </div>
                <div class="col-12 col-md-6 col-lg-7">
                  <div class="d-none d-md-block progress animated-loader"></div>
                  <div class="mt-1 d-block d-md-none progress animated-loader"></div>
                </div>
                <div class="d-none d-md-inline-block col-12 col-md-3 col-lg-2 text-right">Yesterday</div>
              </a>
              <!-- <div class="col-8 col-md-9 col-lg-10">
                <div class="d-none d-md-block progress animated-loader"></div>
                <div class="mt-1 d-block d-md-none progress animated-loader"></div>
              </div> -->
              <a href="#" class="list-group-item list-group-item-action d-block d-md-flex pl-0 pl-md-3 pr-0 pr-md-3 pt-2 pb-2 align-items-center">
                <i class="d-none d-md-inline-block text-muted far fa-fw fa-envelope-open"></i>
                <div class="d-block d-md-none pr-3 float-right text-right"><small>Yesterday</small></div>
                <div class="col-9 col-md-3">
                  John Doe
                </div>
                <div class="col-12 col-md-6 col-lg-7">Dapibus ac facilisis in</div>
                <div class="d-none d-md-inline-block col-12 col-md-3 col-lg-2 text-right">Yesterday</div>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-block d-md-flex pl-0 pl-md-3 pr-0 pr-md-3 pt-2 pb-2 align-items-center">
                <i class="d-none d-md-inline-block text-muted far fa-fw fa-envelope-open"></i>
                <div class="d-block d-md-none pr-3 float-right text-right"><small>Yesterday</small></div>
                <div class="col-9 col-md-3">
                  John Doe
                </div>
                <div class="col-12 col-md-6 col-lg-7">Dapibus ac facilisis in</div>
                <div class="d-none d-md-inline-block col-12 col-md-3 col-lg-2 text-right">Yesterday</div>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-block d-md-flex pl-0 pl-md-3 pr-0 pr-md-3 pt-2 pb-2 align-items-center">
                <i class="d-none d-md-inline-block text-muted far fa-fw fa-envelope-open"></i>
                <div class="d-block d-md-none pr-3 float-right text-right"><small>Yesterday</small></div>
                <div class="col-9 col-md-3">
                  John Doe
                </div>
                <div class="col-12 col-md-6 col-lg-7">Dapibus ac facilisis in</div>
                <div class="d-none d-md-inline-block col-12 col-md-3 col-lg-2 text-right">Yesterday</div>
              </a>
            </div>
          </div>
          <br />
          <pre style="word-break: break-all; overflow-wrap: break-word; white-space: normal;" v-html="enc"></pre>
        </div><!-- End inbox main content -->
      </div>
    </div>
    <div class="container-fluid" id="compose">
      <div class="row">
        <div class="d-none d-md-block col-md-3 col-lg-4 col-xl-6"></div>
        <div class="col-12 col-md-9 col-lg-8 col-xl-6">
          <div class="card">
            <div class="card-header pr-1 pt-1 pb-1 pl-3">
              <button class="btn text-primary btn-md pt-0 pb-0 ml-1 pl-1 pr-1 float-right btn-light">
                <i class="fas fa-window-close"></i>
              </button>
              <button class="btn text-primary btn-md pt-0 pb-0 ml-1 pl-1 pr-1 float-right btn-light">
                <i class="fas fa-window-minimize"></i>
              </button>
              <span class="text-muted"><i class="far fa-envelope-open"></i> Compose message</span>
            </div>
            <div class="card-body pl-3 pt-2 pb-3 d-flex flex-column mb-0 pb-0">
              <h5 class="card-title">
                The form
              </h5>
              <p class="card-text">
                ... over here.
              </p>
              <textarea name="" id="" class="form-control" v-model="text"></textarea>
            </div>
            <div class="card-footer bg-transparent border-white mt-0 pt-0">
              <button href="#" class="btn btn-primary float-right"><i class="far fa-paper-plane"></i> Send message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const zlib = require('zlib')

export default {
  name: 'Home',
  data () {
    return {
      ui: {
        userName: 'Wietse',
        trMenu: false
      },
      text: '',
      enc: ''
    }
  },
  watch: {
    text () {
      /**
       * TODO:
       *   - ADD ENCRYPTION, LENGTH?
       *   - SPLIT MESSAGE ON MULTIPLE, IF SO: 2ND MEMO, GUID + MSG X/Y
       */
      return zlib.deflate(Buffer.from(this.text, 'utf-8'), (err, r) => {
        if (!err) {
          let deflated = r.toString('hex').toUpperCase()
          let deflateLength = deflated.length
          let textLength = Buffer.from(this.text, 'utf-8').toString('hex').toUpperCase().length
          let decoded = ''
          const render = () => {
            let memos = {
              'Memos': [
                {
                  'Memo': {
                    'MemoType': Buffer.from('SXT', 'utf-8').toString('hex').toUpperCase(),
                    'MemoFormat': Buffer.from('D', 'utf-8').toString('hex').toUpperCase(),
                    'MemoData': deflated
                  }
                }
              ]
            }
            this.enc = `TextLength:&nbsp;&nbsp;&nbsp;&nbsp;${textLength}<br />DeflateLength: ${deflateLength}<br />${deflated}<br />--<br />${decoded}<br /><hr />${JSON.stringify(memos)}`
            // DeflateLength up to 1966 = OK
          }
          render()
          zlib.inflate(Buffer.from(deflated, 'hex'), (err, r) => {
            if (!err) {
              decoded = r.toString('utf-8')
              render()
            } else {
              console.log(err)
            }
          })
        } else {
          console.log(err)
        }
      })
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  // Todo: check if composing
  body {
    // overflow: hidden;
  }
</style>

<style lang="scss" scoped>
  div.container.app { padding-top: 1em; }

  div.container-fluid#compose {
    position: fixed;
    bottom: 0;
    transform: scale(1);
    z-index: 10;

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
    }
  }

  div.header {
    padding-top: 0.3em;
    padding-bottom: 0.3em;

    .logo {
      font-size: 1.5em;
      top: .06em;
      position: relative;
      &:hover {
        text-decoration: none;
      }
    }

    .dropdown-menu {
      margin-top: 6px;
      right: -3px;

      .dropdown-item { cursor: pointer; }
    }

    small.slogan {
      font-size: .8em;
      position: relative;
      display: inline-block;
      top: -0.8em;
      padding-left: 0.8em;
    }
  }

  .animated-loader {
    color: transparent;
    background: linear-gradient(105deg, rgba(0,0,0,.02), rgba(0,0,0,.08), rgba(0,0,0,.02));
    background-size: 500% 100%;
    -webkit-animation: Gradient 5s linear infinite;
    -moz-animation: Gradient 5s linear infinite;
    animation: Gradient 5s linear infinite;
  }

  @-webkit-keyframes Gradient {
    0% { background-position: 0% 50% }
    100% { background-position: 500% 50% }
  }

  @-moz-keyframes Gradient {
    0% { background-position: 0% 50% }
    100% { background-position: 500% 50% }
  }

  @keyframes Gradient {
    0% { background-position: 0% 50% }
    100% { background-position: 500% 50% }
  }
</style>
