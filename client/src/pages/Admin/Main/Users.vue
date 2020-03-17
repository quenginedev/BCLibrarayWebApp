<template>
    <div class="row justify-center">
        <q-card class="col-11 col-sm-8 col-md-5 q-mt-sm">
            <q-card-section>
                <q-list separator>
                    <q-item v-for="i in 3" :key="i">
                        <q-item-section avatar>
                            <q-icon color="primary" name="eva-person" />
                        </q-item-section>

                        <q-item-section>
                            test@test.com
                        </q-item-section>

                        <q-item-section side>
                            <q-btn icon="eva-edit" round color="green" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
    </div>
</template>
