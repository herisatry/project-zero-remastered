<template>
  <div id="check">
    <nav class="site-header sticky-top py-1">
      <div class="container d-flex flex-column flex-md-row justify-content-between">
        <router-link
          class="py-2 d-none d-md-inline-block"
          title="Do a new test"
          to="/">CheckME</router-link>
        <a
          class="py-2 d-none d-md-inline-block"
          href="#shortResult"
          v-smooth-scroll="{ duration: 1000, offset: -100 }">Overall</a>
        <a
          class="py-2 d-none d-md-inline-block"
          href="#webServerSecurity"
          v-smooth-scroll="{ duration: 1000, offset: -46 }">Web security</a>
        <a
          class="py-2 d-none d-md-inline-block"
          href="#httpHeadersSecurity"
          v-smooth-scroll="{ duration: 1000, offset: -46 }">Headers security</a>
        <a
          class="py-2 d-none d-md-inline-block"
          href="#cookiesSecurity"
          v-smooth-scroll="{ duration: 1000, offset: -46 }">Cookies security</a>
        <a
          class="py-2 d-none d-md-inline-block"
          href="#thirdPartyContent"
          v-smooth-scroll="{ duration: 1000, offset: -46 }">Third party content</a>
      </div>
    </nav>
    <div class="container">
      <vue-testing-suite/>
    </div>
    <!--
    This component temporary disabled
    <hr>
    <div class="container">
      <vue-ssl/>
    </div>-->
  </div>
</template>

<script>
import TestingSuite from './check-site/TestingSuite.vue';

export default {
  name: 'CheckSite',
  components: {
    'vue-testing-suite': TestingSuite
  },
  data() {
    return {
    };
  },
  methods: {
    analyzeSize() {
      return true;
    },
    footerSwitch() {
      const footer = document.getElementById('footer');
      if (footer) {
        if (footer.className !== 'container-fluid pt-4 bg-light relative') {
          footer.className = 'container-fluid pt-4 bg-light relative';
        }
        return true;
      }
      return false;
    }
  },
  created() {
    setTimeout(() => {
      this.footerSwitch();
    }, 250);
  }
};
</script>

<style lang="scss" scoped>
.site-header {
  background-color: rgba(0, 0, 0, .85);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  a {
    color: #999;
    transition: ease-in-out color .15s;

    &:hover {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
