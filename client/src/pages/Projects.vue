<template>
    <q-page class="row justify-center">
        <div class="col-11 col-sm-7 col-md-5 col-lg-3">
            <q-input v-model="search" filled placeholder="Search projects">
                <q-btn @click="searchProjects" round slot="append" flat icon="eva-search-outline"></q-btn>
            </q-input>
        </div>
        <div class="col-11 row justify-center">
            <book v-for="(project, index) in projects" :key="index"/>
        </div>
    </q-page>
</template>
<script>
import Book from '../components/Book'
export default {
    components: {Book},
    data() {
        return {
            projects: [],
            search: ''
        }
    },
    methods: {
        searchProjects(){
            console.log('projects')
        }
    },
}
</script>