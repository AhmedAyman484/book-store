<template>
  <div class="authors-page">

    <section class="authors-hero">
      <div class="container">
        <div class="row align-items-center min-vh-25">
          <div class="col-12 col-lg-7">

            <div class="authors-breadcrumb mb-3">
              <RouterLink to="/" class="text-decoration-none">
                Home
              </RouterLink>

              <span class="mx-2">›</span>

              <span>Authors</span>
            </div>

            <h1 class="authors-title mb-2 fw-bold">
              Our <span>Authors</span>
            </h1>

            <p class="authors-subtitle mb-0">
              Discover the talented authors behind our books.
            </p>

          </div>
        </div>
      </div>
    </section>

    <section class="authors-content py-4 py-lg-5">

      <div class="container">

        <div class="authors-filters bg-white border rounded-3 p-2 mb-4">

          <div class="row g-2">

            <div class="col-12 col-lg-6">

              <div class="authors-search input-group h-100 overflow-hidden">

                <span class="input-group-text bg-white border-0 justify-content-center">
                  <i class="bi bi-search"></i>
                </span>

                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control border-0 shadow-none"
                  placeholder="Search for an author..."
                >

              </div>

            </div>

            <div class="col-12 col-md-6 col-lg-3">

              <select
                v-model="selectedNationality"
                class="form-select h-100 shadow-none"
              >
                <option value="">All Nationalities</option>

                <option
                  v-for="nationality in nationalities"
                  :key="nationality"
                  :value="nationality"
                >
                  {{ nationality }}
                </option>
              </select>

            </div>

            <div class="col-12 col-md-6 col-lg-3">

              <select
                v-model="sortBy"
                class="form-select h-100 shadow-none"
              >
                <option value="">Sort By</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="books-desc">Most Books</option>
                <option value="followers-desc">Most Followers</option>
              </select>

            </div>

          </div>

        </div>

        <div class="d-flex justify-content-between align-items-center mb-3">

          <p class="mb-0 text-secondary">
            Showing
            {{ filteredAuthors.length }}
            authors
          </p>

          <div class="btn-group">

            <button
              type="button"
              class="btn btn-sm authors-view-btn"
              :class="{ active: viewMode === 'grid' }"
              aria-label="Grid view"
              :aria-pressed="viewMode === 'grid'"
              @click="viewMode = 'grid'"
            >
              <i class="bi bi-grid-3x3-gap"></i>
            </button>

            <button
              type="button"
              class="btn btn-sm authors-view-btn"
              :class="{ active: viewMode === 'list' }"
              aria-label="List view"
              :aria-pressed="viewMode === 'list'"
              @click="viewMode = 'list'"
            >
              <i class="bi bi-list"></i>
            </button>

          </div>

        </div>

        <div
          v-if="loading"
          class="text-center py-5"
        >
          <div
            class="spinner-border"
            role="status"
          >
            <span class="visually-hidden">
              Loading...
            </span>
          </div>
        </div>

        <div
          v-else-if="error"
          class="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-3"
          role="alert"
        >
          <span>{{ error }}</span>
          <button type="button" class="btn btn-outline-danger btn-sm" @click="loadAuthors">
            Retry
          </button>
        </div>

        <div
          v-else
          class="row g-4"
        >

          <div
            v-for="author in paginatedAuthors"
            :key="author.id"
            :class="viewMode === 'list' ? 'col-12' : 'col-12 col-md-6 col-lg-3'"
          >

            <article
              class="author-card h-100 d-flex flex-column p-3"
              :class="{ 'author-list-card': viewMode === 'list' }"
            >

              <div class="d-flex align-items-start gap-3">

                <img
                  :src="author.avatarUrl"
                  :alt="author.name"
                  class="author-image flex-shrink-0 rounded-circle"
                >

                <div class="pt-1">

                  <h2 class="author-name mb-1 fw-bold">
                    {{ author.name }}
                  </h2>

                  <p class="author-nationality mb-2">
                    <span class="me-1">
                      {{ author.flag }}
                    </span>

                    {{ author.nationality }}
                  </p>

                  <p class="author-bio mb-0 overflow-hidden">
                    {{ author.bio }}
                  </p>

                </div>

              </div>

              <div class="author-stats d-flex gap-4 mt-4 mb-3">

                <div class="d-flex align-items-center gap-1">

                  <i class="bi bi-book-half"></i>

                  <span>
                    {{ author.books }} Books
                  </span>

                </div>

                <div class="d-flex align-items-center gap-1">

                  <i class="bi bi-person-fill"></i>

                  <span>
                    {{ formatFollowers(author.followers) }}
                    Followers
                  </span>

                </div>

              </div>

              <RouterLink
                :to="`/authors/${author.id}`"
                class="btn author-profile-btn w-100 d-flex align-items-center justify-content-center border-0"
              >
                View Profile
                <i class="bi bi-arrow-right ms-2"></i>
              </RouterLink>

            </article>

          </div>

          <div
            v-if="paginatedAuthors.length === 0"
            class="col-12"
          >
            <div class="text-center py-5">

              <i class="bi bi-search fs-1 text-secondary"></i>

              <h3 class="mt-3">
                No authors found
              </h3>

              <p class="text-secondary">
                Try changing your search or filters.
              </p>

            </div>
          </div>

        </div>

        <nav
          v-if="totalPages > 1"
          class="mt-5"
          aria-label="Authors pagination"
        >

          <ul class="pagination justify-content-center mb-0 d-flex align-items-center">

            <li
              class="page-item"
              :class="{ disabled: currentPage === 1 }"
            >
              <button
                class="page-link text-center"
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
              >
                <i class="bi bi-chevron-left"></i>
              </button>
            </li>


            <li
              v-for="page in totalPages"
              :key="page"
              class="page-item"
              :class="{ active: currentPage === page }"
            >
              <button
                class="page-link text-center"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </li>


            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <button
                class="page-link text-center"
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages"
              >
                <i class="bi bi-chevron-right"></i>
              </button>
            </li>

          </ul>

        </nav>

      </div>

    </section>

  </div>
