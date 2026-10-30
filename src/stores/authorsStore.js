
import { defineStore } from "pinia";
import { api } from "../services/api";

export const useAuthorsStore = defineStore("authors", {
  state: () => ({
    authors: [],
    loading: false,
    error: null,
    lastFetchedAt: null,
  }),

  actions: {
    async fetchList() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get("/authors.json");

        this.authors = Array.isArray(response.data)
          ? response.data
          : response.data.authors || [];

        this.lastFetchedAt = new Date().toISOString();

        return this.authors;
      } catch (error) {
        console.error(error);
        this.error = "Failed to load authors.";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchById(id) {
      try {
        if (!this.authors.length) {
          await this.fetchList();
        }

        const author = this.authors.find(
          (item) => String(item.id) === String(id)
        );

        if (!author) {
          throw new Error("Author not found");
        }

        return author;
      } catch (error) {
        this.error = "Failed to load author.";
        throw error;
      }
    },

    async create() {
      throw new Error("Adding authors is disabled in demo mode.");
    },

    async update() {
      throw new Error("Editing authors is disabled in demo mode.");
    },

    async remove() {
      throw new Error("Deleting authors is disabled in demo mode.");
    },

    async addAuthor(author) {
      return this.create(author);
    },

    async updateAuthor(id, author) {
      return this.update(id, author);
    },

    async deleteAuthor(id) {
      return this.remove(id);
    },

    async fetchAuthors() {
      return this.fetchList();
    },
  },
});
