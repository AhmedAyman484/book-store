<template>
  <AdminLayout>
    <section class="admin-page-heading d-flex flex-column flex-lg-row align-items-start align-items-lg-end justify-content-between gap-4">
      <div>
        <span class="section-eyebrow">BOOK STORE ADMIN</span>
        <h1>Books Management</h1>
        <p>Create, edit, review and delete books.</p>
      </div>

      <RouterLink
        to="/admin/books/new"
        class="admin-primary-btn text-decoration-none"
      >
        <i class="bi bi-plus-lg"></i>
        Add Book
      </RouterLink>
    </section>

    <section
      v-if="isFormRoute"
      class="admin-panel admin-form-panel"
    >
      <div class="panel-title mb-4 d-flex align-items-center">
        <div class="panel-icon d-flex align-items-center justify-content-center flex-shrink-0">
          <i class="bi bi-book-half"></i>
        </div>

        <div>
          <h2>
            {{ isEdit ? "Edit Book" : "Add New Book" }}
          </h2>

          <p>
            {{
              isEdit
                ? "Update the selected book."
                : "Add a new book to your collection."
            }}
          </p>
        </div>
      </div>

      <form
        novalidate
        @submit.prevent="saveBook"
      >
        <div class="row g-3">
          <div class="col-12 col-lg-6">
            <label for="book-title">
              Title <b>*</b>
            </label>

            <input
              id="book-title"
              v-model.trim="form.title"
              class="form-control admin-input"
              :aria-invalid="Boolean(errors.title)"
              :aria-describedby="errors.title ? 'book-title-error' : undefined"
              type="text"
            />

            <small
              v-if="errors.title"
              id="book-title-error"
              class="admin-field-error d-block"
            >
              {{ errors.title }}
            </small>
          </div>

          <div class="col-12 col-lg-6">
            <label for="book-author">
              Author <b>*</b>
            </label>

            <select
              id="book-author"
              v-model="form.authorId"
              class="form-select admin-input"
              :aria-invalid="Boolean(errors.authorId)"
              :aria-describedby="errors.authorId ? 'book-author-error' : undefined"
            >
              <option value="">
                Select author
              </option>

              <option
                v-for="author in authors"
                :key="author.id"
                :value="String(author.id)"
              >
                {{ author.name }}
              </option>
            </select>

            <small
              v-if="errors.authorId"
              id="book-author-error"
              class="admin-field-error d-block"
            >
              {{ errors.authorId }}
            </small>
          </div>

          <div class="col-12 col-lg-6">
            <label for="book-year">
              Year <b>*</b>
            </label>

            <input
              id="book-year"
              v-model="form.year"
              class="form-control admin-input"
              :aria-invalid="Boolean(errors.year)"
              :aria-describedby="errors.year ? 'book-year-error' : undefined"
              type="number"
              min="1800"
              :max="currentYear"
            />

            <small
              v-if="errors.year"
              id="book-year-error"
              class="admin-field-error d-block"
            >
              {{ errors.year }}
            </small>
          </div>

          <div class="col-12 col-lg-6">
            <label for="book-cover">
              Cover URL
            </label>

            <input
              id="book-cover"
              v-model.trim="form.coverUrl"
              class="form-control admin-input"
              :aria-invalid="Boolean(errors.coverUrl)"
              :aria-describedby="errors.coverUrl ? 'book-cover-error' : undefined"
              type="url"
              placeholder="https://example.com/cover.jpg"
            />

            <small
              v-if="errors.coverUrl"
              id="book-cover-error"
              class="admin-field-error d-block"
            >
              {{ errors.coverUrl }}
            </small>
          </div>

          <div class="col-12">
            <label for="book-tags">
              Tags
            </label>

            <input
              id="book-tags"
              v-model="form.tags"
              class="form-control admin-input"
              :aria-invalid="Boolean(errors.tags)"
              :aria-describedby="errors.tags ? 'book-tags-error' : undefined"
              type="text"
              placeholder="fantasy, classic, drama"
            />

            <small class="input-hint">
              Use commas. Maximum 8 tags, 2–20 characters each.
            </small>

            <small
              v-if="errors.tags"
              id="book-tags-error"
              class="admin-field-error d-block"
            >
              {{ errors.tags }}
            </small>
          </div>

          <div class="col-12">
            <label for="book-description">
              Description
            </label>

            <textarea
              id="book-description"
              v-model="form.description"
              class="form-control admin-input description-input"
              :aria-invalid="Boolean(errors.description)"
              :aria-describedby="errors.description ? 'book-description-error' : undefined"
              rows="5"
            ></textarea>

            <small
              v-if="errors.description"
              id="book-description-error"
              class="admin-field-error d-block"
            >
              {{ errors.description }}
            </small>
          </div>
        </div>

        <div class="d-flex justify-content-end gap-2 mt-4">
          <RouterLink
            to="/admin/books"
            class="btn admin-secondary-btn text-decoration-none"
          >
            Cancel
          </RouterLink>

          <button
            type="submit"
            class="btn admin-primary-btn"
            :disabled="saving || !isFormValid"
          >
            <span
              v-if="saving"
              class="spinner-border spinner-border-sm"
            ></span>

            <i
              v-else
              :class="
                isEdit
                  ? 'bi bi-check-lg'
                  : 'bi bi-plus-lg'
              "
            ></i>

            {{
              saving
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Add Book"
            }}
          </button>
        </div>
      </form>
    </section>

    <section
      v-else
      class="admin-panel manage-panel"
    >
      <div class="manage-heading d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between">
        <div class="panel-title d-flex align-items-center">
          <div class="panel-icon d-flex align-items-center justify-content-center flex-shrink-0">
            <i class="bi bi-book-half"></i>
          </div>

          <div>
            <h2>Manage Books</h2>

            <p>
              {{ filteredBooks.length }}
              book{{ filteredBooks.length === 1 ? "" : "s" }}
              found
            </p>
          </div>
        </div>

        <div class="manage-tools d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center">
          <div class="table-search d-flex align-items-center">
            <i class="bi bi-search"></i>

            <input
              v-model.trim="search"
              type="search"
              placeholder="Search books..."
              aria-label="Search books"
            />
          </div>

          <select
            v-model="selectedAuthor"
            class="form-select table-filter"
            aria-label="Filter by author"
          >
            <option value="">
              All Authors
            </option>

            <option
              v-for="author in authors"
              :key="author.id"
              :value="String(author.id)"
            >
              {{ author.name }}
            </option>
          </select>
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

        <span>Loading books...</span>
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
          @click="loadData"
        >
          Retry
        </button>
      </div>

      <div
        v-else-if="!filteredBooks.length"
        class="admin-state d-flex align-items-center justify-content-center flex-column text-center"
      >
        <i class="bi bi-book"></i>

        <strong>No books found</strong>

        <span>
          Try changing your search or filter.
        </span>
      </div>

      <div
        v-else
        class="table-responsive admin-table-wrapper overflow-auto"
      >
        <table
          class="table admin-table align-middle"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(book, index) in filteredBooks"
              :key="book.id"
            >
              <td>
                {{ index + 1 }}
              </td>

              <td>
                <img
                  v-if="book.coverUrl"
                  :src="book.coverUrl"
                  :alt="book.title"
                  class="book-cover text-center"
                />

                <div
                  v-else
                  class="book-cover-placeholder d-flex align-items-center justify-content-center fs-5"
                >
                  <i class="bi bi-book"></i>
                </div>
              </td>

              <td class="book-title-cell">
                {{ book.title }}
              </td>

              <td>
                {{ getAuthorName(book.authorId) }}
              </td>

              <td>
                {{ book.year }}
              </td>

              <td>
                <span
                  v-for="tag in normalizeTags(book.tags)"
                  :key="tag"
                  class="book-tag d-inline-flex align-items-center"
                >
                  {{ tag }}
                </span>
              </td>

              <td>
                <div class="action-buttons d-flex align-items-center flex-nowrap">
                  <RouterLink
                    :to="`/books/${book.id}`"
                    class="btn action-btn view-btn d-inline-flex align-items-center justify-content-center"
                  >
                    <i class="bi bi-eye"></i>
                    <span class="d-none d-sm-inline">View</span>
                  </RouterLink>

                  <RouterLink
                    :to="`/admin/books/${book.id}/edit`"
                    class="btn action-btn edit-btn d-inline-flex align-items-center justify-content-center"
                  >
                    <i class="bi bi-pencil"></i>
                    <span class="d-none d-sm-inline">Edit</span>
                  </RouterLink>

                  <button
                    type="button"
                    class="btn action-btn delete-btn d-inline-flex align-items-center justify-content-center"
                    @click="deleteBookItem = book"
                  >
                    <i class="bi bi-trash3"></i>
                    <span class="d-none d-sm-inline">Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div
      v-if="deleteBookItem"
      class="delete-modal-overlay position-fixed d-flex align-items-center justify-content-center"
      @click.self="deleteBookItem = null"
    >
      <div class="delete-modal">
        <div class="delete-modal-icon d-flex align-items-center justify-content-center">
          <i class="bi bi-trash3"></i>
        </div>

        <div class="delete-modal-content">
          <h3>Delete Book?</h3>

          <p>
            Are you sure you want to delete
            <strong>{{ deleteBookItem.title }}</strong>?
            This action cannot be undone.
          </p>
        </div>

        <div class="delete-modal-actions d-flex justify-content-end">
          <button
            type="button"
            class="delete-cancel-btn"
            @click="deleteBookItem = null"
          >
            Cancel
          </button>

          <button
            type="button"
            class="delete-confirm-btn"
            :disabled="deleting"
            @click="confirmDelete"
          >
            <span
              v-if="deleting"
              class="spinner-border spinner-border-sm"
            ></span>

            <i
              v-else
              class="bi bi-trash3"
            ></i>

            {{ deleting ? "Deleting..." : "Delete" }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import {
  computed,
  nextTick,
  reactive,
  ref,
  watch,
} from "vue";

import {
  useRoute,
  useRouter,
} from "vue-router";

import { storeToRefs } from "pinia";

import AdminLayout from "../components/AdminLayout.vue";

import { useBooksStore } from "../stores/booksStore";
import { useAuthorsStore } from "../stores/authorsStore";

import {
  normalizeTags,
  validateBook,
} from "../utils/validation";

import { useToast } from "../composables/useToast";

const route = useRoute();
const router = useRouter();

const booksStore = useBooksStore();
const authorsStore = useAuthorsStore();

const { books } = storeToRefs(booksStore);
const { authors } = storeToRefs(authorsStore);

const { showToast } = useToast();

const search = ref("");
const selectedAuthor = ref("");
const saving = ref(false);
const deleting = ref(false);

const deleteBookItem = ref(null);
const errors = ref({});

const currentYear = new Date().getFullYear();

const form = reactive({
  title: "",
  authorId: "",
  year: "",
  tags: "",
  coverUrl: "",
  description: "",
});

const isFormRoute = computed(
  () => route.path !== "/admin/books"
);

const isEdit = computed(
  () => Boolean(route.params.id)
);

const isFormValid = computed(
  () =>
    Object.keys(
      validateBook(
        form,
        books.value,
        route.params.id || null
      )
    ).length === 0
);

const filteredBooks = computed(() => {
  const query = search.value.toLowerCase();

  return books.value.filter((book) => {
    const authorName = getAuthorName(
      book.authorId
    ).toLowerCase();

    const matchesSearch =
      !query ||
      `${book.title} ${authorName} ${
        book.year
      } ${normalizeTags(book.tags).join(" ")}`
        .toLowerCase()
        .includes(query);

    return (
      matchesSearch &&
      (
        !selectedAuthor.value ||
        String(book.authorId) ===
          String(selectedAuthor.value)
      )
    );
  });
});

async function focusFirstInvalidField() {
  await nextTick();
  document.querySelector('.admin-form-panel [aria-invalid="true"]')?.focus();
}

function getAuthorName(authorId) {
  return (
    authors.value.find(
      (author) =>
        String(author.id) ===
        String(authorId)
    )?.name || "Unknown Author"
  );
}

async function loadData() {
  await Promise.all([
    booksStore.fetchList(),
    authorsStore.fetchList(),
  ]);
}

function resetForm() {
  Object.assign(form, {
    title: "",
    authorId: "",
    year: "",
    tags: "",
    coverUrl: "",
    description: "",
  });

  errors.value = {};
}

async function prepareForm() {
  resetForm();

  if (!isEdit.value) {
    return;
  }

  const book = books.value.find(
    (item) =>
      String(item.id) ===
      String(route.params.id)
  );

  if (!book) {
    showToast(
      "Book not found.",
      "error"
    );

    router.replace("/admin/books");

    return;
  }

  Object.assign(form, {
    title: book.title || "",
    authorId: String(book.authorId || ""),
    year: book.year || "",
    tags: normalizeTags(book.tags).join(", "),
    coverUrl: book.coverUrl || "",
    description: book.description || "",
  });
}

async function saveBook() {
  errors.value = validateBook(
    form,
    books.value,
    route.params.id || null
  );

  if (Object.keys(errors.value).length) {
    await focusFirstInvalidField();
    return;
  }

  try {
    await authorsStore.fetchById(
      form.authorId
    );
  } catch (error) {
    errors.value = {
      ...errors.value,
      authorId:
        "Selected author does not exist.",
    };

    await focusFirstInvalidField();
    return;
  }

  saving.value = true;

  try {
    const data = {
      title: form.title.trim(),
      authorId: Number(form.authorId),
      year: Number(form.year),
      tags: normalizeTags(form.tags),
      coverUrl: form.coverUrl.trim(),
      description: form.description.trim(),
    };

    if (isEdit.value) {
      await booksStore.update(
        route.params.id,
        data
      );

      showToast(
        "Book updated successfully."
      );
    } else {
      await booksStore.create(data);

      showToast(
        "Book created successfully."
      );
    }

    await booksStore.fetchList();

    router.push("/admin/books");
  } catch (error) {
    console.error(error);

    showToast(
      "Could not save the book.",
      "error"
    );
  } finally {
    saving.value = false;
  }
}

async function confirmDelete() {
  if (!deleteBookItem.value) {
    return;
  }

  deleting.value = true;

  try {
    await booksStore.remove(
      deleteBookItem.value.id
    );

    showToast(
      "Book deleted successfully."
    );

    deleteBookItem.value = null;
  } catch (error) {
    console.error(error);

    showToast(
      "Could not delete the book.",
      "error"
    );
  } finally {
    deleting.value = false;
  }
}

watch(
  () => route.fullPath,
  async () => {
    if (
      !booksStore.loading &&
      !authorsStore.loading
    ) {
      await prepareForm();
    }
  }
);

async function initialize() {
  try {
    await loadData();
    await prepareForm();
  } catch (error) {
    console.error(error);
  }
}

initialize();
</script>