<template>
  <Navbar v-if="!isAdminPage" />

  <main>
    <RouterView />
  </main>

  <Footer v-if="!isAdminPage" />

  <ToastContainer />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useAuthStore } from "./stores/authStore";

import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import ToastContainer from "./components/ToastContainer.vue";

const route = useRoute();
const authStore = useAuthStore();

authStore.initialize();

const isAdminPage = computed(
  () => route.meta.admin === true
);
</script>