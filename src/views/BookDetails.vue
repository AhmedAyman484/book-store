<template>
  <div class="book-details-page">

    <section class="book-details-section py-5">

      <div class="container">

        <div class="book-breadcrumb mb-4">
          <RouterLink to="/" class="text-decoration-none">
            Home
          </RouterLink>

          <i class="bi bi-chevron-right mx-2"></i>

          <RouterLink to="/books" class="text-decoration-none">
            Books
          </RouterLink>

          <i class="bi bi-chevron-right mx-2"></i>

          <span>{{ book?.title }}</span>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>

          <p class="mt-3 mb-0">
            Loading book...
          </p>
        </div>

        <div v-else-if="error" class="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-3" role="alert">
          <span>{{ error }}</span>
          <button type="button" class="btn btn-outline-danger btn-sm" @click="fetchData">Retry</button>
        </div>

        <div v-else-if="book" class="row g-4">

          <div class="col-12 col-lg-4">

            <div class="book-details-cover-wrapper text-center d-flex flex-column align-items-center">

              <img :src="book.coverUrl" :alt="book.title" class="book-details-cover img-fluid rounded-3">

              <RouterLink to="/books" class="btn btn-outline-success book-back-btn mt-3">
                <i class="bi bi-arrow-left me-2"></i>
                Back to Books
              </RouterLink>

            </div>

          </div>

          <div class="col-12 col-lg-8">

            <div class="book-details-content">

              <div class="book-details-tags mb-3">

                <span v-for="tag in book.tags || []" :key="tag" class="badge book-details-tag me-2">
                  {{ tag }}
                </span>

              </div>

              <h1 class="book-details-title mb-2 fw-bold">
                {{ book.title }}
              </h1>

              <div v-if="author" class="book-details-author mb-4 fs-6">

                <span class="text-secondary">
                  Written by
                </span>

                <span class="author-name ms-2 fw-bold">
                  {{ author.name }}
                </span>

              </div>

              <div class="row g-2 mb-4">

                <div class="col-12 col-sm-auto">

                  <div class="book-meta-item d-inline-flex align-items-center">
                    <i class="bi bi-calendar3"></i>

                    <span>
                      Published in {{ book.year }}
                    </span>
                  </div>

                </div>

                <div class="col-12 col-sm-auto">

                  <div class="book-meta-item d-inline-flex align-items-center">

                    <i class="bi bi-tag"></i>

                    <span>
                      {{ book.tags?.length || 0 }} Categories
                    </span>

                  </div>

                </div>

              </div>

              <hr class="book-details-divider">

              <div class="mb-4">

                <h2 class="book-section-title mb-3 fw-bold">
                  About This Book
                </h2>

                <p class="book-details-description mb-0 fs-6">
                  {{ book.description }}
                </p>

              </div>

              <div v-if="author" class="author-details-card p-3 p-md-4">

                <div class="row g-3 align-items-center">

                  <div class="col-auto">

                    <img :src="author.avatarUrl" :alt="author.name" class="author-details-avatar rounded-circle">

                  </div>

                  <div class="col">

                    <span class="small text-uppercase author-label">
                      About the Author
                    </span>

                    <h3 class="author-details-name mb-2 fw-bold m-0">
                      {{ author.name }}
                    </h3>

                    <p class="author-details-bio mb-3">
                      {{ author.bio }}
                    </p>

                    <RouterLink :to="`/authors/${author.id}`" class="btn btn-outline-success btn-sm">
                      <i class="bi bi-person me-2"></i>
                      View Author Profile
                    </RouterLink>

                  </div>

                </div>

              </div>

              <div class="d-flex flex-wrap gap-2 mt-4">

                <button type="button" class="btn book-reading-btn rounded-2">
                  <i class="bi bi-bookmark me-2"></i>
                  Add to Reading List
                </button>

                <RouterLink to="/books" class="btn book-back-outline-btn rounded-2">
                  <i class="bi bi-arrow-left me-2"></i>
                  Back to Books
                </RouterLink>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

    <section v-if="relatedBooks.length" class="related-books-section pb-5">

      <div class="container">

        <div class="related-books-wrapper p-3 p-md-4">

          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">

            <h2 class="related-title mb-0 fw-bold">
              <i class="bi bi-book me-2"></i>
              You May Also Like
            </h2>

            <RouterLink to="/books" class="view-all-books text-decoration-none">
              View All Books
              <i class="bi bi-arrow-right ms-2"></i>
            </RouterLink>

          </div>

          <div class="row g-3">

            <div v-for="relatedBook in relatedBooks" :key="relatedBook.id" class="col-12 col-sm-6 col-lg-3">

              <div class="related-book-card h-100 position-relative rounded-3">

                <div class="row g-3 align-items-center">

                  <div class="col-4">

                    <img :src="relatedBook.coverUrl" :alt="relatedBook.title" class="related-book-cover img-fluid">

                  </div>


                  <div class="col-8">

                    <h3 class="related-book-title fw-bold">
                      {{ relatedBook.title }}
                    </h3>

                    <p class="related-book-author mb-2">
                      {{ getAuthorName(relatedBook.authorId) }}
                    </p>

                    <div>

                      <span v-for="tag in (relatedBook.tags || []).slice(0, 2)" :key="tag"
                        class="badge related-book-tag me-1 fw-medium">
                        {{ tag }}
                      </span>

                    </div>

                  </div>

                </div>

                <RouterLink :to="`/books/${relatedBook.id}`" class="stretched-link"
                  :aria-label="`View ${relatedBook.title}`"></RouterLink>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  </div>
  <AIChat
  context-type="book"
  :context-data="book"
  />
