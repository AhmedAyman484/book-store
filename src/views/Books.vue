<template>
    <div class="books-page">

        <section class="books-hero">
            <div class="container">
                <div class="books-hero-content py-5">
                    <div class="breadcrumb-area d-flex align-items-center gap-2 mb-3">
                        <RouterLink to="/" class="text-decoration-none"> Home </RouterLink>

                        <i class="bi bi-chevron-right"></i>

                        <span>Books</span>
                    </div>

                    <h1 class="mb-2">Our Books</h1>

                    <p class="mb-0">
                        Explore our collection of popular books, timeless classics, and new
                        releases. Find your next great read.
                    </p>
                </div>
            </div>
        </section>

        <section class="books-section py-4 py-lg-5">
            <div class="container">

                <div class="books-filters p-3 mb-4 rounded-3">
                    <div class="row g-2">

                        <div class="col-12 col-lg-6">
                            <div class="books-search input-group overflow-hidden rounded-2">
                                <span class="input-group-text bg-white border-0 justify-content-center">
                                    <i class="bi bi-search"></i>
                                </span>

                                <input v-model="searchQuery" type="text" class="form-control border-0 shadow-none"
                                    placeholder="Search for a book..." />
                            </div>
                        </div>

                        <div class="col-12 col-sm-4 col-lg-2">
                            <select v-model="selectedCategory" class="form-select books-select rounded-2">
                                <option value="">All Categories</option>

                                <option v-for="category in categories" :key="category" :value="category">
                                    {{ category }}
                                </option>
                            </select>
                        </div>

                        <div class="col-12 col-sm-4 col-lg-2">
                            <select v-model="selectedYear" class="form-select books-select rounded-2">
                                <option value="">All Years</option>

                                <option v-for="year in years" :key="year" :value="year">
                                    {{ year }}
                                </option>
                            </select>
                        </div>

                        <div class="col-12 col-sm-4 col-lg-2">
                            <select v-model="sortBy" class="form-select books-select rounded-2">
                                <option value="">Sort By</option>

                                <option value="title">Title</option>

                                <option value="year-new">Newest</option>

                                <option value="year-old">Oldest</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
                    <p class="books-count mb-0">
                        Showing
                        {{ filteredBooks.length === 0 ? 0 : startIndex + 1 }}
                        –
                        {{ Math.min(endIndex, filteredBooks.length) }}
                        of
                        {{ filteredBooks.length }}
                        books
                    </p>

                    <div class="view-buttons d-flex gap-2">
                        <button type="button" class="view-btn rounded-2" :class="{ active: viewMode === 'grid' }"
                            @click="viewMode = 'grid'">
                            <i class="bi bi-grid-3x3-gap"></i>
                        </button>

                        <button type="button" class="view-btn rounded-2" :class="{ active: viewMode === 'list' }"
                            @click="viewMode = 'list'">
                            <i class="bi bi-list"></i>
                        </button>
                    </div>
                </div>

                <div v-if="loading" class="text-center py-5">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden"> Loading... </span>
                    </div>

                    <p class="mt-3 mb-0">Loading books...</p>
                </div>

                <div v-else-if="error" class="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-3 my-4" role="alert">
                    <span>{{ error }}</span>
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="loadBooks">Retry</button>
                </div>

                <div v-else-if="paginatedBooks.length === 0" class="text-center py-5">
                    <i class="bi bi-book fs-1"></i>

                    <h3 class="mt-3">No books found</h3>

                    <p class="text-secondary">Try changing your search or filters.</p>
                </div>

                <div v-else class="row g-3" :class="{ 'books-list-view': viewMode === 'list' }">
                    <div v-for="book in paginatedBooks" :key="book.id" class="col-12 col-sm-6 col-md-4 col-lg-2">
                        <div class="book-card h-100 d-flex flex-column">
                            <span class="book-year position-absolute">
                                {{ book.year }}
                            </span>

                            <div class="book-cover text-center">
                                <img :src="book.coverUrl" :alt="book.title" class="img-fluid" />
                            </div>

                            <div class="book-info p-3 d-flex flex-column h-100">
                                <h2 class="book-title overflow-hidden fw-bold fs-6 lh-sm">
                                    {{ book.title }}
                                </h2>

                                <p class="book-author mb-2">
                                    {{ getAuthorName(book.authorId) }}
                                </p>

                                <div class="book-tags d-flex flex-wrap gap-1 mb-2">
                                    <span v-for="tag in (book.tags || []).slice(0, 2)" :key="tag" class="book-tag d-inline-flex align-items-center">
                                        {{ tag }}
                                    </span>
                                </div>

                                <p class="book-description mb-3 overflow-hidden">
                                    {{
                                        book.description ||
                                    "Discover more about this book and its story..."
                                    }}
                                </p>

                                <RouterLink :to="`/books/${book.id}`"
                                    class="view-details-btn mt-auto text-decoration-none d-flex align-items-center justify-content-center gap-2 fw-semibold">
                                    View Details
                                    <i class="bi bi-arrow-right"></i>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>

                <nav v-if="totalPages > 1"
                    class="books-pagination d-flex justify-content-center align-items-center gap-2 mt-4"
                    aria-label="Books pagination">
                    <button class="pagination-btn rounded-2" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
                        <i class="bi bi-chevron-left"></i>
                    </button>

                    <button v-for="page in visiblePages" :key="page" class="pagination-btn rounded-2"
                        :class="{ active: currentPage === page }" @click="changePage(page)">
                        {{ page }}
                    </button>

                    <button class="pagination-btn rounded-2" :disabled="currentPage === totalPages"
                        @click="changePage(currentPage + 1)">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </nav>
            </div>
        </section>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useBooksStore } from "../stores/booksStore";
