import { useQuery } from "@tanstack/react-query";
import type { LeagueName, SportType } from "../app/slices/leagueSlice";
import type { TeamsAPIResponse } from "../types";

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
  location: string;
}

const fetchTeams = async (leagueName: LeagueName, sportType: SportType) => {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/${sportType}/${leagueName}/teams`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch teams");
  }

  const data = await res.json() as TeamsAPIResponse;

  return data.sports[0].leagues[0].teams.map(
    (item) => ({
      id: item.team.id,
      name: item.team.displayName,
      abbreviation: item.team.abbreviation,
      logo: item.team.logos?.[0]?.href || "",
      location: item.team.location,
    })
  ) as Team[];
};

export const useTeams = (leagueName: LeagueName, sportType: SportType) => {
  return useQuery<Team[], Error>({
    queryKey: ["teams", leagueName, sportType],
    queryFn: () => fetchTeams(leagueName, sportType),
    staleTime: 1000 * 60, // 1 minute
  });
};
