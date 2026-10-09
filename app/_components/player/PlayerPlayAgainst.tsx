"use client";

import { GiSwordwoman } from "react-icons/gi";
import BaseSection from "../common/BaseSection";
import IconText from "../common/IconText";
import { IMatchData } from "@/app/interfaces";

interface PlayerPlayAgainstProps {
  playersData: IMatchData[];
  player: string;
}

export function PlayerPlayAgainst({
  playersData,
  player,
}: PlayerPlayAgainstProps) {
  const collectedCountPlayedAgainst = playersData.reduce((acc, match) => {
    const opponent =
      match.player1.name.toLowerCase() === player.toLowerCase()
        ? match.player2.name
        : match.player1.name;
    acc[opponent] = (acc[opponent] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const collectedCountWinnedAgainst = playersData.reduce((acc, match) => {
    const opponent =
      match.player1.name.toLowerCase() === player.toLowerCase()
        ? match.player2.name
        : match.player1.name;
    const isPlayer1 = match.player1.name.toLowerCase() === player.toLowerCase();
    const isPlayer2 = match.player2.name.toLowerCase() === player.toLowerCase();
    if (isPlayer1 && match.player1.score > match.player2.score) {
      acc[opponent] = (acc[opponent] || 0) + 1;
    } else if (isPlayer2 && match.player2.score > match.player1.score) {
      acc[opponent] = (acc[opponent] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const collectedCountPlayedAgainstEntries = Object.entries(
    collectedCountPlayedAgainst
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const highestCount = Math.max(
    ...collectedCountPlayedAgainstEntries.map((entry) => entry[1])
  );

  const highestWinnedCount = Math.max(
    ...Object.values(collectedCountWinnedAgainst).filter((count) => count > 0)
  );

  const highestCountOfCounts = Math.max(
    highestCount,
    highestWinnedCount
  );

  return (
    <BaseSection
      label={
        <IconText
          icon={<GiSwordwoman className="primary-text text-large" />}
          text={`Played Against`}
        />
      }
    >
      <div className="flex h-70 max-w-full overflow-x-hidden ">
        {[...collectedCountPlayedAgainstEntries].map(([opponent, count]) => (
          <div
            key={opponent}
            className="flex flex-col items-center justify-start p-1 gap-1 rounded-lg grow max-w-24 basis-0 overflow-hidden "
          >
            <div className="secondary-text-light font-bold">
              {collectedCountWinnedAgainst[opponent] || 0}
            </div>
            <div
              style={{ height: "75px" }}
              className="flex items-end w-full overflow-hidden px-3 secondary rounded-t-lg "
            >
              <div
                title={`${collectedCountWinnedAgainst[opponent] || 0} wins against ${opponent}`}
                style={{
                  height:
                    (70 / highestCountOfCounts) *
                      collectedCountWinnedAgainst[opponent] || 0 + "px",
                }}
                className="w-full rounded-t-lg transition-all duration-300 primary-light "
              ></div>
            </div>
            <div
              style={{ height: "75px" }}
              className="flex items-start w-full overflow-hidden secondary rounded-b-lg px-3"
            >
              <div
                title={`${count} matches against ${opponent}`}
                style={{ height: (70 / highestCountOfCounts) * count + "px" }}
                className="w-full primary rounded-b-lg transition-all duration-300"
              ></div>
            </div>
            <div className="secondary-text-light font-bold">{count}</div>
            <span className="font-bold mt-6 overflow-hidden">{opponent}</span>
          </div>
        ))}
      </div>
    </BaseSection>
  );
}
