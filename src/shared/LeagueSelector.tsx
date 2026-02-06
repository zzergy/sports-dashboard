import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import type { AppDispatch, RootState } from "../app/store/store";
import { setLeague, type LeagueName } from "../app/slices/leagueSlice";

const LeagueSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedLeague = useSelector(
    (state: RootState) => state.league.leagueName,
  );

  const handleChange = (event: SelectChangeEvent<LeagueName>) => {
    const value = event.target.value as LeagueName;
    dispatch(setLeague(value));
  };

  return (
    <Select value={selectedLeague} onChange={handleChange}>
      <MenuItem value="nba">NBA</MenuItem>
      <MenuItem value="nfl">NFL</MenuItem>
    </Select>
  );
};

export default LeagueSelector;
