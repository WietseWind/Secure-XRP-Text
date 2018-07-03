<template>
  <div id="app">
    <!-- <div id="not-ready" v-if="!$state.ready">
      <AppLoading message="Loading application" />
    </div> -->
    <div id="no-consent" v-if="$state.ready && !$state.consent">
      <AppLoading message="Welcome! A few notes..."><Intro /></AppLoading>
    </div>
    <div id="no-consent" v-if="$state.ready && $state.consent && $state.encryptedAccounts.length < 1">
      <AppLoading message="Add your account">
        <AddAccount />
      </AppLoading>
    </div>
    <div id="no-consent" v-if="$state.ready && $state.consent && $state.encryptedAccounts.length > 0 && $state.accounts.length < 1">
      <AppLoading message="Login">
        <Login />
      </AppLoading>
    </div>
    <div id="ready" v-show="$state.ready && $state.consent && $state.encryptedAccounts.length > 0 && $state.accounts.length > 0">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="header container-fluid bg-light">
          <div class="container">
            <router-link to="/" class="logo">
              <i class="xrp">x</i> <b>XRP Text</b>
            </router-link>
            <small class="d-none d-sm-inline-block slogan text-secondary"><i class="far fa-comment-alt"></i> Secure Messaging</small>
            <div class="float-right col-1 col-md-2 col-lg-3 col-xl-2 text-right pr-0">
              <div class="btn-group float-right">
                <button v-on:blur="topRightBlur" @click="$state.ui.topRightMenu=!$state.ui.topRightMenu" type="button" class="btn bg-light btn-outline-none">
                  <span class="d-none d-sm-inline-block">{{ $state.user.name.length > 0 ? $state.user.name : 'Account' }}</span>
                  <i class="fas fa-caret-down"></i>
                </button>
              </div>
              <div v-if="$state.ui.topRightMenu" class="dropdown-menu d-block dropdown-menu-right">
                <!-- <router-link tag="button" to="/" class="dropdown-item" type="router-link">Accounts</router-link> -->
                <!-- <div class="dropdown-divider"></div> -->
                <router-link :to="{ name: 'AddressBook' }" class="pl-3 text-primary dropdown-item"><i class="fas fa-fw fa-users"></i> Contacts</router-link>
                <!-- <div class="dropdown-divider"></div> -->
                <a href="" onclick="return false;" @click="$state.logout" class="pl-3 dropdown-item"><i class="fas fa-fw fa-lock"></i> Lock session</a>
                <div class="dropdown-divider"></div>
                <a href="" onclick="return false;" @click="$state.purge" class="pl-3 dropdown-item text-danger"><i class="fas fa-fw fa-sign-out-alt"></i> Sign out</a>
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

      <router-view />
      <router-view name="composer" class="mb-3" />
      <!-- v-if="1 === 1 || $store" -->
    </div>
  </div>
</template>

<script>
import AppLoading from '@/partials/AppLoading'
import Intro from '@/partials/Intro'
import Login from '@/partials/Login'
import AddAccount from '@/partials/AddAccount'

export default {
  name: 'App',
  components: {
    AppLoading,
    Intro,
    AddAccount,
    Login
  },
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {
    topRightBlur (e) {
      setTimeout(() => {
        this.$state.ui.topRightMenu = false
      }, 250)
    }
  }
}
</script>

<style lang="scss" scoped>
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

  nav.navbar {
    margin-bottom: 1em;
  }
</style>
