<template>
  <AdminLayout>
    <section class="admin-page-heading d-flex flex-column flex-lg-row align-items-start align-items-lg-end justify-content-between gap-4">
      <div>
        <span class="section-eyebrow">BOOK STORE ADMIN</span>
        <h1>Authors Management</h1>
        <p>Create, edit, review and delete authors.</p>
      </div>

      <RouterLink
        to="/admin/authors/new"
        class="admin-primary-btn text-decoration-none"
      >
        <i class="bi bi-plus-lg"></i>
        Add Author
      </RouterLink>
    </section>

    <section
      v-if="isFormRoute"
      class="admin-panel admin-form-panel"
    >
      <div class="panel-title mb-4 d-flex align-items-center">
        <div class="panel-icon d-flex align-items-center justify-content-center flex-shrink-0">
          <i class="bi bi-person-fill"></i>
        </div>

        <div>
          <h2>
            {{ isEdit ? "Edit Author" : "Add New Author" }}
          </h2>

          <p>
            {{
              isEdit
                ? "Update the selected author."
                : "Add a new author to your collection."
            }}
          </p>
        </div>
      </div>

      <form novalidate @submit.prevent="saveAuthor">
        <div class="row g-3">
          <div class="col-12 col-lg-6">
            <label for="author-name">
              Name <b>*</b>
            </label>

            <input
              id="author-name"
              v-model.trim="form.name"
              class="form-control admin-input"
              :aria-invalid="Boolean(errors.name)"
              :aria-describedby="errors.name ? 'author-name-error' : undefined"
              type="text"
            />

            <small
              v-if="errors.name"
              id="author-name-error"
              class="admin-field-error d-block"
            >
              {{ errors.name }}
            </small>
          </div>

          <div class="col-12 col-lg-6">
            <label for="author-avatar">
              Avatar URL
            </label>

            <input
              id="author-avatar"
              v-model.trim="form.avatarUrl"
              class="form-control admin-input"
              :aria-invalid="Boolean(errors.avatarUrl)"
              :aria-describedby="errors.avatarUrl ? 'author-avatar-error' : undefined"
              type="url"
              placeholder="https://example.com/avatar.jpg"
            />

            <small
              v-if="errors.avatarUrl"
              id="author-avatar-error"
              class="admin-field-error d-block"
            >
              {{ errors.avatarUrl }}
            </small>
          </div>

          <div class="col-12">
            <label for="author-bio">
              Biography
            </label>

            <textarea
              id="author-bio"
              v-model="form.bio"
              class="form-control admin-input biography-input"
              :aria-invalid="Boolean(errors.bio)"
              :aria-describedby="errors.bio ? 'author-bio-error' : undefined"
              rows="6"
            ></textarea>

            <small
              v-if="errors.bio"
              id="author-bio-error"
              class="admin-field-error d-block"
            >
              {{ errors.bio }}
            </small>
          </div>
        </div>

        <div class="d-flex justify-content-end gap-2 mt-4">
          <RouterLink
            to="/admin/authors"
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
                  : "Add Author"
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
            <i class="bi bi-person-fill"></i>
          </div>

          <div>
            <h2>Manage Authors</h2>

            <p>
              {{ filteredAuthors.length }}
              author{{ filteredAuthors.length === 1 ? "" : "s" }}
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
              placeholder="Search authors..."
              aria-label="Search authors"
            />
          </div>
        </div>
      </div>

      <div
        v-if="authorsStore.loading"
        class="admin-state d-flex align-items-center justify-content-center flex-column text-center"
      >
        <div
          class="spinner-border"
          role="status"
        ></div>

        <span>Loading authors...</span>
      </div>

      <div
        v-else-if="authorsStore.error"
        class="admin-state admin-state-error d-flex align-items-center justify-content-center flex-column text-center"
      >
        <i class="bi bi-exclamation-circle"></i>

        <span>{{ authorsStore.error }}</span>

        <button
          type="button"
          class="btn admin-secondary-btn"
          @click="loadData"
        >
          Retry
        </button>
      </div>

      <div
        v-else-if="!filteredAuthors.length"
        class="admin-state d-flex align-items-center justify-content-center flex-column text-center"
      >
        <i class="bi bi-person"></i>

        <strong>No authors found</strong>

        <span>Try changing your search.</span>
      </div>

      <div
        v-else
        class="table-responsive admin-table-wrapper overflow-auto"
      >
        <table
          class="table admin-table authors-table align-middle"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Author</th>
              <th>Biography</th>
              <th>Books</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(author, index) in filteredAuthors"
              :key="author.id"
            >
              <td>
                {{ index + 1 }}
              </td>

              <td>
                <img
                  v-if="author.avatarUrl"
                  :src="author.avatarUrl"
                  :alt="author.name"
                  class="author-avatar"
                />

                <div
                  v-else
                  class="author-avatar author-letter d-flex align-items-center justify-content-center"
                >
                  {{ author.name?.charAt(0) }}
                </div>
              </td>

              <td class="author-name-cell">
                {{ author.name }}
              </td>

              <td class="biography-cell">
                {{ author.bio || "—" }}
              </td>

              <td>
                {{ getBooksCount(author.id) }}
              </td>

              <td>
                <div class="action-buttons d-flex align-items-center flex-nowrap">
                  <RouterLink
                    :to="`/authors/${author.id}`"
                    class="btn action-btn view-btn d-inline-flex align-items-center justify-content-center"
                  >
                    <i class="bi bi-eye"></i>
                    <span class="d-none d-sm-inline">View</span>
                  </RouterLink>

                  <RouterLink
                    :to="`/admin/authors/${author.id}/edit`"
                    class="btn action-btn edit-btn d-inline-flex align-items-center justify-content-center"
                  >
                    <i class="bi bi-pencil"></i>
                    <span class="d-none d-sm-inline">Edit</span>
                  </RouterLink>

                  <button
                    type="button"
                    class="btn action-btn delete-btn d-inline-flex align-items-center justify-content-center"
                    @click="requestDelete(author)"
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
      v-if="deleteAuthorItem"
      class="delete-modal-overlay position-fixed d-flex align-items-center justify-content-center"
      @click.self="deleteAuthorItem = null"
    >
      <div class="delete-modal">
        <div class="delete-modal-icon d-flex align-items-center justify-content-center">
          <i class="bi bi-trash3"></i>
        </div>

        <div class="delete-modal-content">
          <h3>Delete Author?</h3>

          <p>
            Are you sure you want to delete
            <strong>{{ deleteAuthorItem.name }}</strong>?
            This action cannot be undone.
          </p>
        </div>

        <div class="delete-modal-actions d-flex justify-content-end">
          <button
            type="button"
            class="delete-cancel-btn"
            @click="deleteAuthorItem = null"
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

