import { defineStore } from "pinia";
import api from "../services/api";

export const useTriviaStore = defineStore("trivia", {
  state: () => ({
    questions: [],
    categories: [],
    pagination: null,
    loadingQuestions: false,
    loadingCategories: false,
    error: "",
  }),
  actions: {
    async fetchCategories(page = 1, limit = 50) {
      this.loadingCategories = true;
      try {
        const { data } = await api.get(`/categories?page=${page}&limit=${limit}`);
        this.categories = data.data;
        return data;
      } finally {
        this.loadingCategories = false;
      }
    },
    async fetchQuestions(params = {}) {
      this.loadingQuestions = true;
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
        this.loadingQuestions = false;
      }
    },
  },
});
