<template>
    <section class="featured-section">

        <div class="container">

            <div class="section-header d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-lg-end mb-4">

                <div>

                    <div class="section-eyebrow fw-medium mb-2">
                        COLLECTION
                    </div>

                    <h2 class="section-title fw-bold m-0">
                        Featured Books
                    </h2>

                    <p class="section-description">
                        Explore some of our most popular books.
                    </p>

                </div>

                <RouterLink to="/books" class="view-all d-inline-flex align-items-center gap-2 text-decoration-none fw-medium mt-2 mt-sm-3 mt-2 mt-sm-3 mb-1">
                    View All Books
                    <i class="bi bi-arrow-right"></i>
                </RouterLink>

            </div>

            <div class="row g-3 mb-4 align-items-center">

                <div class="col-lg-8">

                    <div class="search-box position-relative">

                        <i class="bi bi-search"></i>

                        <input v-model="searchQuery" type="text" class="form-control"
                            placeholder="Search for a book..." />

                    </div>

                </div>

                <div class="col-lg-3">

                    <select v-model="selectedCategory" class="form-select category-select shadow-none rounded-2">

                        <option value="">
                            All Categories
                        </option>

                        <option v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </option>

                    </select>

                </div>

                <div class="col-lg-1">

                    <button type="button" class="filter-btn btn w-100 rounded-2">
                        <i class="bi bi-sliders"></i>
                    </button>

                </div>

            </div>

            <div v-if="loading" class="text-center py-5">
                Loading books...
            </div>

            <div v-else-if="error" class="text-center py-5 text-danger">
                {{ error }}
            </div>

            <div v-else class="row g-3">

                <div v-for="book in featuredBooks" :key="book.id" class="col-12 col-sm-6 col-md-4 col-lg-2">

                    <div class="book-card h-100 position-relative overflow-hidden rounded-3">

                        <span class="book-year position-absolute">
                            {{ book.year }}
                        </span>


                        <div class="book-cover d-flex align-items-center justify-content-center text-center">

                            <img :src="book.coverUrl" :alt="book.title" />

                        </div>


                        <div class="book-info d-flex flex-column flex-grow-1">

                            <h3 class="book-title overflow-hidden fw-bold fs-6 lh-sm">
                                {{ book.title }}
                            </h3>


                            <p class="book-author">
                                {{ getAuthorName(book.authorId) }}
                            </p>


                            <div class="book-tags d-flex flex-wrap gap-1">

                                <span v-for="tag in book.tags.slice(0, 2)" :key="tag" class="book-tag d-inline-flex align-items-center">
                                    {{ tag }}
                                </span>

                            </div>


                            <RouterLink :to="`/books/${book.id}`"
                                class="view-details-btn d-flex align-items-center justify-content-center mt-auto fw-semibold">
                                View Details
                            </RouterLink>

                        </div>

                    </div>

                </div>
                
                <div v-if="featuredBooks.length === 0" class="col-12">
                    <div class="text-center py-5">

                        <i class="bi bi-book fs-1 text-secondary"></i>

                        <h3 class="mt-3">
                            No books found
                        </h3>

                        <p class="text-secondary">
                            Try changing your search or filters.
                        </p>

                    </div>
                </div>

            </div>

        </div>

    </section>
</template>


<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import { useBooksStore } from "../stores/booksStore";
import { useAuthorsStore } from "../stores/authorsStore";

const booksStore = useBooksStore();
const authorsStore = useAuthorsStore();

const { books } = storeToRefs(booksStore);
const { authors } = storeToRefs(authorsStore);

const searchQuery = ref("");
const selectedCategory = ref("");

const loading = computed(() => booksStore.loading || authorsStore.loading);
const error = computed(() => booksStore.error || authorsStore.error || "");

const getAuthorName = (authorId) => {
  const author = authors.value.find(
    (item) => Number(item.id) === Number(authorId)
  );

  return author?.name || "Unknown Author";
};

const categories = computed(() => {
  const allTags = books.value.flatMap((book) => book.tags || []);
  return [...new Set(allTags)];
});

const filteredBooks = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  return books.value.filter((book) => {
    const matchesSearch =
      !query ||
      book.title?.toLowerCase().includes(query) ||
      getAuthorName(book.authorId).toLowerCase().includes(query);

    const matchesCategory =
      !selectedCategory.value ||
      (book.tags || []).includes(selectedCategory.value);

    return matchesSearch && matchesCategory;
  });
});

const featuredBooks = computed(() => filteredBooks.value.slice(0, 6));
</script>
