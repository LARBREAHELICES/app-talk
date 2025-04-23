import { useEffect } from "react";
import { useTalkStore } from "../store/useTalksStore";
import TalkCard from "../components/molecules/TalkCard";

function TalksListPage() {
  const {
    fetchAllTalks,
    talks: { talks },
    isLoading,
  } = useTalkStore((state) => state);

  useEffect(() => {
    fetchAllTalks();
  }, []);

  if (isLoading) return <p className="p-6">Loading talks...</p>;

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#4b3f33]">Upcoming Talks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {talks?.length > 0 ? (
          talks.map((talk, i) => (
            <>
              <TalkCard key={i} talk={talk}  to={`/talk/edit/{talk.id}`} />
            </>
          ))
        ) : (
          <p className="text-[#6c5c4f]">No talks scheduled.</p>
        )}
      </div>
    </main>
  );
}

export default TalksListPage;
