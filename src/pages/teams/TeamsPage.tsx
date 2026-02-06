import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { useTeams, type Team } from "../../hooks/useTeams";
import { useTeamDetails } from "../../hooks/useTeamDetails";
import { useTeamSchedule } from "../../hooks/useTeamSchedule";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store/store";
import LeagueSelector from "../../shared/LeagueSelector";
import TeamDetailsDrawer from "./TeamsDrawer";

const TeamsPage: React.FC = () => {
  const { leagueName, sportType } = useSelector(
    (state: RootState) => state.league,
  );
  const { data, isLoading, isError } = useTeams(leagueName, sportType);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: teamDetails, isLoading: isLoadingDetails } = useTeamDetails(
    selectedTeam?.id || "",
    leagueName,
    sportType,
  );
  const { data: teamSchedule, isLoading: isLoadingSchedule } = useTeamSchedule(
    selectedTeam?.id || "",
    leagueName,
    sportType,
  );

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
    setDrawerOpen(true);
  };

  return (
    <Box p={2}>
      <Box
        sx={{
          mb: 3,
          pb: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Teams</Typography>
        <LeagueSelector />
      </Box>

      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 400,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {isError && <Alert severity="error">Failed to load teams.</Alert>}
      {!isLoading && data?.length === 0 && (
        <Alert severity="info">No teams found.</Alert>
      )}

      <Grid container spacing={2}>
        {data?.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <Paper
              sx={{
                p: 2,
                cursor: "pointer",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 180,
              }}
              onClick={() => handleTeamClick(team)}
            >
              {team.logo && (
                <Box
                  component="img"
                  src={team.logo}
                  alt={team.name}
                  sx={{ width: 80, height: 80, mb: 1 }}
                />
              )}
              <Typography variant="h6">{team.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {selectedTeam && (
        <TeamDetailsDrawer
          team={selectedTeam}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          teamDetails={teamDetails}
          isLoadingDetails={isLoadingDetails}
          teamSchedule={teamSchedule}
          isLoadingSchedule={isLoadingSchedule}
        />
      )}
    </Box>
  );
};

export default TeamsPage;
