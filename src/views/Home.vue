<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-lg-7">

            <div class="hero-content">

              <div class="hero-eyebrow fw-medium">
                BOOKS
                <span>•</span>
                IDEAS
                <span>•</span>
                A BETTER YOU
              </div>

              <h1 class="hero-title fw-bold m-0">
                Discover Your Next
                <span>Great Read</span>
              </h1>

              <p class="hero-description">
                Explore a collection of popular books, discover new authors,
                and find stories worth reading.
              </p>

              <div class="hero-buttons d-flex flex-wrap gap-3 mt-3">

                <RouterLink to="/books" class="btn btn-primary-custom d-inline-flex align-items-center gap-2 fw-medium rounded-2">
                  Explore Books
                  <i class="bi bi-arrow-right"></i>
                </RouterLink>

                <RouterLink to="/authors" class="btn btn-outline-custom d-inline-flex align-items-center fw-medium rounded-2">
                  Browse Authors
                </RouterLink>

              </div>

              <div class="hero-quote">
                <p>“A book is a dream that you hold in your hands.”</p>
                <span>— Neil Gaiman</span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>

    <FeaturedBooks />
    <StatsSection />
    <Stats />
  </div>
</template>

<script setup>
import { onMounted } from "vue";

import FeaturedBooks from "../components/FeaturedBooks.vue";
import StatsSection from "../components/StatsSection.vue";
import Stats from "../components/Stats.vue";
import { useBooksStore } from "../stores/booksStore";
import { useAuthorsStore } from "../stores/authorsStore";

const booksStore = useBooksStore();
const authorsStore = useAuthorsStore();

onMounted(async () => {
  const requests = [];

  if (!booksStore.books.length) requests.push(booksStore.fetchList());
  if (!authorsStore.authors.length) requests.push(authorsStore.fetchList());

  await Promise.all(requests);
});
</script>