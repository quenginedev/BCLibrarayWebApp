<template>
    <q-page class="row justify-center">
        <div class="col-11 col-md-10">
            <div class="row justify-center">
                <div class="col-11 col-sm-6 col-md-5 col-lg-3 col-xl-2" v-for="(book, index) in books" :key="index">
                    <book @click="readBook(book)" v-if="book.type === 'book'" :book="book">
                        <div class="row justify-between full-width">
                            <q-btn @click="returnBook(book)" icon="eva-trash-2-outline" color="orange" label="return"></q-btn>
                            <q-btn @click="readBook(book)" icon="eva-book-open-outline" color="primary" label="read"></q-btn>
                        </div>
                    </book>
                    <project-pallete :show-desc="false" class="q-mt-md q-mx-md" v-else-if="book.type === 'project'" :project="book">
                        <div class="row justify-between full-width">
                            <q-btn @click="returnBook(book)" icon="eva-trash-2-outline" color="orange" label="return"></q-btn>
                            <q-btn @click="readBook(book)" icon="eva-book-open-outline" color="primary" label="read"></q-btn>
                        </div>
                    </project-pallete>
        <!--            create a template to read projects-->
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import Book from '../components/Book'
import ProjectPallete from "../components/ProjectPallete";
export default {
    name: 'PageIndex',
    components: {ProjectPallete, Book},
    data() {
        return {
        books: [],
        user: this.firebase.auth().currentUser,
        }
    },methods: {
        getReading(){
            this.$q.loading.show()
            // this.searching = true
            // this.$axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.search}&maxResults=12`)
            this.firebase.firestore().collection('users').doc(this.user.uid).collection('reading').onSnapshot(
                res=>{
                    // console.log(res, res.data())
                    !res.empty ?(
                        this.books = [],
                        res.docs.forEach(book => {
                            let data = { ref: book.id, ...book.data()}
                            console.log('book', data)
                            this.books.push(data)
                        }))
                        : this.$q.notify({
                            message: 'You currently are not reading any book',
                        })
                    this.$q.loading.hide()
                },
                err=>{
                    console.error(err)
                    this.$q.notify({
                        message: err.message,
                        color: 'red',
                        icon: 'eva-alert-triangle-outline',
                    })
                    this.$q.loading.hide()
                }
            )
        },
        returnBook(book){
            this.firebase.firestore().collection('users').doc(this.user.uid).collection('reading').doc(book.ref)
                .delete().catch(err=>{
                    this.$q.notify({
                        message: 'Error retunring the book',
                        color: 'red' 
                    })
                })
            // console.log(book)
        },
        readBook(book){
            console.log(book.id)
            this.$router.push({name: 'view', query: {type: book.type, id: book.id}})
        }
    },
    created() {
        // this.$q.loading.show()
        this.getReading()
    },
}
</script>