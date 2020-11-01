import Vue from 'vue'
import App from './App.vue'
import Treeselect from '@riophae/vue-treeselect';

import router from './router'
import store from './store';

import components from '@/components/components';

import Vuelidate from 'vuelidate'

import '../public/css/main.css'
import '../public/sass/main.sass'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import vuetify from '@/plugins/vuetify'

Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

Vue.component('tree-select', Treeselect);

Vue.config.productionTip = false;

Vue.use(Vuelidate)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