import { useAuthorsStore } from "../stores/authorsStore";

const route = useRoute();

const booksStore = useBooksStore();
const authorsStore = useAuthorsStore();

const { books, loading, error } = storeToRefs(booksStore);
const { authors } = storeToRefs(authorsStore);

const searchQuery = ref(route.query.search || "");

const selectedCategory = ref("");
const selectedYear = ref("");
const sortBy = ref("");

const currentPage = ref(1);
const booksPerPage = 12;

const viewMode = ref("grid");

const getAuthorName = (authorId) => {
    const author = authors.value.find(
        (author) => Number(author.id) === Number(authorId)
    );

    return author ? author.name : "Unknown Author";
};

const categories = computed(() => {
    const allTags = books.value.flatMap((book) => book.tags || []);

    return [...new Set(allTags)].sort();
});

const years = computed(() => {
    return [
        ...new Set(
            books.value
                .map((book) => book.year)
                .filter(Boolean)
        ),
    ].sort((a, b) => b - a);
});

const filteredBooks = computed(() => {
    let result = books.value.filter((book) => {
        const query = searchQuery.value.toLowerCase().trim();

        const titleMatch = book.title?.toLowerCase().includes(query);

        const authorMatch = getAuthorName(book.authorId)
            .toLowerCase()
            .includes(query);

        const matchesSearch =
            !query || titleMatch || authorMatch;

        const matchesCategory =
            !selectedCategory.value ||
            (book.tags || []).includes(selectedCategory.value);

        const matchesYear =
            !selectedYear.value ||
            String(book.year) === String(selectedYear.value);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesYear
        );
    });

    if (sortBy.value === "title") {
        result.sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    }

    if (sortBy.value === "year-new") {
        result.sort(
            (a, b) => Number(b.year) - Number(a.year)
        );
    }

    if (sortBy.value === "year-old") {
        result.sort(
            (a, b) => Number(a.year) - Number(b.year)
        );
    }

    return result;
});

const totalPages = computed(() => {
    return Math.ceil(
        filteredBooks.value.length / booksPerPage
    );
});

const startIndex = computed(() => {
    return (currentPage.value - 1) * booksPerPage;
});

const endIndex = computed(() => {
    return startIndex.value + booksPerPage;
});

const paginatedBooks = computed(() => {
    return filteredBooks.value.slice(
        startIndex.value,
        endIndex.value
    );
});

const visiblePages = computed(() => {
    const pages = [];

    for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i);
    }

    return pages;
});

const changePage = (page) => {
    if (
        page < 1 ||
        page > totalPages.value
    ) {
        return;
    }

    currentPage.value = page;

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

const loadBooks = async () => {
    try {
        await Promise.all([
            booksStore.fetchBooks(),
            authorsStore.fetchAuthors(),
        ]);
    } catch (error) {
        console.error(error);
    }
};

watch(
    [
        searchQuery,
        selectedCategory,
        selectedYear,
        sortBy,
    ],
    () => {
        currentPage.value = 1;
    }
);

onMounted(loadBooks);
</script>