<template>
    <div class="row justify-center full-height">
        <book v-if="$route.query.type === 'book'"/>
        <iframe-view v-else-if="$route.query.type === 'project'"/>
    </div>
</template>
<script>
import Book from './GoogleBookViewer'
import IframeView from "./IframeView";
export default {
    components: {IframeView, Book},
    created(){

    }
}
</script>