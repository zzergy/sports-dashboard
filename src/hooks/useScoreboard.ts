import { useQuery } from "@tanstack/react-query";
import type { Competitor, Event, Game, ScoreboardResponse } from "../types";
import type { LeagueName, SportType } from "../app/slices/leagueSlice";

const fetchScoreboard = async (
  leagueName: LeagueName,
  sportType: SportType,
): Promise<Game[]> => {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/${sportType}/${leagueName}/scoreboard`,
  );
  const data: ScoreboardResponse = await res.json();

  return data.events.map((event: Event) => {
    const competition = event.competitions[0];
    const home = competition.competitors.find(
      (competitor: Competitor) => competitor.homeAway === "home",
    )!;

    const away = competition.competitors.find(
      (competitor: Competitor) => competitor.homeAway === "away",
    )!;

    return {
      id: event.id,
      homeTeam: home.team.displayName,
      awayTeam: away.team.displayName,
      homeScore: Number(home.score),
      awayScore: Number(away.score),
      date: event.date,
      status: event.status?.type?.detail || "Unknown",
      venue: competition.venue?.fullName || "TBD",
      broadcasters: competition.broadcasts?.map((b) => b.name).join(", ") || "N/A",
      homeRecord: home.records?.[0]?.summary || "",
      awayRecord: away.records?.[0]?.summary || "",
      homeLogo: home.team.logo,
      awayLogo: away.team.logo,
    };
  });
};

export const useScoreboard = (leagueName: LeagueName, sportType: SportType) => {
  return useQuery<Game[]>({
    queryKey: ["scoreboard", leagueName, sportType],
    queryFn: () => fetchScoreboard(leagueName, sportType),
    staleTime: 1000 * 60,
  });
};
