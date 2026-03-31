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
      const newRecord = {
        ...record,
        status: record.status || "pending",
        adminMsg: "",
        updateTime: new Date().toISOString(),
      };
      this.historyList.push(newRecord);
      this.saveToLocal();
    },

    updateStatus(id, newStatus, msg) {
      const index = this.historyList.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.historyList[index].status = newStatus;
        this.historyList[index].adminMsg = msg;
        this.historyList[index].updateTime = new Date().toISOString();
        this.saveToLocal();
      }
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
