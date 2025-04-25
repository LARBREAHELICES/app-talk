import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { initialTalkState } from './models/initialTalkState'
import { createTalkActions } from './actions/talkActions'

const apiUrl = import.meta.env.VITE_API_URL

export const useTalkCrudStore = create(
  combine(
    { ...initialTalkState },
    (set, get) => ({
      ...createTalkActions(set, get),
      fetchSave: async () => {
        set({ isLoading: true })
        try {
          const { title, topic, duration, objective, scheduled_at, presenters, refresh, serverMessage } = get()

          const response = await fetch(`${apiUrl}/api/talk/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, topic, duration, objective, scheduled_at, presenters }),
          });

          const data = await response.json();

          if (!response.ok) {
            // Si l'API répond avec un message d'erreur, on le garde
            const errorMessage = data?.error || "Erreur inconnue du serveur";
            set({
              isLoading: false,
              ...initialTalkState,
              serverMessage: { message: errorMessage, type: 'failed' },
            })
            return; // on s'arrête ici
          }

          // tout c'est bien passé, on reset et refresh
          set({
            isLoading: false,
            ...initialTalkState,
            refresh: refresh === 0 ? 1 : 0,
            serverMessage: { message: 'The talk has been successfully added.', type: 'success' }
          });

        } catch (error) {
          set({
            isLoading: false,
            serverMessage: serverMessage || 'Erreur réseau'
          });
        }
      },
      resetTalkForm: () => {
        set({ ...initialTalkState })
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
            isLoading: false,
          })
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },
      fetchUpdateTalk: async (talkId, talk) => {
        const { title, topic, duration, presenters, objective } = get()
        set({ isLoading: true })

        try {
          const response = await fetch(`${apiUrl}/api/talk/update/${talkId}`, {
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
            isLoading: false,
            ...initialTalkState,
            talk
          });

        } catch (error) {
          set({ error: 'Failed to fetch talks', isLoading: false })
        }
      },
      fetchDelete: (talkId) => {

      }
    })
  )
)
