<template>
  <div
    id="testing-suite">
    <div class="d-flex flex-row text-center justify-content-sm-center">
      <div class="col-sm-12">
        <div class="results text-left py-3">
          <div
            class="loading-progress"
            v-if="loadingProgress < 101">
            <div
              class="loading-progress-bar"
              role="progressbar"
              :style="`width: ${loadingProgress}%;`"
              :aria-valuenow="`${loadingProgress}`"
              aria-valuemin="0"
              aria-valuemax="100"/>
          </div>
          <div id="shortResult">
            <div class="card bg-light">
              <h1
                class="card-title bg-info clickable text-center text-light text-uppercase"
                @click="toggleSpoiler($event)">{{ host }} - scan report</h1>
              <div class="card-body">
                <div
                  class="text-center"
                  v-if="!resolved.shortResult"><img src="../../../assets/img/loader-big.svg"></div>
                <div class="card-text">
                  <div
                    v-if="resolved.shortResult">
                    <div class="container mt-3">
                      <div class="d-flex flex-row justify-content-sm-center text-center">
                        <div class="col-sm-2">
                          <div class="grade-container">
                            <h3 class="header">Grade</h3>
                            <div :class="`grade p-4 text-light font-weight-normal bg-${finalGradeColor}`">{{ finalGrade }}</div>
                          </div>
                        </div>
                        <div class="col-sm-5">
                          <div class="dns-container">
                            <h3 class="header">DNS</h3>
                            <div class="server-ip-container m-2">
                              <h5 class="text-muted text-uppercase">Server IP</h5>
                              <div class="server-ip">{{ serverInfo.serverIp }}</div>
                            </div>
                            <div class="reverse-dns-container m-2">
                              <h5 class="text-muted text-uppercase">Reverse DNS</h5>
                              <div class="reverse-dns">{{ serverInfo.reverseDNS }}</div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-5">
                          <div class="server-info-container">
                            <h3 class="header">Server info</h3>
                            <div class="test-date-container m-2">
                              <h5 class="text-muted text-uppercase">Tested at</h5>
                              <div class="test-date">{{ serverInfo.testDate }}</div>
                            </div>
                            <div class="server-location-container m-2">
                              <h5 class="text-muted text-uppercase">Server location</h5>
                              <div class="server-location">{{ serverInfo.serverLocation }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="container mt-3">
                      <div class="d-flex flex-row justify-content-sm-center">
                        <div class="col-sm-12">
                          <div class="highlights-container">
                            <h3 class="header">Test highlights</h3>
                            <div
                              v-for="(item, index) in highlights"
                              :key="index"
                              :class="`highlight-${getType(item)} mb-1 pl-3 pr-2 py-1 float-left`">{{ item.split('. ')[0] }}.<small :class="`bulb-${getType(item)} px-3 py-1 text-light font-weight-bold float-right`">{{ getHighlightText(item) }}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div id="webServerSecurity">
            <div class="card bg-light">
              <h1
                class="card-title bg-info clickable text-center text-light text-uppercase"
                @click="toggleSpoiler($event)">Web security</h1>
              <div class="card-body">
                <div
                  class="text-center"
                  v-if="!resolved.webServerSecurity"><img src="../../../assets/img/loader-big.svg"></div>
                <div class="card-text">
                  <div
                    v-if="resolved.webServerSecurity">
                    <div class="container">
                      <div class="d-flex flex-row justify-content-sm-center">
                        <div class="col-sm-12">
                          <div class="container mt-3">
                            <div class="d-flex flex-row justify-content-sm-center text-center">
                              <div class="col-sm-3 text-left">
                                <div class="http-response-container">
                                  <h5 class="header text-info">Http response</h5>
                                  <div :class="`http-response font-weight-normal`">{{ webServerSecurity.httpResponse }}</div>
                                </div>
                              </div>
                              <div class="col-sm-3 text-left">
                                <div class="redirect-container">
                                  <h5 class="header text-info">Redirect to</h5>
                                  <div :class="`redirect font-weight-normal`">{{ webServerSecurity.redirect }}</div>
                                </div>
                              </div>
                              <div class="col-sm-3 text-left">
                                <div class="npn-container">
                                  <h5
                                    class="header text-info"
                                    title="Next protocol negotiation">NPN</h5>
                                  <div :class="`npn font-weight-normal`">
                                    <span
                                      class="small-bulb-info p-1 mr-1 text-light text-uppercase"
                                      v-for="(item, index) in webServerSecurity.npn"
                                      :key="index"> {{ item }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-3 text-left">
                                <div class="alpn-container">
                                  <h5
                                    class="header text-info"
                                    title="Application level protocol negotiation">ALPN</h5>
                                  <div :class="`alpn font-weight-normal`">{{ webServerSecurity.alpn }}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="container mt-3">
                            <div class="d-flex flex-row text-center">
                              <div class="col-sm-3 text-left">
                                <div class="content-encoding-container">
                                  <h5 class="header text-info">Content encoding</h5>
                                  <div :class="`content-encoding font-weight-normal`">
                                    <span
                                      class="small-bulb-info p-1 mr-1 text-light text-uppercase"
                                      v-for="(item, index) in webServerSecurity.contentEncoding"
                                      :key="index"> {{ item }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-3 text-left">
                                <div class="server-signature-container">
                                  <h5 class="header text-info">Server signature</h5>
                                  <div :class="`server-signature font-weight-normal`">{{ webServerSecurity.serverSignature }}</div>
                                </div>
                              </div>
                              <div class="col-sm-3 text-left">
                                <div class="waf-container">
                                  <h5
                                    class="header text-info"
                                    title="Web application firewall">WAF</h5>
                                  <div :class="`waf font-weight-normal`"><span
                                    class="small-bulb-info p-1 mr-1 text-light text-uppercase"
                                    v-for="(item, index) in webServerSecurity.waf"
                                    :key="index"> {{ item }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="container mt-3">
                            <div class="d-flex flex-row text-center">
                              <div class="col-sm-12 text-left">
                                <div class="http-methods-container">
                                  <h5 class="header text-info">HTTP methods enabled</h5>
                                  <div :class="`http-methods font-weight-normal`">
                                    <span
                                      v-for="(item, index) in webServerSecurity.httpMethods"
                                      :class="`small-bulb-${item.type} p-1 mr-1 text-light text-uppercase`"
                                      :title="item.description"
                                      :key="index"> {{ item.name }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div id="httpHeadersSecurity">
            <div class="card bg-light">
              <h1
                class="card-title bg-info clickable text-center text-light text-uppercase"
                @click="toggleSpoiler($event)">HTTP Headers Security</h1>
              <div class="card-body">
                <div
                  class="text-center"
                  v-if="!resolved.httpHeadersSecurity"><img src="../../../assets/img/loader-big.svg"></div>
                <div class="card-text">
                  <div
                    v-if="resolved.httpHeadersSecurity">
                    <div
                      class="container mb-3"
                      v-for="(item, index) in httpHeadersSecurity"
                      :key="index"
                      :title="item.description">
                      <div class="d-flex flex-row justify-content-sm-center">
                        <div class="col-sm-12">
                          <div class="highlights-container">
                            <h5 class="header text-info">{{ index }}</h5>
                            <div
                              v-for="(highlight, key) in item.highlight"
                              :key="key"
                              v-if="highlight"
                              :class="`highlight-${getType(highlight)} mb-1 pl-3 pr-2 py-2`">
                              <div
                                :class="`bulb-${getType(highlight)} px-3 py-1 text-light font-weight-bold small float-right`">{{ getHighlightText(highlight) }}
                              </div>
                              <div
                                class="font-weight-normal"
                                style="width: 80%;">{{ highlight.split('. [')[0] }}.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="d-flex flex-row justify-content-sm-end mt-3"
                        v-if="item.raw">
                        <div class="col-sm-11">
                          <div class="raw-http-header-container">
                            <h5
                              class="header text-info"
                              style="text-transform: unset;">Raw HTTP Header</h5>
                            <div class="raw-http-header bg-white small">
                              {{ item.raw }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div id="cookiesSecurity">
            <div class="card bg-light">
              <h1
                class="card-title bg-info clickable text-center text-light text-uppercase"
                @click="toggleSpoiler($event)">Cookies Security</h1>
              <div class="card-body">
                <div
                  class="text-center"
                  v-if="!resolved.cookiesSecurity"><img src="../../../assets/img/loader-big.svg"></div>
                <div class="card-text">
                  <div
                    v-if="resolved.cookiesSecurity">
                    <h1
                      class="header text-info text-center"
                      v-if="typeof cookiesSecurity === 'string'">There are no cookies</h1>
                    <div
                      class="container mb-3"
                      v-for="(item, index) in cookiesSecurity"
                      :key="index"
                      :title="index">
                      <div class="d-flex flex-row justify-content-sm-center">
                        <div class="col-sm-12">
                          <div class="highlights-container">
                            <h5 class="header text-info">Cookie: {{ item.name }}</h5>
                            <div
                              v-for="(highlight, i) in item.highlight"
                              :key="i"
                              :class="`highlight-${getType(highlight)} mb-1 pl-3 pr-2 py-2`">
                              <div
                                :class="`bulb-${getType(highlight)} px-3 py-1 text-light font-weight-bold small float-right`">{{ getHighlightText(highlight) }}</div>
                              <div
                                class="font-weight-normal"
                                style="width: 80%;">{{ highlight.split('. [')[0] }}.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="d-flex flex-row justify-content-sm-end mt-3"
                        v-if="item.raw">
                        <div class="col-sm-11">
                          <div class="raw-http-header-container">
                            <h5
                              class="header text-info"
                              style="text-transform: unset;">Raw HTTP Header</h5>
                            <div class="raw-http-header bg-white small">
                              {{ item.raw }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex flex-row justify-content-sm-end mt-3">
                        <div class="col-sm-12">
                          <div class="attributes-container">
                            <h5
                              class="header text-info"
                              style="text-transform: unset;">Attributes</h5>
                            <div class="attributes">
                              <table class="table table-hover table-striped table-bordered">
                                <thead class="thead-dark">
                                  <th scope="col">#</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Value</th>
                                  <th scope="col">Description</th>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="(cookie, key) in cookiesSecurityAttributes[index]"
                                    :key="key">
                                    <td scope="row">{{ key + 1 }}</td>
                                    <td>{{ cookie.name }}</td>
                                    <td>{{ cookie.value }}</td>
                                    <td>{{ cookie.description }}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div id="thirdPartyContent">
            <div class="card bg-light">
              <h1
                class="card-title bg-info clickable text-center text-light text-uppercase"
                @click="toggleSpoiler($event)">Third party content</h1>
              <div class="card-body">
                <div
                  class="text-center"
                  v-if="!resolved.thirdPartyContent"><img src="../../../assets/img/loader-big.svg"></div>
                <div class="card-text">
                  <div
                    v-if="resolved.thirdPartyContent">
                    <div class="container mb-3">
                      <div class="d-flex flex-row justify-content-sm-center">
                        <div class="col-sm-12">
                          <div class="third-party-about-container">
                            <h5 class="header">Third party content on homepage</h5>
                            <div class="third-party-about p-4 font-weight-normal text-justify">Third party content (such as images, JavaScript, or CSS) is loaded from external resources. Despite that for some web applications it can significantly improve loading time, it may also put website visitor's privacy at risk, as information about website visitors become accessible to these third-party content providers. Moreover, third-party content delivered via the HTTP channel and not HTTPS may expose your privacy.</div>
                          </div>
                          <h1
                            class="header text-info text-center"
                            v-if="thirdPartyContent.length === 0">There are no third party content</h1>
                          <div
                            class="third-party-container"
                            v-if="thirdPartyContent.length > 0">
                            <h5 class="header">List of third party content on homepage</h5>
                            <div
                              v-for="(item, key) in thirdPartyContent"
                              :key="key"
                              :class="`third-party-${getType(`. [${item.tag}]`)} pl-2 ml-4 mb-2 font-weight-normal text-justify bg-white`">{{ item.value }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestingSuite',
  data() {
    return {
      response: null,                   // Response from api with test results
      finalGrade: 'C',                  // Final grade of test
      finalGradeColor: null,            // Color of bg of test grade (in bootstrap form)
      serverInfo: {
        serverIp: null,                 // Resolved server ip
        reverseDNS: null,               // Reverse dns
        testDate: null,                 // Time of a test
        serverLocation: null            // Server location
      },
      highlights: null,                 // Short results
      webServerSecurity: {
        httpResponse: null,             // Server http response
        redirect: null,                 // Server redirects
        npn: null,                      // Next protocol negotiation []
        alpn: null,                     // Application level protocol negotiation
        contentEncoding: null,          // Content encoding []
        serverSignature: null,          // Server signature
        waf: null,                      // Web application firewall []
        httpMethods: {},                // HTTP methods enabled on server {}
        cmsFingerprint: null,           // Fingerprinted cms
        componentsFingerprint: null     // Fingerprinted components
      },
      httpHeadersSecurity: null,        // HTTP headers security
      cookiesSecurity: null,            // Cookies security
      cookiesSecurityAttributes: [],    // Cookies security
      thirdPartyContent: null,          // Third party content
      date: null,                       // Contains current date of test
      loadingProgress: 0,               // Loading percent on progress bar
      resolved: {
        shortResult: false,             // Short results ready to display
        webServerSecurity: false,       // Web server security section ready to display
        httpHeadersSecurity: false,     // HTTP headers security analysis ready to display
        cookiesSecurity: false,         // Cookies security analysis ready to display
        thirdPartyContent: false        // Third party content ready to display
      }
    };
  },
  /*
  TODO:
  Notification about error on site
  Check is site exists (will added in v0.2.0)
  */
  methods: {
    async testSite() {
      try {
        const formData = new FormData();
        formData.append('tested_url', `${this.protocol}://${this.host}`);
        formData.append('dnsr', 'on');
        formData.append('recheck', 'false');
        formData.append('follow_redirects', 'true');
        formData.append('verbosity', '1');
        let r1 = await this.$http.post(`https://www.htbridge.com/websec/api/v1/chsec/${this.date}.html`, formData);
        if (r1.status === 200) {
          if (r1.body.multiple_ips) {
            formData.append('choosen_ip', r1.body.multiple_ips[0]);
            formData.append('token', r1.body.token);
            r1 = await this.$http.post(`https://www.htbridge.com/websec/api/v1/chsec/${this.date}.html`, formData);
          }
          if (r1.status === 200) {
            const timer = await setInterval(async () => {
              const jobId = new FormData();
              if (r1.body.job_id) {
                jobId.append('job_id', r1.body.job_id);
              } else if (r1.body.test_id) {
                jobId.append('id', r1.body.test_id);
              } else {
                console.error(`Error! Cant get test id from api. Received response: `);
                console.error(r1);
                return false;
              }
              const response = await this.$http.post(`https://www.htbridge.com/websec/api/v1/get_result/${this.date}.html`, jobId);
              if (response.status === 200) {
                if (response.body.status_id && response.body.status_id === 2) {
                  return false;
                }
                this.response = response.body;
                clearInterval(timer);
                this.finalGrade = this.response.grade;
                this.finalGradeColor = this.getColor(this.response.score);
                this.serverInfo.serverIp = this.response.server_ip;
                this.serverInfo.reverseDNS = this.response.reverse_dns;
                const date = new Date(this.response.ts * 1000);
                this.serverInfo.testDate = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
                this.serverInfo.serverLocation = `${this.response.internals.country}, ${this.response.internals.city}`;
                this.highlights = this.response.global_highlights;
                this.resolved.shortResult = true;
                this.webServerSecurity.httpResponse = this.response.http_response;
                this.webServerSecurity.redirect = this.response.redirect_to === '' ? 'N/A' : this.response.redirect_to;
                this.webServerSecurity.npn = this.response.http_additional_info.protocol_negotiation.npn[0] === void 0 ? ['N/A'] : this.response.http_additional_info.protocol_negotiation.npn;
                this.webServerSecurity.alpn = this.response.http_additional_info.protocol_negotiation.alpn ? 'Yes' : 'No';
                this.webServerSecurity.contentEncoding = this.response.http_additional_info.content_encoding[0] === void 0 ? ['N/A'] : this.response.http_additional_info.content_encoding;
                this.webServerSecurity.serverSignature = this.response.server_signature;
                this.webServerSecurity.waf = this.response.http_additional_info.waf[0] === void 0 ? ['No WAF detected'] : this.response.http_additional_info.waf;
                Object.keys(this.response.http_verbs).forEach((key, i) => {
                  this.webServerSecurity.httpMethods[i] = Object();
                  this.webServerSecurity.httpMethods[i] = {
                    name: key,
                    description: `${this.response.http_verbs[key].split('. [')[0]}.`,
                    type: this.getType(this.response.http_verbs[key])
                  };
                });
                this.resolved.webServerSecurity = true;
                this.httpHeadersSecurity = this.response.http_headers;
                this.resolved.httpHeadersSecurity = true;
                this.cookiesSecurity = this.response.http_cookies;
                if (typeof this.cookiesSecurity === 'object') {
                  this.cookiesSecurity.forEach((el, i) => {
                    this.cookiesSecurityAttributes[i] = [];
                    Object.keys(el).forEach(key => {
                      if (el[key].description && el[key].value) {
                        const item = {
                          name: key,
                          description: `${el[key].description.split('. [')[0]}.`,
                          type: this.getType(el[key].description),
                          value: el[key].value === 'checkbox_TRUE' ? '✔' : el[key].value === 'checkbox_FALSE' ? '✘' : el[key].value
                        };
                        this.cookiesSecurityAttributes[i].push(item);
                      }
                    });
                  });
                }
                this.resolved.cookiesSecurity = true;
                this.thirdPartyContent = this.response.third_party_content;
                this.resolved.thirdPartyContent = true;
                this.finishLoading();
                return true;
              }
            }, 10000);
          }
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    getType(string) {
      try {
        let result = null;
        if (string) {
          switch (string.split('. [')[1]) {
          case '1]':
            result = 'success';
            break;
          case '2]':
            result = 'warning';
            break;
          case '3]':
            result = 'warning';
            break;
          case '4]':
            result = 'info';
            break;
          default:
            result = 'danger';
            break;
          }
        } else {
          result = 'danger';
        }
        return result;
      } catch (e) {
        return 'danger';
      }
    },
    getHighlightText(string) {
      try {
        let result = null;
        if (string) {
          switch (string.split('. [')[1]) {
          case '1]':
            result = 'Good configuration';
            break;
          case '2]':
            result = 'Misconfiguration or weakness';
            break;
          case '4]':
            result = 'Information';
            break;
          default:
            result = 'Misconfiguration or weakness';
            break;
          }
        } else {
          result = 'Misconfiguration or weakness';
        }
        return result;
      } catch (e) {
        return false;
      }
    },
    getColor(number) {
      try {
        let result = null;
        if (number) {
          if (number > 70) {
            result = 'success';
          } else if (number > 30) {
            result = 'warning';
          } else if (number <= 30) {
            result = 'danger';
          } else {
            result = 'info';
          }
        } else {
          result = 'info';
        }
        return result;
      } catch (e) {
        return false;
      }
    },
    toggleSpoiler(spoiler) {
      try {
        const el = spoiler.path[1];
        if (el) {
          if (el.className === 'card collapsed bg-light') {
            el.className = 'card bg-light';
          } else {
            el.className = 'card collapsed bg-light';
          }
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    },
    /**
     * @description Finalize loading. Without this function it just stops aroud 90%
     * @returns {boolean}
     */
    finishLoading() {
      setTimeout(() => {
        this.loadingProgress = 99.9;
      }, 200);
      setTimeout(() => {
        this.loadingProgress = 101;
      }, 1300);
      return true;
    }
  },
  computed: {
    host() {
      return this.$route.params.host;
    },
    protocol() {
      if (this.$route.query.protocol) {
        return this.$route.query.protocol;
      }
      return 'http';
    }
  },
  created() {
    const progressTimer = setInterval(() => {
      this.loadingProgress++;
      if (this.loadingProgress > 90) {
        clearInterval(progressTimer);
      }
    }, 500);
    if (localStorage.getItem('testDate')) {
      this.date = localStorage.getItem('testDate');
    } else if (localStorage.getItem('lastUse')) {
      this.date = localStorage.getItem('lastUse');
      localStorage.setItem('testDate', localStorage.getItem('lastUse'));
    } else {
      this.date = Date.now();
      localStorage.setItem('lastUse', this.date);
      localStorage.setItem('testDate', this.date);
    }
    this.testSite();
  }
};
</script>

<style lang="scss" scoped>
$success-color: #28a745;
$info-color: #17a2b8;
$warning-color: #ffc107;
$danger-color: #dc3545;
$progress-bar-bg: #f8f9fa;
$border-color: #d9dadb;
$success-light-color: lighten(#28a745, 40%);
$info-light-color: lighten(#17a2b8, 40%);
$warning-light-color: lighten(#ffc107, 40%);
$danger-light-color: lighten(#dc3545, 40%);
$success-dark-color: darken(#28a745, 10%);
$info-dark-color: darken(#17a2b8, 10%);
$warning-dark-color: darken(#ffc107, 10%);
$danger-dark-color: darken(#dc3545, 10%);

.clickable {
    cursor: pointer;
}
.loading-progress {
  position: relative;
  bottom: -1px;
  z-index: 999;
  border-radius: 0;
  width: 100%;
  height: 10px;
  background-color: $progress-bar-bg;
  border: 1px $border-color solid;
  border-bottom: none;
  max-width: 100%;

  .loading-progress-bar {
    height: 100%;
    background-color: $info-color;
    transition: width .7s ease-out;
    max-width: 100%;
  }
}
.card {
  .card-body {
    opacity: 1;
    height: auto;
    transition: opacity 1s linear;
    .card-text {
      .header {
        border-bottom: $info-color 2px solid;
        text-transform: uppercase;
      }
      .third-party-success {
        border: $success-color 1px solid;
        border-radius: 5px;
      }
      .third-party-info {
        border: $info-color 1px solid;
        border-radius: 5px;
      }
      .third-party-warning {
        border: $warning-color 1px solid;
        border-radius: 5px;
      }
      .third-party-danger {
        border: $danger-color 1px solid;
        border-radius: 5px;
      }
      .small-bulb-success {
        background: $success-color;
        border-radius: 5px;
        max-height: 2.5rem;
      }
      .small-bulb-info {
        background: $info-color;
        border-radius: 5px;
        max-height: 2.5rem;
      }
      .small-bulb-warning {
        background: $warning-dark-color;
        border-radius: 5px;
        max-height: 2.5rem;
      }
      .small-bulb-danger {
        background: $danger-color;
        border-radius: 5px;
        max-height: 2.5rem;
      }
      .highlights-container {
        .highlight-success {
          padding-left: 1%;
          background: $success-light-color;
          border-radius: 4px;
          border-left: $success-color 2px solid;
          width: 100%;
          .bulb-success {
            background: $success-color;
            border-radius: 5px;
            max-height: 2.5rem;
          }
        }
        .highlight-info {
          padding-left: 1%;
          background: $info-light-color;
          border-radius: 4px;
          border-left: $info-color 2px solid;
          width: 100%;
          .bulb-info {
            background: $info-color;
            border-radius: 5px;
            max-height: 2.5rem;
          }
        }
        .highlight-warning {
          padding-left: 1%;
          background: $warning-light-color;
          border-radius: 4px;
          border-left: $warning-color 2px solid;
          width: 100%;
          .bulb-warning {
            background: $warning-dark-color;
            border-radius: 5px;
            max-height: 2.5rem;
          }
        }
        .highlight-danger {
          padding-left: 1%;
          background: $danger-light-color;
          border-radius: 4px;
          border-left: $danger-color 2px solid;
          width: 100%;
          .bulb-danger {
            background: $danger-color;
            border-radius: 5px;
            max-height: 2.5rem;
          }
        }
      }
      .grade-container {
        .grade {
          font-size: 3rem;
          border-radius: 10px;
        }
      }
    }
  }
  &.collapsed {
    .card-title {
      margin-bottom: 0;
    }
    .card-body {
      opacity: 0;
      height: 0;
      overflow: hidden;
      padding: 0;
    }
  }
}
</style>
