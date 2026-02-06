import React, { useState, useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Grid,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

import { useScoreboard } from "../../hooks/useScoreboard";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store/store";
import LeagueSelector from "../../shared/LeagueSelector";
import GameDetailsModal from "./GameDetailsModal";
import type { Game } from "../../types";
import {
  Container,
  Header,
  GameCard,
  MatchupBox,
  TeamBox,
  Logo,
  VsText,
  DateText,
} from "./DashboardPage.styles";

const DashboardPage: React.FC = () => {
  const { leagueName, sportType } = useSelector(
    (state: RootState) => state.league,
  );
  const { data, isLoading, isError } = useScoreboard(leagueName, sportType);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "error" | "info" | "success";
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const lastNotificationRef = React.useRef(notification);

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const showNotification = (
    message: string,
    severity: "error" | "info" | "success",
  ) => {
    setNotification((prev) => {
      if (prev.message === message && prev.severity === severity && prev.open) {
        return prev;
      }
      return {
        open: true,
        message,
        severity,
      };
    });
  };

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (
      isError &&
      !lastNotificationRef.current.message &&
      lastNotificationRef.current.message !== "Failed to load scoreboard."
    ) {
      requestAnimationFrame(() => {
        showNotification("Failed to load scoreboard.", "error");
      });
    } else if (
      !isLoading &&
      data?.length === 0 &&
      !lastNotificationRef.current.message &&
      lastNotificationRef.current.message !== "No games today."
    ) {
      requestAnimationFrame(() => {
        showNotification("No games today.", "info");
      });
    }
    lastNotificationRef.current = notification;
  }, [isError, isLoading, data, notification]);

  return (
    <Container>
      <Header>
        <Typography variant="h4">Sports Dashboard</Typography>
        <LeagueSelector />
      </Header>

      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && data && data.length > 0 && (
        <Grid container spacing={2}>
          {data?.map((game) => (
            <Grid item xs={12} md={6} key={game.id}>
              <GameCard onClick={() => handleGameClick(game)}>
                <MatchupBox>
                  <TeamBox>
                    {game.homeLogo && (
                      <Logo src={game.homeLogo} alt={game.homeTeam} />
                    )}
                    <Typography variant="body1">{game.homeTeam}</Typography>
                  </TeamBox>
                  <VsText>VS</VsText>
                  <TeamBox>
                    {game.awayLogo && (
                      <Logo src={game.awayLogo} alt={game.awayTeam} />
                    )}
                    <Typography variant="body1">{game.awayTeam}</Typography>
                  </TeamBox>
                </MatchupBox>
                <DateText>
                  {new Date(game.date).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </DateText>
              </GameCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {selectedGame && (
        <GameDetailsModal
          game={selectedGame}
          open={isModalOpen}
          onClose={handleCloseModal}
          leagueName={leagueName}
          sportType={sportType}
        />
      )}
    </Container>
  );
};

export default DashboardPage;
