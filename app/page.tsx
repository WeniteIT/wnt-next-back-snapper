import { unstable_cache } from "next/cache";
import { IoPieChartSharp } from "react-icons/io5";
import MatchSection from "./_components/match/MatchSection";
import StatisticSection from "./_components/statistic/StatisticSection";
import { getMatchData } from "./_components/getMatchData";

export default async function Home() {
  const getData = unstable_cache(async () => getMatchData(), ["matchData"], {
    revalidate: 60,
  });

  const data = await getData();

  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);

  const lastDayOfMonth = new Date();
  lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);

  const currentMonthName = new Intl.DateTimeFormat("de-DE", {
    month: "long",
  }).format(new Date());

  const currentYear = new Date().getFullYear();

  const DateOfFirstGame = new Date(data[0].date);

  return (
    <>
      <div className="flex flex-col gap-2 md:gap-3 flex-1 md:overflow-hidden h-full">
        <StatisticSection
          data={data}
          from={firstDayOfMonth}
          to={lastDayOfMonth}
          leftLabel="Aktueller Monat"
          rightLabel={currentMonthName + " " + currentYear}
          infos={[
            "Höchste W/L",
            "Meiste Siege",
            "Siegeserie",
            "Niedrigste W/L",
            "Meiste Niederlagen",
          ]}
          altIcon={<IoPieChartSharp className="primary-text text-large" />}
        />
        <StatisticSection
          infos={[
            "Höchster Punktestand",
            "Höchste W/L",
            "Meiste Siege",
            "Siegeserie",
          ]}
          data={data}
          leftLabel="Gesamtstatistik"
          rightLabel={"seit " + DateOfFirstGame.toLocaleDateString("de-DE")}
        />
      </div>
      <div className="flex flex-col gap-3 md:gap-5 flex-1 md:overflow-hidden h-full">
        <MatchSection matchData={data} />
      </div>
    </>
  );
}
