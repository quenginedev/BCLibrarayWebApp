import Vue from 'vue'
import VueShave from 'vue-shave'

const shaveConfig = {
    throttle: 700,    // Throttle length in ms
    character: '...', // Override default elipsis character
    spaces: true,     // Spaces config (see shave documentation)
    height: 120       // Default shave height (see shave documentation)
};

Vue.use( VueShave, shaveConfig );