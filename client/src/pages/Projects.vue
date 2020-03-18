<template>
    <q-page>
        <div class="row justify-center">
            <div class="col-11 col-sm-7 col-md-5 col-lg-3">
                <q-input v-model="search" filled placeholder="Search projects">
                    <q-btn @click="searchProjects" round slot="append" flat icon="eva-search-outline"></q-btn>
                </q-input>
            </div>
        </div>

        <div class="row q-mt-md justify-around">
            <ProjectPallete
                    class="col-11 col-sm-5 col-md-4 col-lg-3 q-mb-md"
                    v-for="project in projects"
                    :key="project.id" :project="project">
                <q-btn @click="AddToReading(project)" icon="eva-plus" label="Add to reading" color="primary"></q-btn>
            </ProjectPallete>
        </div>
    </q-page>
</template>
<script>
import Book from '../components/Book'
import ProjectPallete from "../components/ProjectPallete";
export default {
    components: {ProjectPallete, Book},
    data() {
        return {
            projects: [],
            search: ''
        }
    },
    methods: {
        AddToReading(project){
            let id = project.id
            let reading = project
            reading.type = 'project'

            let user = this.firebase.auth().currentUser

            this.firebase.firestore().collection('users').doc(user.uid).collection('reading')
                .add(reading).then(_=>{
                this.$q.notify({
                    message: 'Project added to reading'
                })
            }).catch(err=>{
                console.log(err)
            })

            this.firebase.firestore().collection('users')
        },
        searchProjects(){
            this.firebase.firestore().collection('projects').orderBy('title').startAt(this.search).endAt(this.search+'\uf8ff')
                .get().then(res=>{
                    console.log(res)
                    this.projects = []
                    res.docs.forEach(doc=>{
                        this.projects.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                }).catch(err=>console.log)

        }
    },
}
</script>