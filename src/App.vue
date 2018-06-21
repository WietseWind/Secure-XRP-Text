<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @font-face {
    font-family: 'r1ppled';
    src:  url('/static/xrp-font/r1ppled.eot');
    src:  url('/static/xrp-font/r1ppled.eot#iefix') format('embedded-opentype'),
      url('/static/xrp-font/r1ppled.ttf') format('truetype'),
      url('/static/xrp-font/r1ppled.woff') format('woff'),
      url('/static/xrp-font/r1ppled.svg#r1ppled') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  .xrp {
    font-family: 'r1ppled';
    display: inline-block;
    font-style: normal;
    font-size: 2em;
    line-height: 0;
    overflow: visible;
    position: relative;
    top: 0.13em;
    padding-right: .1em;
  }

  html {
    font-family: 'Hind', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
