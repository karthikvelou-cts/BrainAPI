import { defineStore } from "pinia";
import api from "../services/api";

export const useTriviaStore = defineStore("trivia", {
  state: () => ({
    questions: [],
    categories: [],
    pagination: null,
    loading: false,
    error: "",
  }),
  actions: {
    async fetchCategories(page = 1, limit = 50) {
      const { data } = await api.get(`/categories?page=${page}&limit=${limit}`);
      this.categories = data.data;
      return data;
    },
    async fetchQuestions(params = {}) {
      this.loading = true;
      this.error = "";
      try {
        const sanitizedParams = Object.fromEntries(
          Object.entries(params).filter(([, value]) => value !== "" && value !== null && value !== undefined)
        );
        const query = new URLSearchParams(sanitizedParams).toString();
        const { data } = await api.get(`/questions?${query}`);
        this.questions = data.results;
        this.pagination = data.pagination;
        return data;
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch questions";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
