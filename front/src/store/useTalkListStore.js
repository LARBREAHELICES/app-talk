// src/stores/useTalkStore.js

import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const apiUrl = import.meta.env.VITE_API_URL

export const useTalkListStore = create(
  combine(
    {
      talks: [],
      isLoading: false,
      error: null,
    },
    (set, get) => ({
      fetchAllTalks: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`${apiUrl}/api/talks/all`); // 💡 Adapte à ton endpoint
          if (!res.ok) throw new Error('Failed to fetch talks');

          const data = await res.json();
          set({ talks: data, isLoading: false });
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },
      fetchFuturTalks: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`${apiUrl}/api/talks/futur`); // 💡 Adapte à ton endpoint
          if (!res.ok) throw new Error('Failed to fetch talks');

          const data = await res.json();
          set({ talks: data, isLoading: false });
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      }
    })
  )
)
