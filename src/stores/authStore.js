import { defineStore } from "pinia";
import { api } from "../services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    lastFetchedAt: null,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.user),

    isAdmin: (state) => state.user?.role === "admin",
  },

  actions: {
    initialize() {
      const storedUser = localStorage.getItem("currentUser");

      this.user = storedUser
        ? JSON.parse(storedUser)
        : null;
    },

    async login(email, password, rememberMe = false) {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get("/users", {
          params: {
            email,
            password,
          },
        });

        if (!response.data.length) {
          this.error = "Invalid email or password.";
          return false;
        }

        this.user = response.data[0];
        this.lastFetchedAt = new Date().toISOString();

        localStorage.setItem(
          "currentUser",
          JSON.stringify(this.user)
        );

        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }

        return true;
      } catch (error) {
        console.error(error);

        this.error = "Unable to login. Please try again.";

        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;

      localStorage.removeItem("currentUser");
      localStorage.removeItem("rememberMe");
    },
  },
});