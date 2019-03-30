<template>
  <div id="ssl">
    <div class="row text-center">
      <div class="col-10">
        SSL
      </div>
    </div>
  </div>
</template>

<script>
import resp from './ssl.json';

export default {
  name: 'SSL',
  data() {
    return {
    };
  },
  methods: {
    sslScan() {
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
    },
    response() {
      return resp;
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
