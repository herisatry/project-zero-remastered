<template>
  <div id="app">
    <router-view/>
    <footer
      id="footer"
      class="container-fluid pt-4 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <h5>About</h5>
            <ul class="list-unstyled text-small">
              <li><a
                class="text-muted"
                href="https://github.com/iSm1le">Developer</a></li>
              <li><a
                class="text-muted"
                href="https://github.com/iSm1le/checkme-xaff/blob/production/LICENSE">License</a></li>
            </ul>
          </div>
          <div class="col-6 text-right pt-4">
            <small class="d-block text-muted">CheckME.XaFF &copy; 2018</small>
            <small class="d-block text-muted pt-2"><b>Version: </b>{{ appVer }}</small>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { version } from '../package.json';

export default {
  name: 'App',
  computed: {
    appVer() {
      return version;
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');

* {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
html,
body,
#app {
  height: 100%;
  background: #222 url('./assets/img/pattern.png') repeat;
}
img {
  max-width: 100%;
}
footer {
  position: fixed;
  left: 0;
  bottom: 0;

  &.relative {
    position: relative;
    left: 0;
    bottom: 0;
  }
}
</style>
