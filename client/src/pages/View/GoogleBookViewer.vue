<template>
    <iframe :src="'/statics/canvas.html?id='+$route.query.id" class="col-12 col-md-8" />
</template>
<script>
    import scriptjs from 'scriptjs'

    export default {
        data() {
            return {
                show: false
            }
        },
        created() {
        },  
    }
</script>
<style scoped>
    iframe{
        border: none;
        min-height: calc(100vh - 75px)
    }
</style>