</template>


<script setup>

import { computed, onMounted, ref, watch } from "vue"
import { storeToRefs } from "pinia"
import { useAuthorsStore } from "../stores/authorsStore"


const authorsStore = useAuthorsStore()

const {
  authors,
  loading,
  error
} = storeToRefs(authorsStore)


const searchQuery = ref("")
const selectedNationality = ref("")
const sortBy = ref("")
const currentPage = ref(1)
const authorsPerPage = 8
const viewMode = ref("grid")


const nationalities = computed(() => {

  return [...new Set(
    authors.value.map(author => author.nationality)
  )]

})


const filteredAuthors = computed(() => {

  let result = [...authors.value]

  if (searchQuery.value.trim()) {

    const query = searchQuery.value
      .toLowerCase()
      .trim()

    result = result.filter(author =>
      author.name.toLowerCase().includes(query)
    )

  }


  if (selectedNationality.value) {

    result = result.filter(author =>
      author.nationality === selectedNationality.value
    )

  }


  if (sortBy.value === "name-asc") {

    result.sort((a, b) =>
      a.name.localeCompare(b.name)
    )

  }


  if (sortBy.value === "name-desc") {

    result.sort((a, b) =>
      b.name.localeCompare(a.name)
    )

  }


  if (sortBy.value === "books-desc") {

    result.sort((a, b) =>
      b.books - a.books
    )

  }


  if (sortBy.value === "followers-desc") {

    result.sort((a, b) =>
      b.followers - a.followers
    )

  }


  return result

})


const totalPages = computed(() => {

  return Math.ceil(
    filteredAuthors.value.length / authorsPerPage
  )

})


const paginatedAuthors = computed(() => {

  const start =
    (currentPage.value - 1) * authorsPerPage

  const end =
    start + authorsPerPage

  return filteredAuthors.value.slice(start, end)

})


const changePage = (page) => {

  if (page < 1 || page > totalPages.value) {
    return
  }

  currentPage.value = page

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })

}


const formatFollowers = (followers) => {

  if (followers >= 1000000) {
    return `${(followers / 1000000).toFixed(1)}M`
  }

  if (followers >= 1000) {
    return `${(followers / 1000).toFixed(1)}K`
  }

  return followers

}


watch(
  [searchQuery, selectedNationality, sortBy],
  () => {
    currentPage.value = 1
  }
)


const loadAuthors = async () => {
  try {
    await authorsStore.fetchList()
  } catch (error) {
    console.error(error)
  }
}

onMounted(loadAuthors)

</script>