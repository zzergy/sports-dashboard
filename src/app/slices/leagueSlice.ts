import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type LeagueName = "nba" | "nfl";
export type SportType = "basketball" | "football";

export interface LeagueState {
  leagueName: LeagueName;
  sportType: SportType;
}

const initialState: LeagueState = {
  leagueName: "nba",
  sportType: "basketball",
};

const leagueToSportMap: Record<LeagueName, SportType> = {
  nba: "basketball",
  nfl: "football",
};

export const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setLeague: (state, action: PayloadAction<LeagueName>) => {
      state.leagueName = action.payload;
      state.sportType = leagueToSportMap[action.payload];
    },
  },
});

export const { setLeague } = leagueSlice.actions;
export default leagueSlice.reducer;
