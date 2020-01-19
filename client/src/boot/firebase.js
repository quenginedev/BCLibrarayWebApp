import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'
import config from '../config'

firebase.initializeApp(config.firebase)
firebase.firestore().enablePersistence()
Vue.prototype.firebase = firebase