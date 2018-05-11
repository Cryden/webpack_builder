import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './../Sass/styles.scss'
import fontawesome from '@fortawesome/fontawesome'
import faHtml5 from '@fortawesome/fontawesome-free-brands/faHtml5'
import faCss3 from '@fortawesome/fontawesome-free-brands/faCss3'

import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './../Vue/App.vue'

fontawesome.library.add(faHtml5)
fontawesome.library.add(faCss3)

Vue.use(Vuetify)

new Vue({// eslint-disable-line no-new
  components: { App },
  template: '<App/>'
}).$mount('#app')
