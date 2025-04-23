import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { initialTalkState } from './models/initialTalkState'
import { createTalkActions } from './actions/talkActions'

const apiUrl = import.meta.env.VITE_API_URL

export const useSaveTalk = create(
  combine(
    { ...initialTalkState },
    (set, get) => ({
      ...createTalkActions(set, get),
      fetchSave: async () => {
        set({ isLoading: true })
        try {
          const { title, topic, duration, objective,scheduled_at, presenters } = get()
          
          const request = await fetch(`${apiUrl}/api/talk/create`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, topic, duration, objective,scheduled_at, presenters })
          })

          const response = await request.json()

          set({
            isLoading: false,
            ...initialTalkState,
          })

        } catch (error) {
          set({ error: 'Failed to fetch talks', isLoading: false })
        }
      },
    })
  )
)
