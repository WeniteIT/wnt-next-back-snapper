import { unstable_cache } from "next/cache";
import { FaInfoCircle } from "react-icons/fa";
import {
  PiRankingDuotone,
  PiRankingFill,
  PiRankingLight,
} from "react-icons/pi";
import BaseSection from "../_components/common/BaseSection";
import IconText from "../_components/common/IconText";
import { PlayerLink } from "../_components/common/PlayerLink";
import StatisticCard from "../_components/statistic/StatisticCard";
import {
  calculateScore,
  collectLosses,
  collectWinLoseRatio,
  collectWins,
} from "../_components/StatisticUtils";
import { _AnimatedNumber } from "../_components/common/_AnimatedNumbers";
import { getMatchData } from "../_components/getMatchData";
import { LeagueInfoTitle, getLeague } from "./leagueUtils";
import BreadCrump from "../_components/common/BreadCrump";

export default async function LeaderboardPage() {
  const getData = unstable_cache(async () => getMatchData(), ["matchData"], {
    revalidate: 60,
  });

  const data = await getData();

  const wins = collectWins(data);
  const loses = collectLosses(data);
  const ratio = collectWinLoseRatio(data);
  const rating = calculateScore(data);

  return (
      <div className="flex flex-col w-full gap-4">
        <BreadCrump label={["Home", "Leaderboard"]} />
        <div className="flex flex-col lg:flex-row w-full gap-2 md:gap-4 ">
          <div className="flex flex-col flex-1 md:overflow-hidden h-full">
            <BaseSection
              label={
                <IconText
                  icon={<PiRankingFill className="primary-text" />}
                  text="BS-League-Rating"
                />
              }
              info={
                <FaInfoCircle className="text-normal" title={LeagueInfoTitle} />
              }
            >
              <>
                {Object.keys(rating)
                  .sort((a, b) => rating[b] - rating[a])
                  .map((player, index) => (
                    <StatisticCard
                      key={player}
                      label={
                        <div className="flex text-normal items-center grow p-1 gap-2 overflow-hidden">
                          <div className="flex secondary-text-lighter md:min-w-10">
                            {index + 1}
                          </div>
                          <PlayerLink name={player} />
                        </div>
                      }
                      content={
                        <div className="flex w-full justify-between">
                          <_AnimatedNumber num={+rating[player].toFixed(0)} />
                          <span className="secondary-text-lighter flex">
                            {(() => {
                              const score = rating[player];
                              return getLeague(score).icon;
                            })()}
                          </span>
                        </div>
                      }
                    />
                  ))}
              </>
            </BaseSection>
          </div>
          <div className="flex flex-col gap-2 md:gap-4 flex-1 md:overflow-hidden h-full">
            <BaseSection
              label={
                <IconText
                  icon={<PiRankingLight className="primary-text" />}
                  text="Win/Lose"
                />
              }
            >
              <>
                {Object.keys(ratio)
                  .sort((a, b) => ratio[b] - ratio[a])
                  .map((player, index) => (
                    <StatisticCard
                      key={player}
                      label={
                        <div className="flex text-normal items-center grow p-1 gap-2 overflow-hidden">
                          <div className="flex secondary-text-lighter md:min-w-10">
                            {index + 1}
                          </div>
                          <PlayerLink name={player} />
                        </div>
                      }
                      content={
                        <div className="flex w-full justify-between">
                          <_AnimatedNumber num={+ratio[player].toFixed(2)} />
                          <span className="secondary-text-lighter">
                            {Object.entries(wins).map(([name, win]) => {
                              if (name === player) {
                                return win;
                              }
                            })}
                            /
                            {Object.entries(loses).map(([name, lose]) => {
                              if (name === player) {
                                return lose;
                              }
                            })}
                          </span>
                        </div>
                      }
                    />
                  ))}
              </>
            </BaseSection>
          </div>
          <div className="flex flex-col gap-2 md:gap-4 flex-1 md:overflow-hidden h-full ">
            <BaseSection
              label={
                <IconText
                  icon={<PiRankingDuotone className="primary-text" />}
                  text="Wins"
                />
              }
            >
              <>
                {Object.keys(wins)
                  .sort((a, b) => wins[b] - wins[a])
                  .map((player, index) => (
                    <StatisticCard
                      key={player}
                      label={
                        <div className="flex text-normal items-center grow p-1 overflow-hidden gap-2">
                          <div className="flex secondary-text-lighter md:min-w-10">
                            {index + 1}
                          </div>
                          <PlayerLink name={player} />
                        </div>
                      }
                      content={
                        <div className="flex w-full justify-between">
                          <_AnimatedNumber num={+wins[player].toFixed(0)} />
                          <span className="secondary-text-lighter">
                            {Object.entries(loses).map(([name, lose]) => {
                              if (name === player) {
                                return lose;
                              }
                            })}
                          </span>
                        </div>
                      }
                    />
                  ))}
              </>
            </BaseSection>
          </div>
        </div>
      </div>
    
  );
}
