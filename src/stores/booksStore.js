import { defineStore } from "pinia";
import { api } from "../services/api";

export const useBooksStore = defineStore("books", {
  state: () => ({
    books: [],
    loading: false,
    error: null,
    lastFetchedAt: null,
  }),

  actions: {
    async fetchList() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get("/books");

        this.books = response.data;
        this.lastFetchedAt = new Date().toISOString();

        return this.books;
      } catch (error) {
        console.error(error);

        this.error = "Failed to load books.";

        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchById(id) {
      try {
        return (await api.get(`/books/${id}`)).data;
      } catch (error) {
        this.error = "Failed to load book.";

        throw error;
      }
    },

    async create(book) {
      const now = new Date().toISOString();
      const payload = {
        ...book,
        createdAt: now,
        updatedAt: now,
      };

      const response = await api.post("/books", payload);

      this.books.push(response.data);

      return response.data;
    },

    async update(id, book) {
      const current = this.books.find(
        (item) => String(item.id) === String(id)
      );
      const payload = {
        ...book,
        createdAt: current?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await api.put(`/books/${id}`, payload);

      const index = this.books.findIndex(
        (item) => String(item.id) === String(id)
      );

      if (index !== -1) {
        this.books[index] = response.data;
      }

      return response.data;
    },

    async remove(id) {
      await api.delete(`/books/${id}`);

      this.books = this.books.filter(
        (item) => String(item.id) !== String(id)
      );
    },

    async fetchBooks() {
      return this.fetchList();
    },

    async addBook(book) {
      return this.create(book);
    },

    async updateBook(id, book) {
      return this.update(id, book);
    },

    async deleteBook(id) {
      return this.remove(id);
    },
  },
});