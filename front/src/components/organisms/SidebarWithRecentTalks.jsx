import { useEffect } from "react"
import { useTalkStore } from "../../store/useTalksStore"
import TalkCard from "../molecules/TalkCard"
import { useSaveTalk } from "../../store/useSaveTalk";

function SidebarWithRecentTalks() {
  const {
    fetchFuturTalks,
    talks: { talks },
    isLoading,
  } = useTalkStore((state) => state);

  const { refresh } = useSaveTalk(state => state )

  useEffect(() => {
    fetchFuturTalks()
    console.log('REFRESH useffect', refresh)

  }, [refresh])

  if (isLoading) return <p>Loading ...</p>

  return (
    <section className="bg-[#f1ebe5] p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#4b3f33]">Upcoming Talks</h2>
      <div className="space-y-4">
        {talks?.map((talk, i) => (
          <TalkCard key={i} talk={talk} />
        ))}
      </div>
    </section>
  )
}

export default SidebarWithRecentTalks
