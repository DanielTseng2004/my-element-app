import { defineStore } from "pinia";
import { mockHistory } from "../mock/data";

export const useHistoryStore = defineStore("history", {
  // 1. 狀態：相當於 ref
  state: () => ({
    historyList: JSON.parse(localStorage.getItem("sys_history") || "[]"),
  }),

  // 2. 修飾狀態：相當於 computed
  getters: {
    // 取得過濾後的完整清單（用於管理頁面）
    getAllHistory: (state) => {
      return [...state.historyList].sort(
        (a, b) => new Date(b.createTime) - new Date(a.createTime),
      );
    },
  },

  // 3. 方法：相當於 function
  actions: {
    // 初始化資料
    initHistory() {
      if (this.historyList.length === 0) {
        this.historyList = mockHistory;
        this.saveToLocal();
      }
    },
    // 新增紀錄
    addRecord(record) {
      this.historyList.push(record);
      this.saveToLocal();
    },
    // 刪除紀錄
    deleteRecord(id) {
      this.historyList = this.historyList.filter((item) => item.id !== id);
      this.saveToLocal();
    },
    // 清空紀錄
    clearHistory() {
      this.historyList = [];
      localStorage.removeItem("sys_history");
    },
    // 統一儲存到 LocalStorage
    saveToLocal() {
      localStorage.setItem("sys_history", JSON.stringify(this.historyList));
    },
  },
});
