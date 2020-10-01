import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faSignOutAlt,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUser,
  faSignOutAlt,
  faEllipsisV
)

import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(firestorePlugin)

firebase.initializeApp({
  apiKey: "AIzaSyCv8Dr_N-Eww3LVf1eEkeaIdZiF06yGxBo",
  authDomain: "hashtags-keeper.firebaseapp.com",
  databaseURL: "https://hashtags-keeper.firebaseio.com",
  projectId: "hashtags-keeper",
  storageBucket: "hashtags-keeper.appspot.com",
  messagingSenderId: "1013896123623",
  appId: "1:1013896123623:web:0f5c473ca59105c4953e42",
  measurementId: "G-QGRJDCCTF9"
})

export const db = firebase.firestore()
export const auth = firebase.auth()

Vue.component('fa', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
