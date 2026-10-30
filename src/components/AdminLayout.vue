<template>
  <div class="admin-page d-flex">
    <aside class="admin-sidebar position-fixed d-flex flex-column">
      <div class="admin-brand d-flex align-items-center">
        <div class="brand-icon d-flex align-items-center justify-content-center flex-shrink-0">
          <img src="../assets/imgs/adminlogo.png" alt="Book Store" />
        </div>

        <div class="d-none d-md-block">
          <h2>Book Store</h2>
          <span>Admin Panel</span>
        </div>
      </div>

      <nav class="admin-nav d-flex flex-column">
        <RouterLink to="/admin" class="admin-nav-link d-flex align-items-center">
          <i class="bi bi-house-fill"></i>
          <span class="d-none d-md-inline">Dashboard</span>
        </RouterLink>

        <RouterLink to="/admin/books" class="admin-nav-link d-flex align-items-center">
          <i class="bi bi-book"></i>
          <span class="d-none d-md-inline">Books</span>
        </RouterLink>

        <RouterLink to="/admin/authors" class="admin-nav-link d-flex align-items-center">
          <i class="bi bi-person"></i>
          <span class="d-none d-md-inline">Authors</span>
        </RouterLink>

        <RouterLink to="/admin/categories" class="admin-nav-link d-flex align-items-center">
          <i class="bi bi-bar-chart-line"></i>
          <span class="d-none d-md-inline">Categories</span>
        </RouterLink>

        <RouterLink to="/" class="admin-nav-link back-link d-flex align-items-center">
          <i class="bi bi-box-arrow-left"></i>
          <span class="d-none d-md-inline">Back to Store</span>
        </RouterLink>
      </nav>

      <div class="sidebar-decoration d-none d-md-block"></div>

      <div class="sidebar-footer d-none d-md-block">
        <p>
          Good Books<br />
          Brighter Days
        </p>
        <small>v1.0</small>
      </div>
    </aside>

    <main class="admin-main">
      <header class="admin-header d-flex align-items-center justify-content-end">
        <div class="admin-header-spacer"></div>

        <div class="admin-user-wrapper">
          <button type="button" class="admin-user d-flex align-items-center" @click="showMenu = !showMenu">
            <div class="user-avatar d-flex align-items-center justify-content-center flex-shrink-0">A</div>
            <span>{{ auth.user?.name || "Admin" }}</span>
            <i class="bi bi-chevron-down admin-chevron d-none d-sm-inline d-none d-sm-inline d-none d-sm-inline d-none d-sm-inline d-none d-sm-inline" :class="{ rotated: showMenu }"></i>
          </button>

          <div v-if="showMenu" class="admin-dropdown position-absolute">
            <button type="button" class="admin-dropdown-item d-flex align-items-center text-start" @click="logout">
              <i class="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div class="admin-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const auth = useAuthStore();
const showMenu = ref(false);

function logout() {
  auth.logout();
  showMenu.value = false;
  router.push("/login");
}
</script>
