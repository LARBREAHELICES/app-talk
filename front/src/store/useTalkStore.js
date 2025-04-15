import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useTalkStore = create(
  combine(
    {
      title: null,
      topic: null,
      duration: 0,
      status: 'draft', // 'draft', 'ready', 'done'
      presenters: [],
      objective: null,
    },
    (set, get) => ({
      setTitle: (title) => set({ title }),
      setTopic: (topic) => set({ topic }),
      setDuration: (duration) => set({ duration }),
      setStatus: (status) => set({ status }),
      setObjective: (objective) => set({ objective }),
      addPresenter: (name) =>
        set({ presenters: [...get().presenters, name] }),

      removePresenter: (name) =>
        set({ presenters: get().presenters.filter(p => p !== name) }),
    })
  )
)
