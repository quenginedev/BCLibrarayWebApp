<template>
    <q-card class="my-card">
        <slot name="header"></slot>
        <q-card-section class="col-12">
            <div class="text-h6">{{project.title}}</div>
            <q-chip>
                <q-avatar color="blue" text-color="white" icon="eva-person-outline"></q-avatar>
                {{project.alumi}}
            </q-chip>
            <div class="text-subtitle2"><q-icon name="eva-archive-outline"/> {{project.department}}</div>
        </q-card-section>
        <q-separator />
        <div v-if="showDesc" class="q-pa-md" v-shave>
            {{project.description}}
        </div>
        <q-separator />
        <q-card-actions vertical>
            <slot></slot>
        </q-card-actions>
    </q-card>
</template>

<script>
    export default {
        name: "ProjectPallete",
        props: {
            project: {
                type: Object,
                required: true
            },
            showDesc: {
                type: Boolean,
                default: true
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>