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
        const response = await api.get("/books.json");

        this.books = Array.isArray(response.data)
          ? response.data
          : response.data.books || [];
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
        if (!this.books.length) {
          await this.fetchList();
        }

        const book = this.books.find(
          (item) => String(item.id) === String(id)
        );

        if (!book) {
          throw new Error("Book not found");
        }

        return book;
      } catch (error) {
        this.error = "Failed to load book.";
        throw error;
      }
    },

    async create() {
      throw new Error("Adding books is disabled in demo mode.");
    },

    async update() {
      throw new Error("Editing books is disabled in demo mode.");
    },

    async remove() {
      throw new Error("Deleting books is disabled in demo mode.");
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
