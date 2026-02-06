import { useQuery } from "@tanstack/react-query";
import type { LeagueName, SportType } from "../app/slices/leagueSlice";
import type { TeamSchedule, TeamScheduleAPIResponse } from "../types";

const fetchTeamSchedule = async (
  teamId: string,
  leagueName: LeagueName,
  sportType: SportType,
): Promise<TeamSchedule[]> => {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/${sportType}/${leagueName}/teams/${teamId}/schedule`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch team schedule");
  }

  const data = (await res.json()) as TeamScheduleAPIResponse;

  console.log("Schedule API data:", data);

  if (!data.events) {
    return [];
  }

  return data.events.map((event) => {
    const isHome = event.competitions[0].competitors[0].homeAway === "home";
    const homeTeam = event.competitions[0].competitors[0];
    const awayTeam = event.competitions[0].competitors[1];

    const opponent = isHome ? awayTeam.team.displayName : homeTeam.team.displayName;
    const opponentLogo = isHome ? awayTeam.team.logo : homeTeam.team.logo;
    const venue = event.competitions[0].venue?.fullName;
    const status = event.competitions[0].status?.type?.description;

    return {
      id: event.id,
      date: event.date,
      opponent,
      opponentLogo,
      isHome,
      venue,
      status,
    };
  });
};

export const useTeamSchedule = (
  teamId: string,
  leagueName: LeagueName,
  sportType: SportType,
) => {
  return useQuery<TeamSchedule[], Error>({
    queryKey: ["teamSchedule", teamId, leagueName, sportType],
    queryFn: () => fetchTeamSchedule(teamId, leagueName, sportType),
    enabled: !!teamId,
    staleTime: 1000 * 60 * 5,
  });
};