import { useAuthorsStore } from "../stores/authorsStore";
import { useBooksStore } from "../stores/booksStore";

import { validateAuthor } from "../utils/validation";

import { useToast } from "../composables/useToast";

const route = useRoute();
const router = useRouter();

const authorsStore = useAuthorsStore();
const booksStore = useBooksStore();

const { authors } = storeToRefs(authorsStore);
const { books } = storeToRefs(booksStore);

const { showToast } = useToast();

const search = ref("");
const saving = ref(false);
const deleting = ref(false);

const deleteAuthorItem = ref(null);
const errors = ref({});

const form = reactive({
  name: "",
  bio: "",
  avatarUrl: "",
});

const isFormRoute = computed(
  () => route.path !== "/admin/authors"
);

const isEdit = computed(
  () => Boolean(route.params.id)
);

const isFormValid = computed(
  () => Object.keys(validateAuthor(form)).length === 0
);

const filteredAuthors = computed(() => {
  const query = search.value.toLowerCase();

  return authors.value.filter((author) =>
    `${author.name} ${author.bio || ""}`
      .toLowerCase()
      .includes(query)
  );
});

async function focusFirstInvalidField() {
  await nextTick();
  document.querySelector('.admin-form-panel [aria-invalid="true"]')?.focus();
}

function getBooksCount(authorId) {
  return books.value.filter(
    (book) =>
      String(book.authorId) === String(authorId)
  ).length;
}

async function loadData() {
  await Promise.all([
    authorsStore.fetchList(),
    booksStore.fetchList(),
  ]);
}

function resetForm() {
  Object.assign(form, {
    name: "",
    bio: "",
    avatarUrl: "",
  });

  errors.value = {};
}

async function prepareForm() {
  resetForm();

  if (!isEdit.value) {
    return;
  }

  const author = authors.value.find(
    (item) =>
      String(item.id) === String(route.params.id)
  );

  if (!author) {
    showToast(
      "Author not found.",
      "error"
    );

    router.replace("/admin/authors");

    return;
  }

  Object.assign(form, {
    name: author.name || "",
    bio: author.bio || "",
    avatarUrl: author.avatarUrl || "",
  });
}

async function saveAuthor() {
  errors.value = validateAuthor(form);

  if (Object.keys(errors.value).length) {
    await focusFirstInvalidField();
    return;
  }

  saving.value = true;

  try {
    const data = {
      name: form.name.trim(),
      bio: form.bio.trim(),
      avatarUrl: form.avatarUrl.trim(),
    };

    if (isEdit.value) {
      await authorsStore.update(
        route.params.id,
        data
      );

      showToast(
        "Author updated successfully."
      );
    } else {
      await authorsStore.create(data);

      showToast(
        "Author created successfully."
      );
    }

    await authorsStore.fetchList();

    router.push("/admin/authors");
  } catch (error) {
    console.error(error);

    showToast(
      "Could not save the author.",
      "error"
    );
  } finally {
    saving.value = false;
  }
}

function requestDelete(author) {
  const count = getBooksCount(author.id);

  if (count) {
    showToast(
      `Cannot delete ${author.name} while ${
        count === 1 ? "1 book is" : `${count} books are`
      } linked to this author.`,
      "error",
      4500
    );

    return;
  }

  deleteAuthorItem.value = author;
}

async function confirmDelete() {
  if (!deleteAuthorItem.value) {
    return;
  }

  deleting.value = true;

  try {
    await authorsStore.remove(
      deleteAuthorItem.value.id
    );

    showToast(
      "Author deleted successfully."
    );

    deleteAuthorItem.value = null;
  } catch (error) {
    console.error(error);

    showToast(
      "Could not delete the author.",
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
      !authorsStore.loading &&
      !booksStore.loading
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