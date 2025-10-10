import { useLocalStorage } from "@vueuse/core";
import { acceptHMRUpdate, defineStore } from "pinia";

import { addUpdateRecord, removeRecord, uuidv4 } from "@/utils.js";

export const useSessionStore = defineStore('session', () => {
  const urls = useLocalStorage('websocketUrls', []);
  const currentUrlId = useLocalStorage('currentWebsocketUrlId', null);


  // migrate the old single-value key

  if (localStorage.getItem('websocketUrl')) {
    const url = localStorage.getItem('websocketUrl');
    urls.value.push({ id: uuidv4(), name: 'imported', url: url });
    localStorage.removeItem('websocketUrl');
  }

  function findRecord(id) {
    return urls.value.find(u => u.id === id);
  }

  function save(record) {
    if (!record.id) {
      record.id = uuidv4();
    }
    addUpdateRecord(urls.value, record);
  }

  function remove(id) {
    removeRecord(urls.value, id);
  }

  return {
    urls,
    currentUrlId,
    // finders
    findRecord,
    // actions
    save,
    remove,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSessionStore, import.meta.hot));
}