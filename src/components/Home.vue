<template>
  <section class="cover">
    <div class="cover-caption">
      <div class="container-fluid text-center">
        <div class="d-flex flex-row justify-content-sm-center">
          <div class="col-sm-auto cover-content p-4">
            <form
              class="form-inline"
              @submit.prevent="startScan()">
              <div class="form-group">
                <select
                  name="siteProtocol"
                  id="siteProtocol"
                  class="form-control"
                  v-model="protocol">
                  <option value="http">http://</option>
                  <option
                    value="https"
                    selected>https://</option>
                </select>
              </div>
              <div class="form-group mx-2">
                <input
                  class="form-control"
                  type="text"
                  name="siteHost"
                  id="siteHost"
                  placeholder="Enter website"
                  v-model="host"
                  required>
              </div>
              <button
                type="submit"
                class="btn btn-primary">Check my site</button>
            </form>
            <h3
              class="p-3 font-weight-normal"
              style="padding-bottom: 0; margin: 0;"
              v-if="!anotherScan">You can do next scan in: {{ anotherScanTime }}s</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      host: null,
      protocol: 'https',
      anotherScanTime: 0,
      anotherScanTimer: null, // Scan timer
      anotherScan: true // When true user cant do another scan
    };
  },
  methods: {
    anotherScanAvailable() {
      const time = Date.now();
      if (localStorage.getItem('lastUse')) {
        if (localStorage.getItem('lastUse') < time) {
          return true;
        }
        if (!this.anotherScanTimer) {
          this.anotherScanTimer = setInterval(() => {
            if (this.getTimeToNextScan()) {
              this.anotherScanTime = this.getTimeToNextScan();
              this.anotherScan = false;
            } else {
              this.anotherScan = true;
              clearInterval(this.anotherScanTimer);
            }
          }, 1000);
        }
        return false;
      }
      return true;
    },
    getTimeToNextScan() {
      const time = Date.now();
      if (localStorage.getItem('lastUse') > time) {
        return Math.floor((localStorage.getItem('lastUse') - time) / 1000);
      }
      return false;
    },
    canIScan() {
      if (!this.$route.query.dev) {
        if (!this.anotherScanAvailable()) {
          return false;
        }
      }
      return true;
    },
    startScan() {
      if (this.canIScan()) {
        const time = Date.now();
        localStorage.setItem('lastUse', time + (2 * 60000));
        const a = document.createElement('a');
        a.href = `${this.protocol}://${this.host}`;
        this.$router.push(`/check/${a.hostname}?protocol=${this.protocol}`);
      }
      return false;
    },
    footerSwitch() {
      const footer = document.getElementById('footer');
      if (footer) {
        if (footer.className !== 'container-fluid pt-4 bg-light') {
          footer.className = 'container-fluid pt-4 bg-light';
        }
        return true;
      }
      return false;
    }
  },
  created() {
    this.canIScan();
    setTimeout(() => {
      this.footerSwitch();
    }, 250);
  }
};
</script>

<style scoped>
.cover {
  color: white;
  height: 90%;
  text-align: center;
  display: flex;
  align-items: center;
}

.cover-caption {
  width: 100%;
  transition: all .3s linear;
}

.cover-content {
  background: rgba(0,0,0,0.8);
  color: white;
}
</style>
