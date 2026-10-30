<template>
  <div class="author-details-page">

    <section class="author-details-hero position-relative overflow-hidden">
      <div class="container">

        <div class="author-breadcrumb mb-4">
          <RouterLink to="/" class="text-decoration-none">
            Home
          </RouterLink>

          <span class="mx-2">›</span>

          <RouterLink to="/authors" class="text-decoration-none">
            Authors
          </RouterLink>

          <span class="mx-2">›</span>

          <span>{{ author?.name }}</span>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border"></div>
        </div>

        <div v-else-if="error" class="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-3" role="alert">
          <span>{{ error }}</span>
          <button type="button" class="btn btn-outline-danger btn-sm" @click="loadAuthorData">Retry</button>
        </div>

        <div v-else-if="author">

          <div class="row align-items-center g-4">

            <div class="col-12 col-lg-3 text-center">

              <div class="author-profile-image-wrapper rounded-circle">
                <img :src="author.avatarUrl" :alt="author.name" class="author-profile-image w-100 h-100 d-block rounded-circle">
              </div>

            </div>

            <div class="col-12 col-lg-6">

              <span class="author-details-badge lh-1">
                Author
              </span>

              <h1 class="author-details-name mt-3 mb-2 fw-bold m-0">
                {{ author.name }}
              </h1>

              <p class="author-details-subtitle mb-4">
                {{ getAuthorSubtitle(author) }}
              </p>

              <div class="author-meta d-flex flex-wrap gap-3 mb-4">

                <div class="author-meta-item d-inline-flex align-items-center">
                  <span class="author-flag">
                    {{ author.flag }}
                  </span>
                  <span>{{ author.nationality }}</span>
                </div>

                <div class="author-meta-item d-inline-flex align-items-center">
                  <i class="bi bi-book"></i>
                  <span>{{ author.books }} Books</span>
                </div>

                <div class="author-meta-item d-inline-flex align-items-center">
                  <i class="bi bi-people"></i>
                  <span>{{ formatFollowers(author.followers) }} Followers</span>
                </div>

              </div>

              <div class="d-flex flex-wrap gap-2">

                <button type="button" class="btn author-follow-btn">
                  <i class="bi bi-person-plus me-2"></i>
                  Follow Author
                </button>

                <button type="button" class="btn author-share-btn" @click="shareAuthor">
                  <i class="bi bi-share me-2"></i>
                  Share
                </button>

              </div>

            </div>

            <div class="col-12 col-lg-3">

              <div class="author-quote-card position-relative">

                <div class="author-quote-icon fw-bold">
                  “
                </div>

                <p class="author-quote-text m-0 fst-italic lh-base">
                  Discover the stories,
                  ideas, and worlds created
                  by {{ author.name }}.
                </p>

                <div class="author-quote-line"></div>

                <span>
                  — {{ author.name }}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>

    <section v-if="author" class="author-tabs-section">

      <div class="container">

        <div class="author-tabs d-flex align-items-stretch justify-content-start justify-content-md-around overflow-hidden rounded-3">

          <button type="button" class="author-tab d-flex align-items-center justify-content-center border-0" :class="{ active: activeTab === 'about' }"
            @click="activeTab = 'about'">
            <i class="bi bi-person"></i>
            <span>About</span>
          </button>

          <button type="button" class="author-tab d-flex align-items-center justify-content-center border-0" :class="{ active: activeTab === 'books' }"
            @click="activeTab = 'books'; scrollToBooks()">
            <i class="bi bi-book"></i>
            <span>Books ({{ authorBooks.length }})</span>
          </button>

          <button type="button" class="author-tab d-flex align-items-center justify-content-center border-0" :class="{ active: activeTab === 'quotes' }"
            @click="activeTab = 'quotes'">
            <i class="bi bi-quote"></i>
            <span>Quotes</span>
          </button>

          <button type="button" class="author-tab d-flex align-items-center justify-content-center border-0" :class="{ active: activeTab === 'related' }"
            @click="activeTab = 'related'; scrollToRelated()">
            <i class="bi bi-people"></i>
            <span>Related Authors</span>
          </button>

        </div>

      </div>

    </section>

    <section v-if="author" class="author-details-content py-4 py-lg-5">

      <div class="container">

        <div class="row g-4">

          <div class="col-12 col-lg-8">

            <div class="author-info-card h-100 rounded-3">

              <div class="author-card-heading d-flex align-items-center">

                <div class="author-heading-icon d-flex align-items-center justify-content-center rounded-3">
                  <i class="bi bi-file-text"></i>
                </div>

                <h2>
                  Biography
                </h2>

              </div>

              <p class="author-biography m-0">
                {{ author.bio }}
              </p>

            </div>

          </div>

          <div class="col-12 col-lg-4">

            <div class="author-info-card h-100 rounded-3">

              <div class="author-card-heading d-flex align-items-center">

                <div class="author-heading-icon d-flex align-items-center justify-content-center rounded-3">
                  <i class="bi bi-person"></i>
                </div>

                <h2>
                  Personal Information
                </h2>

              </div>

              <div class="author-information">

                <div class="author-information-row d-flex align-items-center justify-content-between">
                  <span>Name</span>
                  <strong>{{ author.name }}</strong>
                </div>

                <div class="author-information-row d-flex align-items-center justify-content-between">
                  <span>Nationality</span>

                  <strong>
                    {{ author.flag }}
                    {{ author.nationality }}
                  </strong>
                </div>

                <div class="author-information-row d-flex align-items-center justify-content-between">
                  <span>Books</span>
                  <strong>{{ author.books }}</strong>
                </div>

                <div class="author-information-row d-flex align-items-center justify-content-between">
                  <span>Followers</span>
                  <strong>
                    {{ formatFollowers(author.followers) }}
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div id="author-books" class="author-books-section mt-4">

          <div class="author-section-header d-flex align-items-start align-items-md-center justify-content-between align-items-center">

            <div class="d-flex align-items-center gap-3">

              <div class="author-section-icon d-flex align-items-center justify-content-center">
                <i class="bi bi-book"></i>
              </div>

              <h2>
                Books by {{ author.name }}
              </h2>

            </div>

            <RouterLink to="/books" class="author-view-all text-decoration-none text-nowrap">
              View All Books
              <i class="bi bi-arrow-right ms-2"></i>
            </RouterLink>

          </div>

          <div v-if="booksLoading" class="text-center py-5">
            <div class="spinner-border"></div>
          </div>

          <div v-else-if="booksError" class="alert alert-danger">
            {{ booksError }}
          </div>

          <div v-else-if="authorBooks.length" class="row g-3">

            <div v-for="book in authorBooks" :key="book.id" class="col-12 col-md-6">

              <article class="author-book-card h-100 d-flex flex-column flex-md-row align-items-center text-center text-md-start rounded-3">

                <div class="author-book-cover-wrapper">

                  <img :src="book.coverUrl" :alt="book.title" class="author-book-cover d-block">

                </div>

                <div class="author-book-content d-flex flex-column">

                  <h3>
                    {{ book.title }}
                  </h3>

                  <div class="d-flex flex-wrap gap-2 mb-3">

                    <span v-for="tag in book.tags" :key="tag" class="author-book-tag rounded-2">
                      {{ tag }}
                    </span>

                  </div>

                  <p>
                    {{ book.description }}
                  </p>

                  <div class="author-book-meta">

                    <span>
                      <i class="bi bi-calendar3 me-1"></i>
                      {{ book.year }}
                    </span>

                  </div>

                  <RouterLink :to="`/books/${book.id}`" class="btn author-book-btn w-100">
                    View Book
                    <i class="bi bi-arrow-right ms-2"></i>
                  </RouterLink>

                </div>

              </article>

            </div>

          </div>

          <div v-else class="text-center py-5 text-secondary">
            No books found for this author.
          </div>

        </div>

        <div id="related-authors" class="related-authors-section mt-5">

          <div class="author-section-header d-flex align-items-start align-items-md-center justify-content-between">

            <div class="d-flex align-items-center gap-3">

              <div class="author-section-icon d-flex align-items-center justify-content-center">
                <i class="bi bi-people"></i>
              </div>

              <h2>
                You May Also Like
              </h2>

            </div>

            <RouterLink to="/authors" class="author-view-all text-decoration-none text-nowrap">
              View All Authors
              <i class="bi bi-arrow-right ms-2"></i>
            </RouterLink>

          </div>


          <div class="row g-3">

            <div v-for="relatedAuthor in relatedAuthors" :key="relatedAuthor.id" class="col-12 col-sm-6 col-lg-3">

              <article class="related-author-card h-100 d-flex align-items-center rounded-3">

                <img :src="relatedAuthor.avatarUrl" :alt="relatedAuthor.name" class="related-author-image rounded-circle">

                <div class="related-author-info">

                  <h3>
                    {{ relatedAuthor.name }}
                  </h3>

                  <p>
                    {{ relatedAuthor.flag }}
                    {{ relatedAuthor.nationality }}
                  </p>

                  <span>
                    <i class="bi bi-book me-1"></i>
                    {{ relatedAuthor.books }} Books
                  </span>

                  <RouterLink :to="`/authors/${relatedAuthor.id}`" class="btn related-author-btn">
                    View Profile
                  </RouterLink>

                </div>

              </article>

            </div>

          </div>

        </div>

      </div>

    </section>
  </div>
  <AIChat
  context-type="author"
  :context-data="author"
  />
