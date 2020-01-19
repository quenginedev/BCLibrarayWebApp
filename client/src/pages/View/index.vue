<template>
    <div class="row justify-center full-height">
        
        <book v-if="$route.query.type === 'book'"/>
    </div>
</template>
<script>
import Book from './GoogleBookViewer'
export default {
    components: {Book},
    created(){
        console.log(this.$route)
    }
}
</script>