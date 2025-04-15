import { useEffect } from 'react'
import './App.css'
import { useTalkStore } from './store/useTalksStore'

function App() {

  const  fetchTalks = useTalkStore(state => state.fetchTalks)

  useEffect(() => {
    fetchTalks()
  }, [])

  return (
    <>
      <h1>Hello React !</h1>
    </>
  )
}

export default App
