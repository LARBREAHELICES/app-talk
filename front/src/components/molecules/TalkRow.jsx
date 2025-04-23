// src/components/molecules/TalkRow.jsx
import { Link } from "@tanstack/react-router";

function TalkRow({ talk }) {
  return (
    <tr className="border-t border-[#dcd2c7] hover:bg-[#faf7f5]">
      <td className="px-4 py-3">{talk.title}</td>
      <td className="px-4 py-3">{talk.duration} min</td>
      <td className="px-4 py-3">{talk.topic}</td>
      <td className="px-4 py-3">
        {talk.presenters?.map((p) => p.username).join(", ")}
      </td>
      <td className="px-4 py-3 text-right">
        <Link
          to={`/talk/edit/${talk.id}`}
          className="bg-[#a68b6d] text-white px-4 py-1 rounded-xl hover:bg-[#92755b] transition text-sm [&.active]:font-bold"
        >
          Modifier
        </Link>
      </td>
    </tr>
  );
}

export default TalkRow
