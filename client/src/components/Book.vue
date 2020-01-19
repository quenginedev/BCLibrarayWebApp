<template>
    <div class="col-11 col-sm-7 col-md-4 col-lg-3 q-ma-md">
        <q-card @click="showBookDetails = true" class="row justify-between" style="cursor: pointer" v-if="book">
            <q-card-section class="col-4">
                <q-img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail"/>
                <q-img v-else src="../assets/logo.jpg"/>
            </q-card-section>
            <q-card-section class="col-8">
                <div class="text-h6">{{book.volumeInfo.title}}</div>
                <div>{{book.volumeInfo.subtitle}}</div>
                <div class="row">
                    <q-chip v-for="(author, index) in book.volumeInfo.authors" :key="index">
                        <q-avatar color="blue" text-color="white" icon="eva-person-outline"></q-avatar>
                        {{author}}
                    </q-chip>
                </div>
            </q-card-section>
            <q-card-actions class="col-12 row justify-center">
                <slot></slot>
            </q-card-actions>
        </q-card>
        
    </div>
</template>
<script>
export default {
    props: ['book'],
    data() {
        return {
            showBookDetails: false
        }
    },
    methods: {
       
    },
    created() {
        console.log(this.book)
    },
}
</script>