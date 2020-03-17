<template>
    <div>

        <input
            ref="uploadInput" 
            type="file" 
            @change="uploadDoc" 
            hidden 
            :accept="accept">
        <q-btn
            @click="$refs.uploadInput.click()"
            :color="color"
            :loading="loading"
            :percentage="upload_progress"
            :class="uclass"
            icon="eva-cloud-upload-outline" 
            :label="fileName || 'Upload Document'"></q-btn>
    </div>
</template>
<script>

export default {
    name: 'Upload',
    props: ['accept', 'color', 'uclass'],
    data(){
        return{
            imageData: null,
            picture: null,
            upload_progress: 0,
            loading: false,
            fileName: ''
        }
    },
    methods:{
        previewImage(event) {
            this.upload_progress=0;
        },

        uploadDoc(event){
            this.loading = true
            const upDoc = event.target.files[0]
            const storageRef = this.firebase.storage().ref(`projects/${Date.now()}`).put(upDoc)
            this.upload_progress = 0
            storageRef.on(`state_changed`, 
                snapshot=>{
                    this.upload_progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                },
                error=>{
                    console.log(error.message)
                },
                ()=>{
                    this.upload_progress=100
                    this.loading = false
                    this.fileName = upDoc.name
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        this.$emit('change', url)
                });
            });
        }

    }
}
</script>