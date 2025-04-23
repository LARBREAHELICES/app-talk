// components/molecules/TalkCard.js
import { Link } from "@tanstack/react-router";
import Button from "../atoms/Button";

function TalkCard({ talk, to }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-[#dcd2c7] shadow-sm space-y-1">
      <h3 className="text-xl font-semibold text-[#4b3f33] truncate">
        {talk.title}
      </h3>
      <p className="text-sm text-[#6c5c4f]">{talk.duration} min</p>
      <p className="text-sm text-[#6c5c4f]">{talk.topic}</p>
      <p className="text-sm text-[#6c5c4f] line-clamp-2">{talk.objective}</p>
      {talk.presenters?.map((presenter, i) => (
        <p key={i} className="text-sm text-[#6c5c4f]">
          {presenter.username}
        </p>
      ))}
      {to && (
        <Button>
          <Link to={to}>Edit</Link>
        </Button>
      )}
    </div>
  );
}

export default TalkCard;
