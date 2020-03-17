<template>
    <q-layout>
        <!-- Create a permission denied if not admin  -->
        <q-toolbar class="text-primary">
            <div class="row justify-center full-width">
                <div class="col-12 col-sm-8 col-md-5 col-lg-3">
                    <q-input v-model="search" placeholder="search" filled  type="Search">
                        <q-btn icon="eva-search-outline" round slot="append" flat dense></q-btn>
                    </q-input>
                </div>
            </div>
        </q-toolbar>        
        <q-page-container>
            <router-view :search="search"></router-view>
        </q-page-container>
    </q-layout>
</template>
<script>
export default {
    data() {
        return {
            search: ''

        }
    },
}
</script>