</template>


<script setup>

import AIChat from "../components/AIChat.vue";
import { computed, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"

import { useBooksStore } from "../stores/booksStore"
import { useAuthorsStore } from "../stores/authorsStore"


const route = useRoute()

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()

const { books } = storeToRefs(booksStore)
const { authors: allAuthors } = storeToRefs(authorsStore)


const author = ref(null)

const loading = ref(true)
const booksLoading = ref(true)

const error = ref("")
const booksError = ref("")

const activeTab = ref("about")

const getAuthor = () => {

  const foundAuthor = allAuthors.value.find(
    item => String(item.id) === String(route.params.id)
  )

  if (!foundAuthor) {
    throw new Error("Author not found")
  }

  author.value = foundAuthor
}

const authorBooks = computed(() => {

  return books.value.filter(
    book =>
      String(book.authorId) === String(route.params.id)
  )

})

const relatedAuthors = computed(() => {

  return allAuthors.value
    .filter(
      item =>
        String(item.id) !== String(route.params.id)
    )
    .slice(0, 4)

})

const formatFollowers = (followers) => {

  if (followers >= 1000000) {
    return `${(followers / 1000000).toFixed(1)}M`
  }

  if (followers >= 1000) {
    return `${(followers / 1000).toFixed(1)}K`
  }

  return followers

}

const getAuthorSubtitle = (authorData) => {

  if (authorData?.nationality) {
    return `${authorData.nationality} Author`
  }

  return "Author"

}

const shareAuthor = async () => {

  if (!author.value) {
    return
  }

  const shareData = {
    title: author.value.name,
    text: author.value.bio,
    url: window.location.href
  }

  try {

    if (navigator.share) {

      await navigator.share(shareData)

    } else {

      await navigator.clipboard.writeText(
        window.location.href
      )

    }

  } catch (err) {

    console.error(err)

  }

}

const scrollToBooks = () => {

  document
    .getElementById("author-books")
    ?.scrollIntoView({
      behavior: "smooth"
    })

}


const scrollToRelated = () => {

  document
    .getElementById("related-authors")
    ?.scrollIntoView({
      behavior: "smooth"
    })

}

const loadAuthorData = async () => {

  try {

    loading.value = true
    booksLoading.value = true

    error.value = ""
    booksError.value = ""

    await Promise.all([
      authorsStore.fetchList(),
      booksStore.fetchBooks()
    ])

    getAuthor()

  } catch (err) {

    console.error(err)

    error.value = "Unable to load author."

  } finally {

    loading.value = false
    booksLoading.value = false

  }

}

watch(
  () => route.params.id,
  async () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

    await loadAuthorData()

  }
)

onMounted(() => {

  loadAuthorData()

})

</script>