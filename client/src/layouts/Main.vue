<template>
  <q-layout v-if="show_route" class="bg-grey-2" >
    <q-toolbar class="bg-white text-grey-8 rounded-borders fixed-top z-top">
      <q-avatar>
        <img src="../assets/logo.jpg">
      </q-avatar>
      <q-space/>
      <q-btn :round="isSm" 
          :class="{'text-blue' : isPage('home')}" 
          :to="{name: 'home'}" 
          icon="eva-book-outline" flat :label="!isSm ? 'Library' : ''"
          ></q-btn>
      <q-btn :round="isSm" 
          :class="{'text-blue' : isPage('projects')}" 
          :to="{name: 'projects'}" 
          icon="eva-archive-outline" 
          flat :label="!isSm ? 'Projects' : ''"></q-btn>
      <q-btn :round="isSm" 
          :class="{'text-blue' : isPage('reading')}" 
          :to="{name: 'reading'}" 
          icon="eva-book-open-outline"
          flat :label="!isSm ? 'reading' : ''"></q-btn>
      <q-space/>
      <q-btn :class="{'text-blue' : isPage('profile')}" icon="eva-person-outline" flat round/>
      <!-- <q-btn :class="{'text-blue' : isPage('profile')}" icon="eva-person-outline" flat round/> -->
    </q-toolbar>
    <q-page-container >
      <keep-alive>
        <router-view class="router"/>
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      show_route: false
    }
  },
  computed: {
    isSm(){
      return this.$q.screen.lt.md
    }
  },
  methods: {
    getUserData(user){
      this.firebase.firestore().collection('users').doc(user.uid).onSnapshot(res=>{
        this.$q.loading.hide()
        this.show_route = true
        res.exists ? this.updateUserStore(res.data()) 
          : this.updateUser(user.uid, { 
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            phoneNumber: user.phoneNumber
          })
        },
        err=>{
            console.log(err)
            this.showError(err.message)
          })
    },
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
    async updateUser(uid, user){
        return await this.firebase.firestore().collection('users').doc(uid).set(user)
    },
    async updateUserStore(user){
      this.$store.commit('user/setUser', user)
    }
  },
  async created() {
    this.$q.loading.show()
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getUserData(user)
      } else {
        this.$router.push({name: 'login'})
        this.$q.loading.hide()
      }
    });
  },
}
</script>
<style scoped>
  .router{
    padding-top: 56px
  }
</style>