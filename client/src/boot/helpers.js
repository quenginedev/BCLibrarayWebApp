import Vue from 'vue'
Vue.mixin({
    methods: {
        isPage(name){
            return this.$route.name == name
        },
        showError(message){
            this.$q.notify({
                message: message,
                color: 'red',
                icon: 'eva-alert-triangle-outline',
                position: 'top'
            })
        },      
    },
    computed: {
        isSm(){
            return this.$q.screen.lt.md
        },
        isAdmin(){
            return this.$store.getters['user/getUser'].isAdmin
        }
    },
    
})