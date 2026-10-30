<template>
    <section class="stats-section">

        <div class="stats-box position-relative overflow-visible">

            <img src="../assets/imgs/flow2.png" alt="" class="stats-leaf stats-leaf-left position-absolute" />

            <img src="../assets/imgs/flow1.png" alt="" class="stats-leaf stats-leaf-right position-absolute" />

            <div class="row g-0">

                <div class="col-12 col-md-4">
                    <div class="stat-item d-flex flex-column align-items-center justify-content-center text-center position-relative">

                        <div class="stat-icon d-flex align-items-center justify-content-center flex-shrink-0">
                            <i class="bi bi-stack"></i>
                        </div>

                        <h3>{{ booksCount }}</h3>

                        <p>Books Available</p>

                        <span>Explore our collection</span>

                    </div>
                </div>

                <div class="col-12 col-md-4">
                    <div class="stat-item d-flex flex-column align-items-center justify-content-center text-center position-relative">

                        <div class="stat-icon d-flex align-items-center justify-content-center flex-shrink-0">
                            <i class="bi bi-feather"></i>
                        </div>

                        <h3>{{ authorsCount }}</h3>

                        <p>Authors</p>

                        <span>Learn from great minds</span>

                    </div>
                </div>

                <div class="col-12 col-md-4">
                    <div class="stat-item d-flex flex-column align-items-center justify-content-center text-center position-relative">

                        <div class="stat-icon popular-icon d-flex align-items-center justify-content-center flex-shrink-0">
                            <i class="bi bi-star-fill"></i>
                        </div>

                        <h3>Popular</h3>

                        <p>Book Collection</p>

                        <span>Readers' favorite picks</span>

                    </div>
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
