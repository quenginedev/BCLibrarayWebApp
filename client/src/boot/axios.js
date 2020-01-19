import Vue from 'vue'
import axios from 'axios'
import config from '../config'
axios.gcp = config.gcp
Vue.prototype.$axios = axios
