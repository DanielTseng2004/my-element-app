import { defineStore } from "pinia";
import { mockHistory } from "../mock/data";

export const useHistoryStore = defineStore("history", {
  state: () => ({
    // 核心：直接從本地讀取，確保重新整理時資料不丟失
    historyList: JSON.parse(localStorage.getItem("sys_history") || "[]"),
  }),

  getters: {
    // 封裝排序邏輯，UI 組件直接調用這個
    getAllHistory: (state) => {
      return [...state.historyList].sort(
        (a, b) => new Date(b.createTime) - new Date(a.createTime),
      );
    },
  },

  actions: {
    // 初始化：僅在完全沒資料時才載入 mock
    initHistory() {
      const localData = localStorage.getItem("sys_history");
      if (!localData || JSON.parse(localData).length === 0) {
        this.historyList = [...mockHistory];
        this.saveToLocal();
      }
    },

    // 新增：確保物件結構統一
    addRecord(record) {
      const newRecord = {
        ...record,
        status: record.status || "pending",
        adminMsg: record.adminMsg || "",
        createTime: record.createTime || new Date().toISOString(),
        updateTime: new Date().toISOString(),
      };
      this.historyList.push(newRecord);
      this.saveToLocal();
    },

    // 更新：直接修改 state 觸發響應
    updateStatus(id, newStatus, msg) {
      const index = this.historyList.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.historyList[index] = {
          ...this.historyList[index],
          status: newStatus,
          adminMsg: msg,
          updateTime: new Date().toISOString(),
        };
        this.saveToLocal();
      }
    },

    // 刪除
    deleteRecord(id) {
      this.historyList = this.historyList.filter((item) => item.id !== id);
      this.saveToLocal();
    },

    // 清空
    clearHistory() {
      this.historyList = [];
      this.saveToLocal();
    },

    // 儲存：這是唯一的數據寫入點
    saveToLocal() {
      localStorage.setItem("sys_history", JSON.stringify(this.historyList));
    },
  },
});
