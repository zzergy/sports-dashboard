import { useQuery } from "@tanstack/react-query";
import type { LeagueName, SportType } from "../app/slices/leagueSlice";
import type { TeamDetails, TeamDetailsAPIResponse } from "../types";

const fetchTeamDetails = async (
  teamId: string,
  leagueName: LeagueName,
  sportType: SportType,
): Promise<TeamDetails> => {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/${sportType}/${leagueName}/teams/${teamId}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch team details");
  }

  const data = (await res.json()) as TeamDetailsAPIResponse;

  const recordItems = data.team.record?.items || [];
  const totalRecord = recordItems.find((item) => item.type === "total")?.summary;
  const homeRecord = recordItems.find((item) => item.type === "home")?.summary;
  const awayRecord = recordItems.find((item) => item.type === "road")?.summary;

  return {
    color: `#${data.team.color}`,
    standingSummary: data.team.standingSummary || "N/A",
    record: totalRecord || "N/A",
    homeRecord: homeRecord || "N/A",
    awayRecord: awayRecord || "N/A",
    venue: data.team.franchise?.venue?.fullName || "N/A",
  };
};

export const useTeamDetails = (
  teamId: string,
  leagueName: LeagueName,
  sportType: SportType,
) => {
  return useQuery<TeamDetails, Error>({
    queryKey: ["teamDetails", teamId, leagueName, sportType],
    queryFn: () => fetchTeamDetails(teamId, leagueName, sportType),
    enabled: !!teamId,
    staleTime: 1000 * 60 * 5,
  });
};
