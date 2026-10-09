import { FaTrophy } from "react-icons/fa";
import { RiSwordLine } from "react-icons/ri";
import { IMatchData } from "../../interfaces";
import { PlayerLink } from "../common/PlayerLink";

interface IProps {
  match: IMatchData;
}

export default function MatchCard({ match }: IProps) {
  const names = (
    <div className="flex gap-1 md:gap-3 flex-1 md:min-w-70 whitespace-norwrap overflow-hidden items-center">
      <PlayerLink
        name={match.player1.name}
        className={
          "hover:underline " +
          (match.player2.score < match.player1.score
            ? "primary-text font-medium"
            : "")
        }
      />
      <div className="font-semibold">
        <RiSwordLine />
        {/* <Link href={`player/${match.player1.name.toLowerCase()}/vs/${match.player2.name.toLowerCase()}`}><RiSwordLine /></Link> */}
      </div>
      <PlayerLink
        name={match.player2.name}
        className={
          "hover:underline " +
          (match.player2.score > match.player1.score
            ? "primary-text font-medium"
            : "")
        }
      />
    </div>
  );

  const scores = (
    <div className="secondary flex items-center font-medium gap-1 md:gap-3 justify-center min-w-22 md:min-w-30 text-normal relative">
      <div className="flex secondary px-2 skew-x-16 absolute -left-2 top-0 bottom-0" />
      <div
        className={
          "min-w-6 flex justify-center " +
          (match.player2.score < match.player1.score ? "text-gold" : "")
        }
      >
        {match.player2.score < match.player1.score ? (
          <FaTrophy />
        ) : (
          <div>{match.player1.score}</div>
        )}
      </div>
      <div>-</div>
      <div
        className={
          "min-w-6 flex justify-center " +
          (match.player2.score > match.player1.score ? "text-gold" : "")
        }
      >
        {match.player2.score > match.player1.score ? (
          <FaTrophy />
        ) : (
          <div>{match.player2.score}</div>
        )}
      </div>
    </div>
  );

  const slice = 34;
  const comment = (
    <div
      title={
        match.comment +
        (match.comment && " - ") +
        new Date(match.date).toLocaleString("de-DE")
      }
      className="hidden md:flex text-smoll secondary-text-lighter justify-end flex-1 items-center gap-3 italic whitespace-nowrap text-ellipsis overflow-hidden pr-1"
    >
      {match.comment
        ? `"${
            match.comment.length > slice
              ? match.comment.slice(0, slice) + "..."
              : match.comment
          }"`
        : new Date(match.date).toLocaleString("de-DE")}
    </div>
  );

  return (
    <div className="flex gap-4 secondary-lighter rounded-lg shadow-md flex-1 relative overflow-hidden justify-between max-h-10">
      <div className="flex text-normal items-center grow p-2 pr-5 overflow-hidden">
        <div className="flex pr-4 pl-2 secondary-text-lighter md:min-w-14">
          {match.id}
        </div>
        {names}
        {comment}
      </div>
      {scores}
    </div>
  );
}
