<template>
  <div class="login-page">
    <div class="admin-note position-absolute">
      <div class="admin-note-title d-flex align-items-center fw-semibold gap-2">
        <i class="bi bi-info-circle"></i>
        Admin Login
      </div>

      <div class="admin-note-item d-flex flex-column mt-2">
        <span>Email</span>
        <strong>admin@bookstore.com</strong>
      </div>

      <div class="admin-note-item d-flex flex-column mt-2">
        <span>Password</span>
        <strong>admin123</strong>
      </div>
    </div>

    <div class="container py-5">
      <div
        class="login-card row g-0 mx-auto overflow-hidden"
      >
        <div
          class="login-visual col-lg-5 d-none d-lg-flex overflow-hidden overflow-hidden position-relative overflow-hidden"
        >
          <div class="login-visual-content position-relative">
            <div class="login-line"></div>
          </div>

          <img
            src="../assets/imgs/loginbg.png"
            alt=""
            class="login-bg position-absolute w-100 h-100"
          />
        </div>

        <div
          class="login-form-area col-12 col-lg-7 position-relative d-flex align-items-center justify-content-center"
        >
          <div class="login-form-container w-100">
            <div class="text-center mb-4">
              <h2 class="login-title fw-bold">
                Welcome Back
              </h2>

              <p class="login-subtitle m-0 fs-6">
                Sign in to your account
              </p>
            </div>

            <div
              v-if="auth.error"
              class="alert alert-danger py-2"
              role="alert"
            >
              {{ auth.error }}
            </div>

            <form @submit.prevent="login">
              <div class="mb-4">
                <label
                  for="email"
                  class="form-label"
                >
                  Email Address
                </label>

                <div
                  class="input-group login-input-group"
                >
                  <span class="input-group-text justify-content-center">
                    <i class="bi bi-envelope"></i>
                  </span>

                  <input
                    id="email"
                    v-model.trim="email"
                    type="email"
                    class="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div class="mb-3">
                <label
                  for="password"
                  class="form-label"
                >
                  Password
                </label>

                <div
                  class="input-group login-input-group"
                >
                  <span class="input-group-text justify-content-center">
                    <i class="bi bi-lock"></i>
                  </span>

                  <input
                    id="password"
                    v-model="password"
                    :type="
                      showPassword
                        ? 'text'
                        : 'password'
                    "
                    class="form-control"
                    placeholder="Enter your password"
                    required
                  />

                  <button
                    type="button"
                    class="btn password-btn"
                    @click="
                      showPassword = !showPassword
                    "
                  >
                    <i
                      :class="
                        showPassword
                          ? 'bi bi-eye'
                          : 'bi bi-eye-slash'
                      "
                    ></i>
                  </button>
                </div>
              </div>

              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <div class="form-check">
                  <input
                    id="remember"
                    v-model="rememberMe"
                    class="form-check-input"
                    type="checkbox"
                  />

                  <label
                    for="remember"
                    class="form-check-label"
                  >
                    Remember me
                  </label>
                </div>

                <span class="forgot-link">
                  Forgot password?
                </span>
              </div>

              <button
                type="submit"
                class="btn login-submit w-100 fw-medium rounded-3 fs-6"
                :disabled="auth.loading"
              >
                <span v-if="auth.loading">
                  Signing In...
                </span>

                <span v-else>
                  Sign In
                  <i class="bi bi-arrow-right ms-2"></i>
                </span>
              </button>
            </form>

            <div class="login-divider my-4 d-flex align-items-center">
              <span>
                Or continue with
              </span>
            </div>

            <div
              class="d-flex justify-content-center gap-4"
            >
              <button
                type="button"
                class="social-login-btn d-flex align-items-center justify-content-center"
              >
                <i class="bi bi-google"></i>
              </button>

              <button
                type="button"
                class="social-login-btn d-flex align-items-center justify-content-center"
              >
                <i class="bi bi-facebook"></i>
              </button>

              <button
                type="button"
                class="social-login-btn d-flex align-items-center justify-content-center"
              >
                <i class="bi bi-github"></i>
              </button>
            </div>

            <div class="login-signup text-center">
              <span>
                Don't have an account?
              </span>

              <span class="login-signup-link">
                Sign Up
                <i class="bi bi-arrow-right ms-1"></i>
              </span>
            </div>
          </div>

          <img
            src="../assets/imgs/footerbg.png"
            alt=""
            class="login-leaf position-absolute"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import {
  useRoute,
  useRouter,
} from "vue-router";

import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const route = useRoute();

const auth = useAuthStore();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

async function login() {
  const success = await auth.login(
    email.value,
    password.value,
    rememberMe.value
  );

  if (!success) {
    return;
  }

  const redirect =
    typeof route.query.redirect === "string"
      ? route.query.redirect
      : "/admin";

  await router.push(redirect);
}
</script>