import { MdMoreTime, MdOutlineWorkHistory, MdToday } from "react-icons/md";
import { IMatchData } from "../../interfaces";
import BaseSection from "../common/BaseSection";
import IconText from "../common/IconText";
import MatchCard from "./MatchCard";
import RouteButton from "../common/_RouteButton";

interface IProps {
  matchData: IMatchData[];
}

export default function MatchSection({ matchData }: IProps) {
  const todaysData = matchData
    .filter(
      (match) =>
        new Date(match.date).getDate() === new Date().getDate() &&
        new Date(match.date).getMonth() === new Date().getMonth() &&
        new Date(match.date).getFullYear() === new Date().getFullYear()
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const dataWithoutToday = matchData
    .filter(
      (match) =>
        new Date(match.date).getDate() !== new Date().getDate() ||
        new Date(match.date).getMonth() !== new Date().getMonth() ||
        new Date(match.date).getFullYear() !== new Date().getFullYear()
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const MAX_ENTRIES = 6;
  const ALL_HISTORY = MAX_ENTRIES - todaysData.length;
  return (
    <>
      {/* {todaysData.length > 0 && ( */}
        <BaseSection
          label={
            <IconText
              icon={<MdToday className="primary-text text-large" />}
              text="Heutige Matches"
            />
          }
          info={`${todaysData.length} Matches`}
        >
          <>
            {todaysData.slice(0, MAX_ENTRIES).map((match, index) => (
              <MatchCard key={index} match={match} />
            ))}
          {todaysData.length === 0 && <div className="text-center">Keine heutigen Matches</div>}
          </>
        </BaseSection>
      {/* )} */}
      {ALL_HISTORY > 0 && (
        <BaseSection
          label={
            <IconText
              icon={
                <MdOutlineWorkHistory className="primary-text text-large" />
              }
              text="Vergangene Matches"
            />
          }
          info={`${matchData.length} Matches insgesamt`}
        >
          <>
            {dataWithoutToday.slice(0, ALL_HISTORY).map((match, index) => (
              <MatchCard key={index} match={match} />
            ))}
            <div className="flex justify-center">
              <RouteButton
                label={
                  <>
                    Alle anzeigen
                    <MdMoreTime />
                  </>
                }
                route="/history"
                width="100"
                color="secondary"
              />
            </div>
          </>
        </BaseSection>
      )}
    </>
  );
}
