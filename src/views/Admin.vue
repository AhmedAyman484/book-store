<template>
  <AdminLayout>
    <section class="welcome-section d-flex align-items-center">
      <div class="welcome-text">
        <span class="section-eyebrow fw-medium mb-2">BOOK STORE ADMIN</span>

        <h1>
          Welcome Back,
          <strong>Admin!</strong>
        </h1>

        <p>Manage books and authors, and keep your bookstore growing.</p>
      </div>
    </section>

    <section class="stats-row row g-3">
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="stat-card h-100 d-flex align-items-center">
          <div class="stat-icon books-icon d-flex align-items-center justify-content-center flex-shrink-0">
            <i class="bi bi-book-half"></i>
          </div>

          <div class="stat-content">
            <span>Total Books</span>
            <strong>{{ books.length }}</strong>
            <small>
              <i class="bi bi-arrow-up-right"></i>
              Library collection
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="stat-card h-100 d-flex align-items-center">
          <div class="stat-icon authors-icon d-flex align-items-center justify-content-center flex-shrink-0">
            <i class="bi bi-person-fill"></i>
          </div>

          <div class="stat-content">
            <span>Total Authors</span>
            <strong>{{ authors.length }}</strong>
            <small>
              <i class="bi bi-arrow-up-right"></i>
              Registered authors
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="stat-card h-100 d-flex align-items-center">
          <div class="stat-icon categories-icon d-flex align-items-center justify-content-center flex-shrink-0">
            <i class="bi bi-tag-fill"></i>
          </div>

          <div class="stat-content">
            <span>Total Categories</span>
            <strong>{{ categoriesCount }}</strong>
            <small>
              <i class="bi bi-arrow-up-right"></i>
              From book tags
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="stat-card h-100 d-flex align-items-center">
          <div class="stat-icon views-icon d-flex align-items-center justify-content-center flex-shrink-0">
            <i class="bi bi-eye-fill"></i>
          </div>

          <div class="stat-content">
            <span>Total Views</span>
            <strong>—</strong>
            <small>Views not available</small>
          </div>
        </div>
      </div>
    </section>

    <section class="admin-panel recently-added-panel">
      <div class="panel-title d-flex align-items-center p-3 p-lg-4">
        <div class="panel-icon d-flex align-items-center justify-content-center flex-shrink-0">
          <i class="bi bi-clock-history"></i>
        </div>

        <div>
          <h2>Recently Added</h2>
          <p>Latest books and authors added to your collection.</p>
        </div>
      </div>

      <div v-if="recentlyAdded.length" class="table-responsive admin-table-wrapper">
        <table class="table admin-table recently-added-table align-middle mb-0">
          <thead>
            <tr>
              <th>Item</th>
              <th>Type</th>
              <th>Author / Details</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in recentlyAdded" :key="item.key">
              <td>
                <div class="recent-item d-flex align-items-center gap-3">
                  <img
                    v-if="item.type === 'Book' && item.image"
                    :src="item.image"
                    :alt="item.name"
                    class="recent-item-image recent-book-image"
                  />

                  <img
                    v-else-if="item.type === 'Author' && item.image"
                    :src="item.image"
                    :alt="item.name"
                    class="recent-item-image recent-author-image"
                  />

                  <div
                    v-else
                    class="recent-item-placeholder d-flex align-items-center justify-content-center"
                  >
                    <i :class="item.type === 'Book' ? 'bi bi-book' : 'bi bi-person-fill'"></i>
                  </div>

                  <div class="recent-item-info">
                    <strong>{{ item.name }}</strong>
                    <small v-if="item.type === 'Book'">{{ item.year }}</small>
                    <small v-else>{{ item.nationality || 'Author' }}</small>
                  </div>
                </div>
              </td>

              <td>
                <span
                  class="recent-type-badge"
                  :class="item.type === 'Book' ? 'book-type' : 'author-type'"
                >
                  <i :class="item.type === 'Book' ? 'bi bi-book' : 'bi bi-person-fill'"></i>
                  {{ item.type }}
                </span>
              </td>

              <td class="recent-details-cell">
                {{ item.details }}
              </td>

              <td class="recent-date-cell">
                {{ formatDate(item.createdAt) }}
              </td>

              <td class="recent-date-cell">
                {{ formatDate(item.updatedAt) }}
              </td>

              <td>
                <RouterLink
                  :to="item.route"
                  class="btn recent-view-btn d-inline-flex align-items-center justify-content-center gap-2 text-decoration-none"
                >
                  <i class="bi bi-eye"></i>
                  View
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="admin-state d-flex align-items-center justify-content-center flex-column text-center">
        <i class="bi bi-clock-history"></i>
        <strong>No recent items</strong>
        <span>New books and authors will appear here.</span>
      </div>
    </section>
  </AdminLayout>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

import AdminLayout from "../components/AdminLayout.vue";
import { useBooksStore } from "../stores/booksStore";
import { useAuthorsStore } from "../stores/authorsStore";

const booksStore = useBooksStore();
const authorsStore = useAuthorsStore();

const { books } = storeToRefs(booksStore);
const { authors } = storeToRefs(authorsStore);

const categoriesCount = computed(() => {
  const categories = new Set();

  books.value.forEach((book) => {
    const tags = Array.isArray(book.tags)
      ? book.tags
      : String(book.tags || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);

    tags.forEach((tag) => categories.add(tag.toLowerCase()));
  });

  return categories.size;
});

const authorsById = computed(() => {
  return new Map(
    authors.value.map((author) => [String(author.id), author])
  );
});

const recentlyAdded = computed(() => {
  const recentBooks = books.value.map((book) => {
    const author = authorsById.value.get(String(book.authorId));

    return {
      key: `book-${book.id}`,
      type: "Book",
      name: book.title,
      image: book.coverUrl,
      year: book.year,
      details: author?.name || "Unknown author",
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
      route: `/books/${book.id}`,
    };
  });

  const recentAuthors = authors.value.map((author) => ({
    key: `author-${author.id}`,
    type: "Author",
    name: author.name,
    image: author.avatarUrl,
    nationality: author.nationality,
    details: `${getAuthorBookCount(author.id)} ${getAuthorBookCount(author.id) === 1 ? "book" : "books"}`,
    createdAt: author.createdAt,
    updatedAt: author.updatedAt,
    route: `/authors/${author.id}`,
  }));

  return [...recentBooks, ...recentAuthors]
    .filter((item) => item.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);
});

function getAuthorBookCount(authorId) {
  return books.value.filter(
    (book) => String(book.authorId) === String(authorId)
  ).length;
}

function formatDate(value) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

onMounted(async () => {
  await Promise.all([
    booksStore.fetchList(),
    authorsStore.fetchList(),
  ]);
});
</script>
