<template>
  <div>
    <h2 class="float-left text-dark"><i class="fas fa-inbox"></i> {{ $state.listing | capitalize }}</h2>
    <button class="mb-3 float-right btn btn-md btn-outline-secondary">
      <i class="fas fa-sync-alt fa-fw"></i>
    </button>
    <div class="clearfix"></div>
    <div class="content">
      <div class="list-group">
        <router-link :to="{ name: 'Message', params: { message: 123 } }" class="list-group-item list-group-item-action d-block d-md-flex list-group-item-warning pl-0 pl-md-3 pr-0 pr-md-3 pt-2 pb-2 align-items-center">
          <i class="d-none d-md-inline-block far fa-fw fa-envelope"></i>
          <div class="d-block d-md-none pr-3 float-right text-right"><small>13:22</small></div>
          <div class="col-9 col-md-3">
            <b>John Doe</b>
          </div>
          <div class="col-12 col-md-6"><b>Dapibus ac facilisis in</b></div>
          <div class="d-none d-md-inline-block col-12 col-md-3 text-right"><b>13:22</b></div>
        </router-link>
        <router-link :to="{ name: 'Message', params: { message: 123 } }" class="list-group-item list-group-item-action d-block d-md-flex list-group-item-warning pl-0 pl-md-3 pr-0 pr-md-3 pt-2 pb-2 align-items-center">
          <i class="d-none d-md-inline-block far fa-fw fa-envelope"></i>
          <div class="d-block d-md-none pr-3 float-right text-right"><small>12:15</small></div>
          <div class="col-9 col-md-3">
            <b>John Doe</b>
          </div>
          <div class="col-12 col-md-6 subject"><b><span class="badge badge-light text-primary"><i class="xrp">x</i> 0.75</span> Dapibus ac facilisis in</b></div>
          <div class="d-none d-md-inline-block col-12 col-md-3 text-right"><b>12:15</b></div>
        </router-link>
        <router-link :to="{ name: 'Message', params: { message: 123 } }" class="list-group-item list-group-item-action d-block d-md-flex pl-0 pl-md-3 pr-0 pr-md-3 pt-2 pb-2 align-items-center">
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
        </router-link>
        <!-- <div class="col-8 col-md-9 col-lg-10">
          <div class="d-none d-md-block progress animated-loader"></div>
          <div class="mt-1 d-block d-md-none progress animated-loader"></div>
        </div> -->
        <router-link :to="{ name: 'Message', params: { message: 123 } }" class="list-group-item list-group-item-action d-block d-md-flex pl-0 pl-md-3 pr-0 pr-md-3 pt-2 pb-2 align-items-center">
          <i class="d-none d-md-inline-block text-muted far fa-fw fa-envelope-open"></i>
          <div class="d-block d-md-none pr-3 float-right text-right"><small>Yesterday</small></div>
          <div class="col-9 col-md-3">
            John Doe
          </div>
          <div class="col-12 col-md-6 col-lg-7">Dapibus ac facilisis in</div>
          <div class="d-none d-md-inline-block col-12 col-md-3 col-lg-2 text-right">Yesterday</div>
        </router-link>
        <router-link :to="{ name: 'Message', params: { message: 123 } }" class="list-group-item list-group-item-action d-block d-md-flex pl-0 pl-md-3 pr-0 pr-md-3 pt-2 pb-2 align-items-center">
          <i class="d-none d-md-inline-block text-muted far fa-fw fa-envelope-open"></i>
          <div class="d-block d-md-none pr-3 float-right text-right"><small>Yesterday</small></div>
          <div class="col-9 col-md-3">
            John Doe
          </div>
          <div class="col-12 col-md-6 col-lg-7">Dapibus ac facilisis in</div>
          <div class="d-none d-md-inline-block col-12 col-md-3 col-lg-2 text-right">Yesterday</div>
        </router-link>
        <router-link :to="{ name: 'Message', params: { message: 123 } }" class="list-group-item list-group-item-action d-block d-md-flex pl-0 pl-md-3 pr-0 pr-md-3 pt-2 pb-2 align-items-center">
          <i class="d-none d-md-inline-block text-muted far fa-fw fa-envelope-open"></i>
          <div class="d-block d-md-none pr-3 float-right text-right"><small>Yesterday</small></div>
          <div class="col-9 col-md-3">
            John Doe
          </div>
          <div class="col-12 col-md-6 col-lg-7">Dapibus ac facilisis in</div>
          <div class="d-none d-md-inline-block col-12 col-md-3 col-lg-2 text-right">Yesterday</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageListing',
  data () {
    return {
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
  .subject span.badge {
    top: -2px;
    position: relative;
    display: inline-block;
    border: 1px solid rgb(32,121,249);
    margin-right: 5px;
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
