'use client'

import Link from "next/link";
import { FaTrophy } from "react-icons/fa6";
import { MdAssignmentAdd, MdOutlineWorkHistory } from "react-icons/md";
import { TbSoccerField } from "react-icons/tb";
import RouteButton from "../common/_RouteButton";

function Title() {
  return (
    <Link className="flex items-center flex-1" href="/">
      <div className="flex gap-1 items-center">
        <div className="primary flex rounded-md px-2 items-center ">
          <TbSoccerField className="text-2xl md:text-4xl" /> Kicker
        </div>
        <div className="text-normal">Ticker</div>
      </div>
    </Link>
  );
}

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 secondary border-b primary-border-color flex flex-row text-normal font-bold gap-3 p-2 md:p-2 justify-between z-10">
      <Title />
      <div className="flex gap-1 md:gap-3">
        <RouteButton
          label={<MdAssignmentAdd className="text-normal" />}
          route="/form"
          hover="Formular"
          color="secondary"
        />
        <RouteButton
          label={<FaTrophy className="text-normal" />}
          route="/leaderboard"
          hover="Leaderboard"
          color="secondary"
        />
        <RouteButton
          label={<MdOutlineWorkHistory className="text-normal" />}
          route="/history"
          hover="Complete Match History"
          color="secondary"
        />
      </div>
      <div className="flex-1 hidden md:flex justify-end">
        {/* <ThemeToggle /> */}
      </div>
    </div>
  );
}
