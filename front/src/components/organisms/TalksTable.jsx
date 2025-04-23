// src/components/organisms/TalksTable.jsx
import TalkRow from "../molecules/TalkRow";

function TalksTable({ talks }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm bg-white border border-[#dcd2c7] rounded-xl">
        <thead className="bg-[#e8e0d8] text-[#4b3f33]">
          <tr>
            <th className="px-4 py-3">Titre</th>
            <th className="px-4 py-3">Durée</th>
            <th className="px-4 py-3">Sujet</th>
            <th className="px-4 py-3">Présentateurs</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {talks && talks.map((talk) => (
            <TalkRow key={talk.id} talk={talk} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TalksTable
