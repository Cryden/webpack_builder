import './../Sass/style.scss'
import Vue from 'vue'
import VueResource from 'vue-resource'
import topadvert from './../vue/components/Topadvert.vue'

try {
  window.$ = window.jQuery = require('jquery');
} catch (e) {}

// import circleprogress from './../vue/components/circle-progress.vue'

Vue.use(VueResource)

new Vue({
  el: '#app',
  components: { topadvert }
})

require ('./components/main-menu.js');
require ('./components/font_loader.js');
require ('./components/navigation.js');
//require ('./components/service-worker.js');
