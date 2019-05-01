<template>
  <section class="cover">
    <div class="cover-caption">
      <div class="container-fluid text-center">
        <div class="d-flex flex-row justify-content-center align-items-center">
          <img
            width="50%"
            src="https://images.squarespace-cdn.com/content/5659c286e4b08c62b9dae52f/1551903850746-QG0CVPDZ4H2HW62CD6NS/Project0_logo_prm_notm_main-01.png?content-type=image%2Fpng"
          >
        </div>
        <div class="d-flex flex-row form-inline justify-content-center">
          <div class="col-sm-auto cover-content p-4">
            <form @submit.prevent="startScan()">
              <div>
                <div class="d-flex flex-row" id="search">
                  <div class="p-3">
                    <select name="siteProtocol" id="siteProtocol" v-model="protocol">
                      <option value="https">HTTPS</option>
                      <option value="http">HTTP</option>
                    </select>
                  </div>
                  <div class="d-flex flex-row col p-3">
                    <input
                      type="text"
                      name="siteHost"
                      id="siteHost"
                      placeholder="Enter website"
                      v-model="host"
                      required
                    >
                    <button type="submit">
                      <img
                        src="https://uploads.codesandbox.io/uploads/user/80271736-b547-4526-8caa-d60837d5f08c/H25m-magnifying-glass.png"
                        alt="search icons"
                      >
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <h3
              class="p-3 font-weight-normal"
              style="padding-bottom: 0; margin: 0;"
              v-if="!anotherScan"
            >You can do next scan in: {{ anotherScanTime }}s</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      host: null,
      protocol: "https",
      anotherScanTime: 0,
      anotherScanTimer: null, // Scan timer
      anotherScan: true // When true user cant do another scan
    };
  },
  methods: {
    anotherScanAvailable() {
      const time = Date.now();
      if (localStorage.getItem("lastUse")) {
        if (localStorage.getItem("lastUse") < time) {
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
      if (localStorage.getItem("lastUse") > time) {
        return Math.floor((localStorage.getItem("lastUse") - time) / 1000);
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
        localStorage.setItem("lastUse", time + 2 * 60000);
        const a = document.createElement("a");
        a.href = `${this.protocol}://${this.host}`;
        this.$router.push(`/check/${a.hostname}?protocol=${this.protocol}`);
      }
      return false;
    },
    footerSwitch() {
      const footer = document.getElementById("footer");
      if (footer) {
        if (footer.className !== "container-fluid pt-4 bg-light") {
          footer.className = "container-fluid pt-4 bg-light";
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
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-caption {
  transition: all 0.3s linear;
}

.cover-content {
  color: white;
}

select {
  background: none;
  border: none;
  box-shadow: none;
  background: transparent;
}

input,
select {
  /* border-bottom: 2px solid #ffffff; */
  width: 100%;
  height: 48px;
  font-size: 24px;
  color: gray;
}
input,
select:focus {
  background: none;
  outline: none;
}

input {
  border: none;
  color: white;
}

button {
  background: none;
  outline: none;
  border: none;
}
select,
button:hover {
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
}
p,
h1,
h2,
h3,
h4 {
  color: #ffffff;
}

#search {
  border-bottom: 2px solid #ffffff;
}
</style>
