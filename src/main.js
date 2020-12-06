// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkerAlt, faClock, faUserFriends, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import configuration from '../configuration'

Vue.prototype.$http = axios

library.add(faMapMarkerAlt, faClock, faUserFriends, faPen)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$server = configuration['server']

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
