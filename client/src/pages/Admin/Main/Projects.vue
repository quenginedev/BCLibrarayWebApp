<template>
    <div>
        <div class="row justify-around q-mt-md">
            <div class="col-11 col-sm-5 col-md-4 col-lg-3 q-mb-lg" v-for="(p, i) in projects" :key="i">
                <ProjectPallete :project="p">
                    <q-btn @click="EditProject(p)" icon="eva-edit" label="Edit Project" color="green"></q-btn>
                </ProjectPallete>
            </div>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="addNewProject" fab icon="eva-plus" color="green" />
        </q-page-sticky>
        <q-dialog :maximized="isSm" v-model="show_add">
            <q-card style="max-width: 500px; min-width: 420px" :style="{'max-height': !isSm? '400px' : ''}">
    
                <q-card-section>
                <div class="text-h6">Add Project</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-form>
                        <h4 class="text-primary">
                            <q-avatar>
                                <q-img src="../../../assets/logo.jpeg"></q-img>
                            </q-avatar>
                            {{edited_project.title}}
                        </h4>
                        <q-input class=" q-mb-sm" filled v-model="edited_project.title" label="Project Title" />
                        <q-input class=" q-mb-sm" filled v-model="edited_project.alumi" label="Alumi name" />
                        <q-input class=" q-mb-sm" filled v-model="edited_project.department" label="Department" />
                        <q-input class=" q-mb-sm" type="textarea" filled v-model="edited_project.description" label="Project Description" />
                        <uploader 
                            accept="application/msword, text/plain, application/pdf"
                            color="primary"
                            uclass="full-width"
                            @change="addUrl"
                        />
                    </q-form>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn 
                        :loading="loading"
                        @click="saveDoc"
                        :disable="!canSave"
                        label="Save" 
                        icon="eva-upload-outline"
                        color="primary"
                        class=" full-width"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>    
    </div>
</template>
<script>
import Uploader from '../../../components/Uploader'
import ProjectPallete from "../../../components/ProjectPallete";
export default {
    props: ['search'],
    components: {ProjectPallete, Uploader},
    computed: {
        canSave(){
            return (this.edited_project.document_url && this.edited_project.title && this.edited_project.department)
                ? true : false
        }
    },
    data() {
        return {
            show_add: false,
            projects: [],
            edited_project: {},
            default_project: {
                alumi: '',
                description: '',
                department: '',
                title: '',
                document_url: '',
                uploaded_by: ''
            },
            loading: false,
        }
    },
    methods: {
        EditProject(project){
            this.edited_project = project
            this.show_add = true
        },
        addNewProject(){
            this.edited_project = this.default_project
            this.show_add = true
        },

        addUrl(url){
            this.edited_project.document_url = url
        },
        saveDoc(){
            this.loading = true
            // console.log(this.project)
            this.firebase.firestore().collection('projects').add(this.edited_project)
                .then(docRef=>{
                    this.$q.notify({
                        color: 'green',
                        icon: 'eva-checkmark-outline',
                        message: 'Project succefully uploaded'
                    })
                    this.show_add = false
                }).catch(err=>{
                    this.$q.notify({
                        color: 'red',
                        icon: 'eve-alert-triangle-outline',
                        message: 'Project upload unsuccefully'
                    })
                }).finally(_=>{
                    this.loading = false
            })
        }
    },
    created(){
        this.firebase.firestore().collection('projects').onSnapshot(
            res=>{
                this.projects = []
                res.docs.forEach(doc=>{
                    this.projects.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            },
            err=>{
                console.error(res)
            }
        )
    }
}
</script>