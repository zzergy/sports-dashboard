import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import type { Game } from "../../types";
import type { LeagueName, SportType } from "../../app/slices/leagueSlice";
import { useGameSummary } from "../../hooks/useGameSummary";
import Modal from "../../shared/Modal";

interface GameDetailsDrawerProps {
  game: Game;
  open: boolean;
  onClose: () => void;
  leagueName: LeagueName;
  sportType: SportType;
}

const GameDetailsModal: React.FC<GameDetailsDrawerProps> = ({
  game,
  open,
  onClose,
  leagueName,
  sportType,
}) => {
  const { data: summary } = useGameSummary(game.id, leagueName, sportType);

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography variant="h5">Game Details</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "text.secondary",
              }}
            >
              <Typography variant="body2">
                {new Date(game.date).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </Typography>
              {game.venue && (
                <>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ height: 16, borderColor: "divider" }}
                  />
                  <Typography variant="body2">{game.venue}</Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            bgcolor: "primary.dark",
            borderRadius: 2,
            p: 3,
            mb: 2,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {game.homeLogo && (
                <Box
                  component="img"
                  src={game.homeLogo}
                  alt={game.homeTeam}
                  sx={{ width: 100, height: 100, mb: 1, objectFit: "contain" }}
                />
              )}
              <Typography
                variant="caption"
                sx={{ fontWeight: "bold", mb: 0.5 }}
              >
                HOME
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: "normal" }}
              >
                {game.homeTeam}
              </Typography>
              {game.homeRecord && (
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  {game.homeRecord}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="h3"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {game.homeScore}
              </Typography>
              <Typography
                variant="h3"
                sx={{ color: "white", fontWeight: "bold", opacity: 0.5 }}
              >
                -
              </Typography>
              <Typography
                variant="h3"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {game.awayScore}
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {game.awayLogo && (
                <Box
                  component="img"
                  src={game.awayLogo}
                  alt={game.awayTeam}
                  sx={{ width: 100, height: 100, mb: 1, objectFit: "contain" }}
                />
              )}
              <Typography
                variant="caption"
                sx={{ color: "white", fontWeight: "bold", mb: 0.5 }}
              >
                AWAY
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: "normal" }}
              >
                {game.awayTeam}
              </Typography>
              {game.awayRecord && (
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  {game.awayRecord}
                </Typography>
              )}
            </Box>
          </Box>

          {game.status && (
            <Box
              sx={{
                mt: 2,
                display: "inline-block",
                bgcolor: "rgba(255, 255, 255, 0.15)",
                px: 2,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  letterSpacing: 0.5,
                }}
              >
                {game.status.toUpperCase()}
              </Typography>
            </Box>
          )}
        </Box>

        {summary && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "white", mb: 3 }}
            >
              Game Statistics
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                maxHeight: 400,
                overflow: "auto",
                bgcolor: "grey.900",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  gap: 1.5,
                  alignItems: "center",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  pb: 1.5,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  {game.homeTeam}
                </Typography>
                <Box />
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    color: "text.primary",
                    textAlign: "right",
                  }}
                >
                  {game.awayTeam}
                </Typography>
              </Box>
              {Array.isArray(summary.homeStats.stats) &&
                summary.homeStats.stats
                  .slice(0, 8)
                  .map((homeStat, index, array) => {
                    const awayStat = Array.isArray(summary.awayStats.stats)
                      ? summary.awayStats.stats[index]
                      : null;
                    const isLast = index === array.length - 1;
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto 1fr",
                          gap: 1.5,
                          alignItems: "center",
                          py: 1,
                          borderBottom: isLast ? "none" : "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "primary.main" }}
                        >
                          {homeStat.displayValue || homeStat.value}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.primary",
                            fontWeight: "normal",
                            textAlign: "center",
                          }}
                        >
                          {homeStat.name.replace(/([A-Z])/g, " $1").trim()}
                        </Typography>
                        {awayStat && (
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bold",
                              color: "primary.main",
                              textAlign: "right",
                            }}
                          >
                            {awayStat.displayValue || awayStat.value}
                          </Typography>
                        )}
                      </Box>
                    );
                  })}
            </Box>
          </>
        )}
      </>
    </Modal>
  );
};

export default GameDetailsModal;
