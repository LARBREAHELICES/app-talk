// src/stores/useTalkStore.js

import { create } from 'zustand';

export const useTalkStore = create((set) => ({
  talks: [],
  isLoading: false,
  error: null,

  fetchTalks: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch('http://localhost:8080/api/talks'); // 💡 Adapte à ton endpoint
      if (!res.ok) throw new Error('Failed to fetch talks');

      const data = await res.json();
      console.log(data);
      set({ talks: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  }
}));
