import Vue from 'vue';
import Router from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import Resource from 'vue-resource';
import SmoothScroll from 'vue-smooth-scroll';

import Home from '@/components/Home';
import CheckSite from '@/components/check/CheckSite';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(Resource);
Vue.use(SmoothScroll);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/check/:host', name: 'Check web site', component: CheckSite },
    { path: '*', redirect: '/' }
  ]
});
