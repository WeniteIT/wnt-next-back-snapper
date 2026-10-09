import { FaTrophy } from "react-icons/fa";
import { IMatchData } from "../../interfaces";
import { PlayerLink } from "../common/PlayerLink";

interface IProps {
  match: IMatchData;
  prevMatch: IMatchData;
  player: string;
}

export default function PlayerMatchCard({ match, player, prevMatch }: IProps) {
  const isPlayerOne = match.player1.name.toLowerCase() === player.toLowerCase();
  const isPrevPlayerOne =
    prevMatch?.player1.name.toLowerCase() === player.toLowerCase();

  const PlayerOnePoints =
    match.player1.points -
    (isPrevPlayerOne
      ? prevMatch.player1.points
      : prevMatch?.player2.points || 1200);

  const PlayerTwoPoints =
    match.player2.points -
    (isPrevPlayerOne
      ? prevMatch.player1.points
      : prevMatch?.player2.points || 1200);

  const isPositiveScore = isPlayerOne
    ? match.player1.score > match.player2.score
    : match.player2.score > match.player1.score;

  const names = (
    <div className="flex gap-1 min-w-26 md:min-w-36 whitespace-norwrap overflow-hidden items-center">
      <PlayerLink
        name={isPlayerOne ? match.player2.name : match.player1.name}
      />
      <div className="secondary-text-lighter text-smoll">
        {`(${
          isPlayerOne
            ? match.player2.points.toFixed(0)
            : match.player1.points.toFixed(0)
        })`}
      </div>
    </div>
  );

  const scores = (
    <div className="secondary flex items-center font-bold gap-1 md:gap-3 justify-center min-w-13 pl-2 md:pl-0 md:min-w-24 text-normal relative ">
      <div
        className={`flex px-2 skew-x-16 absolute -left-2 top-0 bottom-0 ${
          isPlayerOne
            ? match.player1.score > match.player2.score
              ? "success"
              : "failure"
            : match.player2.score > match.player1.score
            ? "success"
            : "failure"
        }`}
      />
      <div
        className={
          isPlayerOne
            ? match.player1.score > match.player2.score
              ? "primary-text"
              : ""
            : match.player2.score > match.player1.score
            ? "primary-text"
            : ""
        }
      >
        {isPlayerOne ? (
          match.player1.score > match.player2.score ? (
            <FaTrophy />
          ) : (
            <div>{match.player1.score}</div>
          )
        ) : match.player2.score > match.player1.score ? (
          <FaTrophy />
        ) : (
          <div>{match.player2.score}</div>
        )}
      </div>
    </div>
  );

  const slice = 30;
  const comment = (
    <div
      title={
        match.comment +
        (match.comment && " - ") +
        new Date(match.date).toLocaleString("de-DE")
      }
      className="hidden md:flex text-smoll secondary-text-lighter justify-end flex-1 items-center gap-3 italic whitespace-nowrap text-ellipsis overflow-hidden pr-2"
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

  const points = (
    <div className={`flex gap-2 md:gap-3 min-w-15`}>
      <div className="w-full">
        {isPlayerOne
          ? match.player1.points.toFixed(0)
          : match.player2.points.toFixed(0)}
      </div>
      <div
        className={`${
          isPlayerOne
            ? match.player1.score > match.player2.score
              ? "text-success"
              : "text-failure"
            : match.player2.score > match.player1.score
            ? "text-success"
            : "text-failure"
        }`}
      >{` ${isPositiveScore ? "+" : ""}${
        prevMatch
          ? isPlayerOne
            ? PlayerOnePoints.toFixed(0)
            : PlayerTwoPoints.toFixed(0)
          : ""
      }`}</div>
    </div>
  );

  return (
    <div
      className={`flex gap-1 secondary-lighter rounded-lg shadow-md flex-1 relative overflow-hidden justify-between max-h-10 outline ${
        isPlayerOne
          ? match.player1.score > match.player2.score
            ? "outline-success"
            : "outline-failure ml-3"
          : match.player2.score > match.player1.score
          ? "outline-success"
          : "outline-failure ml-3"
      }`}
    >
      <div
        className={`flex h-20 w-3 ${
          isPlayerOne
            ? match.player1.score > match.player2.score
              ? "success"
              : "failure"
            : match.player2.score > match.player1.score
            ? "success"
            : "failure"
        }`}
      ></div>
      <div className="flex text-normal items-center grow md:p-2 pr-5 overflow-hidden gap-2 md:gap-3">
        <div className="flex secondary-text-lighter md:min-w-12">
          {match.id}
        </div>
        {names}
        {points}
        {comment}
      </div>
      {scores}
    </div>
  );
}
