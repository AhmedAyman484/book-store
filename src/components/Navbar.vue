<template>
  <nav class="navbar navbar-expand-lg position-relative">
    <div class="container">

      <RouterLink to="/" class="navbar-brand d-flex align-items-center gap-2">
        <div class="brand-icon d-flex align-items-center justify-content-center flex-shrink-0">
          <img src="../assets/imgs/logo.png" alt="Book Store Logo">
        </div>

        <span class="brand-name fw-bold">
          Book Store
        </span>
      </RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar"
        aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="mainNavbar" class="collapse navbar-collapse">

        <ul class="navbar-nav mx-auto gap-lg-3">

          <li class="nav-item">
            <RouterLink to="/" class="nav-link position-relative">
              Home
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink to="/books" class="nav-link position-relative">
              Books
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink to="/authors" class="nav-link position-relative">
              Authors
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink to="/about" class="nav-link position-relative">
              About
            </RouterLink>
          </li>

        </ul>

        <div class="navbar-search-wrapper position-relative me-3">

          <div class="navbar-search d-flex align-items-center w-100 bg-white border rounded-pill px-2">

            <i class="bi bi-search flex-shrink-0"></i>

            <input v-model="searchQuery" type="text" class="form-control border-0 shadow-none px-2"
              placeholder="Search books, authors...">

            <span class="search-arrow flex-shrink-0 lh-1">
              →
            </span>

          </div>

          <div v-if="searchQuery.trim()"
            class="navbar-search-results position-absolute bg-white border rounded-3 shadow w-100 overflow-hidden">

            <template v-if="searchResults.length">

              <RouterLink v-for="result in searchResults" :key="`${result.type}-${result.id}`" :to="result.type === 'book'
                ? `/books/${result.id}`
                : `/authors/${result.id}`" @click="clearSearch"
                class="navbar-search-result d-flex align-items-center gap-2 text-decoration-none">

                <img :src="result.image" :alt="result.name" class="search-result-image rounded flex-shrink-0">

                <div class="search-result-info flex-grow-1 min-width-0">

                  <div class="search-result-name text-truncate fw-semibold">
                    {{ result.name }}
                  </div>

                  <div class="search-result-type">
                    {{ result.type === "book" ? "Book" : "Author" }}
                  </div>

                </div>

                <i class="bi bi-arrow-right search-result-arrow flex-shrink-0"></i>

              </RouterLink>

            </template>

            <div v-else-if="!searchLoading" class="navbar-search-empty d-flex align-items-center gap-2">

              <i class="bi bi-search flex-shrink-0"></i>

              <div class="d-flex flex-column">

                <strong>
                  No results found
                </strong>

                <span>
                  Try another book or author.
                </span>

              </div>

            </div>

            <div v-else class="navbar-search-empty">
              Searching...
            </div>

          </div>

        </div>

        <RouterLink to="/login" class="profile-btn border-0 d-flex align-items-center justify-content-center text-decoration-none rounded-circle"
          aria-label="Login">
          <i class="bi bi-person-fill"></i>
        </RouterLink>

      </div>

    </div>
  </nav>
</template>

<script setup>

import { ref, computed, onMounted } from "vue"
import { storeToRefs } from "pinia"

import { useBooksStore } from "../stores/booksStore"
import { useAuthorsStore } from "../stores/authorsStore"


const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()

const { books } = storeToRefs(booksStore)
const { authors } = storeToRefs(authorsStore)


const searchQuery = ref("")

const searchLoading = computed(() => {
  return booksStore.loading || authorsStore.loading
})


const searchResults = computed(() => {

  const query = searchQuery.value
    .trim()
    .toLowerCase()

  if (!query) {
    return []
  }

  const results = []

  books.value.forEach(book => {

    if (
      book.title?.toLowerCase().includes(query)
    ) {

      results.push({
        id: book.id,
        name: book.title,
        image: book.coverUrl,
        type: "book"
      })

    }

  })

  authors.value.forEach(author => {

    if (
      author.name?.toLowerCase().includes(query)
    ) {

      results.push({
        id: author.id,
        name: author.name,
        image: author.avatarUrl,
        type: "author"
      })

    }

  })

  return results.slice(0, 6)

})

const clearSearch = () => {

  searchQuery.value = ""

}

onMounted(async () => {

  await Promise.all([
    booksStore.fetchBooks(),
    authorsStore.fetchList()
  ])

})

</script>