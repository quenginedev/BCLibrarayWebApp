<template>
    <q-page class="row justify-center items-center no-wrap">
        <div class="col-11 col-sm-7 col-md-5 col-lg-3">
            <q-card class="text-primary">
                <div class=" q-pa-md">
                    <q-toolbar class=" q-mb-md row justify-between items-center">
                        <q-avatar>
                            <q-img src="../../../assets/logo.jpg"></q-img>
                        </q-avatar>
                        <p class="text-h5">Admin</p>
                    </q-toolbar>
                    <q-form @submit="processAuth">
                        <q-input v-model="email" class=" q-mb-md" type="email" placeholder="Email" filled >
                            <q-icon name="eva-email-outline" slot="prepend"></q-icon>
                        </q-input>
                        <q-input v-model="password" class=" q-mb-md" :type="show_password ? 'text' : 'password'" placeholder="Password" filled  >
                            <q-icon name="eva-lock-outline" slot="prepend"></q-icon>
                            <q-btn @click="show_password = !show_password" slot="append" 
                                :icon="show_password? 'eva-eye-outline' : 'eva-eye-off-outline'" round flat></q-btn>
                        </q-input >
                        <q-input v-model="c_pass" v-if="!it_is_sign_in" class=" q-mb-md" 
                            :type="show_password ? 'text' : 'password'" placeholder="confirm password" filled  >
                            <q-icon name="eva-sync-outline" slot="prepend"></q-icon>
                        </q-input>
                        <q-btn @click="processAuth" :loading="loading" :label="it_is_sign_in ? 'sign in': 'sign up'" 
                            class="full-width q-mb-md" color="primary"></q-btn>
                    </q-form>
                </div>
            </q-card>
        </div>
    </q-page>
</template>
<script>
export default {
    data() {
        return {
            it_is_sign_in: true,
            email: '',
            password: '',
            c_pass: '',
            show_password: '',
            loading: false
        }
    },
    methods: {
        showError(message){
            this.$q.notify({
                        message: message,
                        color: 'red',
                        icon: 'eva-alert-triangle-outline',
                        position: 'top'
                    })
        },
        loginedInBy(type){
            this.firebase.analytics().logEvent('login_by', type)
        },
        processAuth(){
            this.loading = true
            this.it_is_sign_in ? this.login() : this.createAccount()
        },
        login(){
            //Set persistence when login in in case the page is refreshed
            this.firebase.auth().setPersistence(this.firebase.auth.Auth.Persistence.SESSION)
                .then(() => this.firebase.auth().signInWithEmailAndPassword(this.email, this.password))
                .then(res => {
                    this.loginedInBy('email')
                    this.$router.push({name: 'home'})
                })
                .catch(err=>{
                    this.showError(err.message)
                })
                .finally(()=>{
                    this.loading = false
                })              
        },
        createAccount(){
            // Check if passwords match 
            this.c_pass === this.password ?
            this.firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(res => {
                    this.loginedInBy('email')
                    this.$router.push({name: 'home'})
                })
                .catch((error) => {
                    this.showError(error.message)
                })
                .finally(()=>{
                    this.loading = false
                }) 
                //Show error if passowrds mismatch
                : (this.showError('Passowrds mismatch'), this.loading = false)
        },
        googleAuth(){
            //Google auth
        }
    },
}
</script>