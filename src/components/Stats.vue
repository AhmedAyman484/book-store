<template>
  <section class="newsletter-section">
    <div class="container">

      <div class="newsletter-content row align-items-center g-4 text-center text-lg-start text-center text-lg-start">

        <div class="newsletter-text col-12 col-lg-3">
          <h2>Stay Updated</h2>

          <p>
            Get the latest books, recommendations, and more.
          </p>
        </div>

        <div class="col-12 col-lg-6">
          <form
            class="newsletter-form d-flex flex-column flex-md-row align-items-center gap-1"
            @submit.prevent
          >

            <div class="newsletter-input position-relative flex-grow-1">

              <i class="bi bi-envelope"></i>

              <input
                type="email"
                class="form-control"
                placeholder="Enter your email address..."
              />

            </div>

            <button
              type="submit"
              class="newsletter-btn btn border-0 fw-medium rounded-2"
            >
              Subscribe
            </button>

          </form>
        </div>

        <div class="newsletter-quote col-12 col-lg-3 ps-lg-3">
          <p>
            “Good books<br />
            find good people.”
          </p>

          <span></span>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useBooksStore } from "../stores/booksStore";
import { useAuthorsStore } from "../stores/authorsStore";

const booksStore = useBooksStore();
const authorsStore = useAuthorsStore();

const { books } = storeToRefs(booksStore);
const { authors } = storeToRefs(authorsStore);

const booksCount = computed(() => books.value.length);
const authorsCount = computed(() => authors.value.length);
</script>
