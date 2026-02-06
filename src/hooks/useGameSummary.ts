import { useQuery } from "@tanstack/react-query";
import type { GameSummaryData } from "../types";
import type { LeagueName, SportType } from "../app/slices/leagueSlice";

const fetchGameSummary = async (
  gameId: string,
  leagueName: LeagueName,
  sportType: SportType,
): Promise<GameSummaryData> => {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/${sportType}/${leagueName}/summary?event=${gameId}`,
  );

  const data = await res.json();

  const homeStats = {
    teamId: data.boxscore.teams[0].team.id,
    score: Number(data.boxscore.teams[0].score),
    stats: data.boxscore.teams[0].statistics,
  };

  const awayStats = {
    teamId: data.boxscore.teams[1].team.id,
    score: Number(data.boxscore.teams[1].score),
    stats: data.boxscore.teams[1].statistics,
  };

  return {
    homeStats,
    awayStats,
    plays: data.plays,
  };
};

export const useGameSummary = (
  gameId: string,
  leagueName: LeagueName,
  sportType: SportType,
) => {
  return useQuery<GameSummaryData>({
    queryKey: ["gameSummary", gameId, leagueName, sportType],
    queryFn: () => fetchGameSummary(gameId, leagueName, sportType),
    enabled: !!gameId,
  });
};
