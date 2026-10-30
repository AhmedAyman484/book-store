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
        const response = await api.get("/authors");

        this.authors = response.data;
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
        return (await api.get(`/authors/${id}`)).data;
      } catch (error) {
        this.error = "Failed to load author.";

        throw error;
      }
    },

    async create(author) {
      const now = new Date().toISOString();
      const payload = {
        ...author,
        createdAt: now,
        updatedAt: now,
      };

      const response = await api.post("/authors", payload);

      this.authors.push(response.data);

      return response.data;
    },

    async update(id, author) {
      const current = this.authors.find(
        (item) => String(item.id) === String(id)
      );
      const payload = {
        ...author,
        createdAt: current?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await api.put(`/authors/${id}`, payload);

      const index = this.authors.findIndex(
        (item) => String(item.id) === String(id)
      );

      if (index !== -1) {
        this.authors[index] = response.data;
      }

      return response.data;
    },

    async remove(id) {
      await api.delete(`/authors/${id}`);

      this.authors = this.authors.filter(
        (item) => String(item.id) !== String(id)
      );
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