<template>
    <q-page class="row justify-center">
        <div class="col-11 row justify-center">
            <book @click="readBook(book)" :book="book" v-for="(book, index) in books" :key="index">
                <div class="row justify-between full-width">
                    <q-btn @click="returnBook(book)" icon="eva-trash-2-outline" color="orange" label="return"></q-btn>
                    <q-btn @click="readBook(book)" icon="eva-book-open-outline" color="primary" label="read"></q-btn>
                </div>
            </book>
        </div>
    </q-page>
</template>

<script>
import Book from '../components/Book'
export default {
    name: 'PageIndex',
    components: {Book},
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
            console.log(book)
            this.$router.push({name: 'view', query: {type: book.type, id: book.id}})
        }
    },
    created() {
        // this.$q.loading.show()
        this.getReading()
    },
}
</script>