<template>
  <q-page class="row justify-center">
    <div class="col-11 col-sm-7 col-md-5 col-lg-3">
      <q-input type="search" v-model="search" filled placeholder="Search Books">
        <q-btn @click="searchBooks" :loading="searching" icon="eva-search-outline" slot="append" round flat></q-btn>
      </q-input>
    </div>
    <div class="col-11 row justify-center items-center">
      <book :book="book" v-for="(book, index) in books.items" :key="index">
        <q-btn @click="setBookDetails(book)" icon="eva-eye-outline" color="primary" label="details"></q-btn>
      </book>
      <q-dialog v-model="showBookDetails" transition-show="fade" transition-hide="fade" position="bottom">
            <q-card v-if="bookDetails">
                <q-card-section class="row">
                  <q-img v-if="bookDetails.volumeInfo.imageLinks" :src="bookDetails.volumeInfo.imageLinks.thumbnail"/>
                  <q-img v-else src="../assets/logo.jpg"/>
                  <div class="col-9">
                        <div class="text-h5">{{bookDetails.volumeInfo.title}}</div>
                        <div class="text-bold">{{bookDetails.volumeInfo.subtitle}}</div>
                    </div>
                </q-card-section>
                <q-separator/>

                <q-card-section>
                    <p>{{bookDetails.volumeInfo.description    }}</p>
                </q-card-section>
                
                <q-card-section>
                    <div class="row items-center">
                        <q-chip v-for="(author, index) in bookDetails.volumeInfo.authors" :key="index">
                            <q-avatar color="blue" text-color="white" icon="eva-person-outline"></q-avatar>
                            {{author}}
                        </q-chip>
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn @click="addToReading" flat label="Add to reading" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
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
      search: '',
      searching: false,
      showBookDetails: false,
      bookDetails: ''
    }
  },methods: {
    searchBooks(){
      this.searching = true
      this.$axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.search}&maxResults=12`)
        .then(res=>{
          this.books = res.data
          console.log(this.books)
        })
        .catch(err=>{
          console.error(err)
          this.$q.notify({
            message: err.message,
            color: 'red',
            icon: 'eva-alert-triangle-outline',
          })
        })
        .finally(_=>{
          this.searching = false
        })
    },
    setBookDetails(book){
      this.bookDetails = book
      this.showBookDetails = true
    },
    addToReading(){
            let reading = this.bookDetails
            reading.type = 'book'
            let user = this.firebase.auth().currentUser
            this.firebase.firestore().collection('users').doc(user.uid).collection('reading')
            .add(reading).then(_=>{
                this.$q.notify({
                    message: 'Book added'
                })
            }).catch(err=>{
                console.log(err)
            })
        }
  },
}
</script>