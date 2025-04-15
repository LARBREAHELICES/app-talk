import { useEffect } from "react";
import { useTalkStore } from "../store/useTalksStore";

function Talks() {
  const {
    fetchTalks,
    talks: { talks },
    isLoading,
  } = useTalkStore((state) => state);

  useEffect(() => {
    fetchTalks();
  }, []);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <section className="bg-[#f1ebe5] p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#4b3f33]">Upcoming Talks</h2>
      {talks &&
        talks.map((talk, i) => (
          <div key={i} className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-[#dcd2c7] shadow-sm">
              <h3 className="text-xl font-semibold text-[#4b3f33]">
                {talk.title}
              </h3>
              <p className="text-sm text-[#6c5c4f]"> {talk.duration} min</p>
              <p className="text-sm text-[#6c5c4f]"> {talk.topic}</p>
              <p className="text-sm text-[#6c5c4f]">{talk.objective}</p>
              {talk.presenters &&
                talk.presenters.map((presenter, i) => (
                  <p key={i} className="text-sm text-[#6c5c4f]">{presenter.username}</p>
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}

export default Talks;
