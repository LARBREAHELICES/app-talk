export const createTalkActions = (set, get) => ({
    setTitle: (title) => set({ title }),
    setTopic: (topic) => set({ topic }),
    setDuration: (duration) => set({ duration }),
    setStatus: (status) => set({ status }),
    setObjective: (objective) => set({ objective }),
    setScheduledAt: (scheduled_at) => set({ scheduled_at }),
    setServerMessage: (serverMessage) => set({ serverMessage }),
  
    addPresenter: (presenter) =>{
      set({ presenters: [...get().presenters, presenter] })
    },
  
    removePresenter: (name) =>
      set({ presenters: get().presenters.filter(p => p.username !== name) }),
  });