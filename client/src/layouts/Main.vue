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
      <q-btn :round="isSm"
            v-if="isAdmin"
            :class="{'text-blue' : isPage('manage-projects')}" 
            :to="{name: 'manage-projects'}" 
            icon="eva-cube-outline"
            flat :label="!isSm ? 'manage projects' : ''"></q-btn>
        <q-btn :round="isSm" 
            v-if="isAdmin"
            :class="{'text-blue' : isPage('manage-users')}" 
            :to="{name: 'manage-users'}" 
            icon="eva-people-outline"
            flat :label="!isSm ? 'manage users' : ''"></q-btn>
      <q-space/>
      <q-btn @click="firebase.auth().signOut()"
             :label="!isSm ? 'log out' : ''"
             flat
             :round="isSm"
             color="warning" icon="eva-power-outline"></q-btn>
<!--      <q-btn :class="{'text-blue' : isPage('profile')}" icon="eva-person-outline" flat round>-->
<!--        <q-popup-proxy>-->
<!--          <div style="width:320px" class="row">-->
<!--            <div v-if="user.info.isAdmin" class="col-xs-12">-->
<!--              <q-btn :to="{name: 'manage-projects'}" label="Manage" class=" full-width"  flat color="info" icon="eva-grid-outline"></q-btn>-->
<!--            </div>-->
<!--            <div class="col-xs-12">-->
<!--              <q-btn label="profile" disabled class=" full-width" flat color="primary" icon="eva-person-outline"></q-btn>-->
<!--            </div>-->
<!--            <div class="col-xs-12">-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-popup-proxy>-->
<!--      </q-btn>  -->
      <!-- <q-btn :class="{'text-blue' : isPage('profile')}" icon="eva-person-outline" flat round/> -->
    </q-toolbar>
    <q-page-container>
      <keep-alive>
        <DisabledUser v-if="user.disabled"></DisabledUser>
        <router-view v-else class="router"/>
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import DisabledUser from '../components/DisabledUser'
export default {
  name: 'Main',
  components: {DisabledUser},
  data () {
    return {
      show_route: false,
      user: {}
    }
  },

  computed: {
    isAdmin(){
      return this.user.isAdmin
    }
  },

  methods: {
    getUserData(user){
      this.firebase.firestore().collection('users').doc(user.uid).onSnapshot(res=>{
        res.exists ? this.updateUserStore(res.data()) 
          : this.updateUser(user.uid, { 
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            phoneNumber: user.phoneNumber,
          })
          this.user = res.data() 
          console.log(this.user) 
          this.$q.loading.hide()
          this.show_route = true

        },
        err=>{
            console.log(err)
            this.showError(err.message)
          })
    },
    async updateUser(uid, user){
      return console.log('updating ',await this.firebase.firestore().collection('users').doc(uid).set(user))
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
    padding-top: 56px;
  }
</style>