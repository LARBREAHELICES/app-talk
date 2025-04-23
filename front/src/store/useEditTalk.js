import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { initialTalkState } from './models/initialTalkState'
import { createTalkActions } from './actions/talkActions'

const apiUrl = import.meta.env.VITE_API_URL

export const useEditTalk = create(
  combine(
    initialTalkState,
    (set, get) => ({
      ...createTalkActions(set, get), // on factorise les actions
      fetchUpdateTalk: async (talkId, talk) => {
        const { title, topic, duration, presenters, objective } = get()
        set({ isLoading: true })

        try {
          const response = await fetch(`${apiUrl}/api/talk/${talkId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...talk
            }),
          });

          if (!response.ok) {
            throw new Error('Request failed');
          }

          const { talk } = await response.json();

          set({
            talk,
            isLoading: false,
            ...initialTalkState,
            talk, // On conserve le résultat
          });

        } catch (error) {
          set({ error: 'Failed to fetch talks', isLoading: false })
        }
      },
      fetchEdit: async (talkId) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`${apiUrl}/api/talk/edit/${talkId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (!res.ok) throw new Error('Failed to fetch talks');

          const { talk } = await res.json()
          set({
            title: talk.title,
            topic: talk.topic,
            duration: talk.duration,
            objective: talk.objective,
            presenters: talk.presenters.map(p => p.username),
            isLoading : false
          })
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      }
    })
  )
)
