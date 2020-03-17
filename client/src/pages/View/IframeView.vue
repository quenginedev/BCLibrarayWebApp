<template>
    <iframe v-if="project" :src="project.document_url" class="col-12 col-md-10" style="height: calc(100vh - 57px)"></iframe>
</template>

<script>
    export default {
        name: "IframeView",
        data(){
            return {
                project: ''
            }
        },
        created() {
           this.firebase.firestore().collection('projects').doc(this.$route.query.id).get().then(res=>{
               if(res.exists){
                   this.project = {id : res.id, ...res.data()}
                   console.log(this.project)
               }
           }).catch(err=>{
               console.log(err)
           })
        }
    }
</script>

<style scoped>

</style>