</template>


<script setup>
import AIChat from "../components/AIChat.vue";
import { ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"

import { useBooksStore } from "../stores/booksStore"
import { useAuthorsStore } from "../stores/authorsStore"


const route = useRoute()

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()

const { books, loading: booksLoading, error: booksError } =
  storeToRefs(booksStore)

const { authors, loading: authorsLoading, error: authorsError } =
  storeToRefs(authorsStore)


const book = ref(null)
const author = ref(null)

const loading = ref(true)
const error = ref("")

const relatedBooks = ref([])


const getAuthorName = (authorId) => {

  const foundAuthor = authors.value.find(
    (item) =>
      String(item.id) === String(authorId)
  )

  return foundAuthor
    ? foundAuthor.name
    : "Unknown Author"

}


const loadBookDetails = () => {

  book.value = books.value.find(
    (item) =>
      String(item.id) === String(route.params.id)
  )

  if (!book.value) {

    error.value = "Book not found."

    author.value = null
    relatedBooks.value = []

    return
  }


  author.value = authors.value.find(
    (item) =>
      String(item.id) === String(book.value.authorId)
  ) || null


  loadRelatedBooks()

}


const loadRelatedBooks = () => {

  if (!book.value) {

    relatedBooks.value = []

    return
  }


  const currentTags = book.value.tags || []


  relatedBooks.value = books.value

    .filter(
      (item) =>
        String(item.id) !==
        String(book.value.id)
    )

    .filter((item) => {

      const itemTags = item.tags || []

      return itemTags.some((tag) =>
        currentTags.includes(tag)
      )

    })

    .slice(0, 4)

}


const fetchData = async () => {

  try {

    loading.value = true
    error.value = ""

    await Promise.all([
      booksStore.fetchBooks(),
      authorsStore.fetchList()
    ])


    if (booksError.value) {

      throw new Error(
        booksError.value
      )

    }


    if (authorsError.value) {

      throw new Error(
        authorsError.value
      )

    }


    loadBookDetails()


  } catch (err) {

    console.error(err)

    error.value =
      err.message ||
      "Unable to load book details."


  } finally {

    loading.value = false

  }

}

onMounted(() => {

  fetchData()

})

watch(
  () => route.params.id,
  () => {

    loadBookDetails()

  }
)

</script>