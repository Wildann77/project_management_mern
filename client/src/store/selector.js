/* eslint-disable no-unused-vars */
// ❌ Hapus baris ini
// import { StoreApi, UseBoundStore } from "zustand";

export const createSelectors = (_store) => {
  const store = _store;
  store.use = {};

  for (const k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }

  return store;
};

export default createSelectors;
