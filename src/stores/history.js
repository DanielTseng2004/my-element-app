// 引入Pinia和mock數據
import { defineStore } from "pinia";
import { mockHistory } from "../mock/data";
// 定義歷史記錄store
export const useHistoryStore = defineStore("history", {
  // state: 歷史列表
  state: () => ({
    historyList: JSON.parse(localStorage.getItem("sys_history") || "[]"),
  }),
  // getters: 獲取所有歷史，按時間排序
  getters: {
    getAllHistory: (state) => {
      return [...state.historyList].sort(
        (a, b) => new Date(b.createTime) - new Date(a.createTime),
      );
    },
  },
  // actions: 初始化、添加、更新、刪除、清空、保存到本地
  actions: {
    // 初始化歷史記錄
    initHistory() {
      if (this.historyList.length === 0) {
        this.historyList = mockHistory;
        this.saveToLocal();
      }
    },
    // 添加記錄
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
    // 更新狀態
    updateStatus(id, newStatus, msg) {
      const index = this.historyList.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.historyList[index].status = newStatus;
        this.historyList[index].adminMsg = msg;
        this.historyList[index].updateTime = new Date().toISOString();
        this.saveToLocal();
      }
    },
    // 刪除記錄
    deleteRecord(id) {
      this.historyList = this.historyList.filter((item) => item.id !== id);
      this.saveToLocal();
    },
    // 清空歷史
    clearHistory() {
      this.historyList = [];
      localStorage.removeItem("sys_history");
    },
    // 保存到本地存儲
    saveToLocal() {
      localStorage.setItem("sys_history", JSON.stringify(this.historyList));
    },
  },
});
