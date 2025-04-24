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
              serverMessage:  { message : errorMessage, type : 'failed'},
            })
            return; // on s'arrête ici
          }

          // tout c'est bien passé, on reset et refresh
          set({
            isLoading: false,
            ...initialTalkState,
            refresh: refresh === 0 ? 1 : 0,
            serverMessage : { message : 'The talk has been successfully added.', type : 'success'}
          });

        } catch (error) {
          set({
            isLoading: false,
            serverMessage : serverMessage || 'Erreur réseau'
          });
        }
      }
    })
  )
)
