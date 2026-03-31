import { defineStore } from "pinia";
import { mockHistory } from "../mock/data";

export const useHistoryStore = defineStore("history", {
  state: () => ({
    historyList: JSON.parse(localStorage.getItem("sys_history") || "[]"),
  }),

  getters: {
    getAllHistory: (state) => {
      return [...state.historyList].sort(
        (a, b) => new Date(b.createTime) - new Date(a.createTime),
      );
    },
  },

  actions: {
    initHistory() {
      if (this.historyList.length === 0) {
        this.historyList = mockHistory;
        this.saveToLocal();
      }
    },
    addRecord(record) {
      this.historyList.push(record);
      this.saveToLocal();
    },
    deleteRecord(id) {
      this.historyList = this.historyList.filter((item) => item.id !== id);
      this.saveToLocal();
    },
    clearHistory() {
      this.historyList = [];
      localStorage.removeItem("sys_history");
    },
    saveToLocal() {
      localStorage.setItem("sys_history", JSON.stringify(this.historyList));
    },
  },
});
