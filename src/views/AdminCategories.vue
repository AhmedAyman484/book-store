<template>
  <AdminLayout>
    <section class="admin-page-heading d-flex flex-column flex-lg-row align-items-start align-items-lg-end justify-content-between gap-4">
      <div>
        <span class="section-eyebrow">BOOK STORE ADMIN</span>

        <h1>Categories</h1>

        <p>
          Browse the categories generated from book tags.
        </p>
      </div>
    </section>

    <section class="admin-panel manage-panel">
      <div class="manage-heading d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between">
        <div class="panel-title d-flex align-items-center">
          <div class="panel-icon d-flex align-items-center justify-content-center flex-shrink-0">
            <i class="bi bi-tags-fill"></i>
          </div>

          <div>
            <h2>Book Categories</h2>

            <p>
              {{ filteredCategories.length }}
              categor{{
                filteredCategories.length === 1
                  ? "y"
                  : "ies"
              }}
            </p>
          </div>
        </div>

        <div class="table-search d-flex align-items-center">
          <i class="bi bi-search"></i>

          <input
            v-model.trim="search"
            type="search"
            placeholder="Search categories..."
            aria-label="Search categories"
          />
        </div>
      </div>

      <div
        v-if="booksStore.loading"
        class="admin-state d-flex align-items-center justify-content-center flex-column text-center"
      >
        <div
          class="spinner-border"
          role="status"
        ></div>

        <span>
          Loading categories...
        </span>
      </div>

      <div
        v-else-if="booksStore.error"
        class="admin-state admin-state-error d-flex align-items-center justify-content-center flex-column text-center"
      >
        <i class="bi bi-exclamation-circle"></i>

        <span>
          {{ booksStore.error }}
        </span>

        <button
          type="button"
          class="btn admin-secondary-btn"
          @click="loadBooks"
        >
          Retry
        </button>
      </div>

      <div
        v-else-if="!filteredCategories.length"
        class="admin-state d-flex align-items-center justify-content-center flex-column text-center"
      >
        <i class="bi bi-tags"></i>

        <strong>
          No categories found
        </strong>
      </div>

      <div
        v-else
        class="category-grid-admin"
      >
        <article
          v-for="category in filteredCategories"
          :key="category.name"
          class="category-admin-card d-flex align-items-center"
        >
          <div class="category-admin-icon flex-shrink-0 d-flex align-items-center justify-content-center fs-5">
            <i class="bi bi-tag-fill"></i>
          </div>

          <div>
            <h3>
              {{ category.name }}
            </h3>

            <p>
              {{ category.count }}
              book{{
                category.count === 1
                  ? ""
                  : "s"
              }}
            </p>
          </div>
        </article>
      </div>
    </section>
  </AdminLayout>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
} from "vue";

import { storeToRefs } from "pinia";

import AdminLayout from "../components/AdminLayout.vue";

import { useBooksStore } from "../stores/booksStore";

import { normalizeTags } from "../utils/validation";

const booksStore = useBooksStore();

const { books } = storeToRefs(booksStore);

const search = ref("");

const categories = computed(() => {
  const counts = new Map();

  books.value.forEach((book) => {
    normalizeTags(book.tags).forEach((tag) => {
      const name = tag.trim();
      const key = name.toLowerCase();
      const current = counts.get(key);

      counts.set(key, {
        name: current?.name || name,
        count: (current?.count || 0) + 1,
      });
    });
  });

  return [...counts.values()].sort(
    (a, b) =>
      b.count - a.count ||
      a.name.localeCompare(b.name)
  );
});

const filteredCategories = computed(() =>
  categories.value.filter((category) =>
    category.name
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
);

async function loadBooks() {
  await booksStore.fetchList();
}

onMounted(loadBooks);
</script>