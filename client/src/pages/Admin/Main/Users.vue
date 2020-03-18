<template>
    <div class="row justify-center">
        <q-card class="col-11 col-sm-8 col-md-5 q-mt-sm">
            <q-card-section>
                <q-list separator>
                    <q-item v-for="(user, index) in users" :key="index">
                        <q-item-section avatar>
                            <q-icon color="primary" name="eva-person" />
                        </q-item-section>

                        <q-item-section>
                            {{user.email}}
                        </q-item-section>

                        <q-item-section side>
                            <q-btn
                                   icon="eva-more-vertical-outline"
                                   flat round color="primary" >
                                <q-popup-proxy>
                                    <q-card style="width: 320px">
                                        <q-card-section class="row">
                                            <div class="row justify-between items-center col-12">
                                                <h6 class="q-my-sm">Disable user</h6>
                                                <q-toggle
                                                        @input="updateUser(user)"
                                                        v-model="user.disabled"
                                                        color="red"
                                                />
                                            </div>
<!--                                            <q-btn icon="eva-eye-outline" label="view reading" color="orange" class="col-12">-->
<!--                                            </q-btn>-->
                                        </q-card-section>
                                    </q-card>
                                </q-popup-proxy>
                            </q-btn>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
    export default {
        props: {
            search: String,
            default: ''
        },
        watch: {
            search(val){
                this.getUsers()
            }
        },
        data(){
            return {
                loading: false,
                users: []
            }
        },
        methods:{
            updateUser(user){
                console.log(user)
                let id = user.id

                // I used the spread operator below so that data does not reference user
                let data = {...user}
                delete data.id

                this.firebase.firestore().collection('users').doc(id).update(data)
            },
            getUsers(){
                this.loading = true
                console.log('getting user')
                this.firebase.firestore().collection('users').orderBy('email').startAt(this.search).endAt(this.search+'\uf8ff')
                    .get().then(res=>{
                        this.users = []
                        res.docs.forEach(doc=>{
                            this.users.push({
                                id: doc.id,
                                ...doc.data()
                            })
                        })
                    }).catch(err=>{
                        console.error(err)
                    }).finally(_=>{
                        this.loading = false
                    })
            }
        },
        created() {
            this.getUsers()
        }
    }
</script>