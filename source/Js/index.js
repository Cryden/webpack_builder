import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './../Sass/styles.sass'

import fontawesome from '@fortawesome/fontawesome'
import faHtml5 from '@fortawesome/fontawesome-free-brands/faHtml5'
import faCss3 from '@fortawesome/fontawesome-free-brands/faCss3'
import faJs from '@fortawesome/fontawesome-free-brands/faJs'
import faFont from '@fortawesome/fontawesome-free-solid/faFont'
import faToolbox from '@fortawesome/fontawesome-free-solid/faToolbox'

import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import App from './../Vue/App.vue'
import AppStore from './../Vue/store/index.js'

fontawesome.library.add(faHtml5)
fontawesome.library.add(faCss3)
fontawesome.library.add(faJs)
fontawesome.library.add(faFont)
fontawesome.library.add(faToolbox)


Vue.use(Vuetify)
Vue.use(Vuex)

const store = new Vuex.Store(AppStore)

new Vue({// eslint-disable-line no-new
  el: '#app',
  components: { App },
  store: store,
  template: '<App/>'
})
