import Vue from 'vue'
import App from './App.vue'
import * as io from "socket.io-client";
import VueSocketIO from 'vue-socket.io';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGlobalVariable from 'vue-global-var'
import AutoComplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

Vue.config.productionTip = false
Vue.use(AutoComplete)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(new VueSocketIO({
  debug: true,
  connection: io("http://localhost:4000")
}))

Vue.use(VueGlobalVariable, {
  globals: {
    $playing: false,
    $room: {
      queue: [],
      users: [],
    },
    $show: false,
    $results: [],
    $playback: {
      playing: false,
    },
    $track: {},
    $trackStarted: false,
    $playingTrack: {},
  }
});

new Vue({
  data: {
    playingTrack: {},
    show: false,
    playback: {
      playing: false,
    },
    track: {},
    room: {
      users: [],
      queue: [],
    },
    trackStarted: false,
  },
  render: h => h(App),
}).$mount('#app')
