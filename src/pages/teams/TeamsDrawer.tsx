import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

const RecordCard = styled(Card)({
  borderRadius: 3,
  flex: 1,
  minWidth: 0,
});

const RecordCardContent = styled(CardContent)({
  textAlign: "center",
  paddingBottom: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 80,
});

import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import type { Team } from "../../hooks/useTeams";
import type { TeamDetails } from "../../types";
import type { TeamSchedule } from "../../types";
import Modal from "../../shared/Modal";

interface TeamDetailsDrawerProps {
  team: Team | null;
  open: boolean;
  onClose: () => void;
  teamDetails?: TeamDetails;
  isLoadingDetails?: boolean;
  teamSchedule?: TeamSchedule[];
  isLoadingSchedule?: boolean;
}

const TeamDetailsDrawer: React.FC<TeamDetailsDrawerProps> = ({
  team,
  open,
  onClose,
  teamDetails,
  isLoadingDetails,
  teamSchedule,
  isLoadingSchedule,
}) => {
  if (!team) return null;

  const isValidRecord = (record?: string) => record && record !== "N/A";

  return (
    <Modal
      open={open}
      onClose={onClose}
      width={{ xs: "100%", sm: 450, md: 550, lg: 650 }}
      sx={{ maxHeight: "85vh", overflowY: "auto" }}
    >
      {isLoadingDetails && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoadingDetails && (
        <Box>
          <Box
            sx={{
              textAlign: "center",
              p: 3,
              borderRadius: 2,
              bgcolor: teamDetails?.color || "primary.main",
              color: "white",
              mb: 3,
            }}
          >
            {team.logo && (
              <Box
                component="img"
                src={team.logo}
                alt={team.name}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  objectFit: "contain",
                  filter: "drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.5))",
                }}
              />
            )}
            <Typography variant="h5" gutterBottom>
              {team.name} | {team.abbreviation}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
              }}
            >
              <LocationOnIcon
                sx={{ fontSize: "inherit", verticalAlign: "middle" }}
              />
              <Typography variant="body1">
                {team.location} | {teamDetails?.venue}
              </Typography>
            </Box>
          </Box>

          {teamDetails?.standingSummary &&
            teamDetails.standingSummary !== "N/A" && (
              <>
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Standing
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {teamDetails.standingSummary.replace(
                      /(\d+)-(\d+)/,
                      "$1 - $2",
                    )}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
              </>
            )}

          {isLoadingSchedule && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
              <CircularProgress size={24} />
            </Box>
          )}

          {teamDetails &&
            isValidRecord(teamDetails.record) &&
            isValidRecord(teamDetails.homeRecord) &&
            isValidRecord(teamDetails.awayRecord) && (
              <>
                <Typography variant="h6" gutterBottom>
                  Records
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <RecordCard>
                    <RecordCardContent>
                      <Typography variant="caption" color="text.secondary">
                        Overall
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {teamDetails.record.replace(/(\d+)-(\d+)/, "$1 - $2")}
                      </Typography>
                    </RecordCardContent>
                  </RecordCard>
                  <RecordCard>
                    <RecordCardContent>
                      <Typography variant="caption" color="text.secondary">
                        Home
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {teamDetails.homeRecord!.replace(
                          /(\d+)-(\d+)/,
                          "$1 - $2",
                        )}
                      </Typography>
                    </RecordCardContent>
                  </RecordCard>
                  <RecordCard>
                    <RecordCardContent>
                      <Typography variant="caption" color="text.secondary">
                        Away
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {teamDetails.awayRecord!.replace(
                          /(\d+)-(\d+)/,
                          "$1 - $2",
                        )}
                      </Typography>
                    </RecordCardContent>
                  </RecordCard>
                </Box>
              </>
            )}

          <Divider sx={{ my: 2 }} />

          <>
            <Typography variant="h6" gutterBottom>
              Upcoming Games
            </Typography>
            <Card sx={{ mb: 3, maxHeight: 220, overflowY: "auto" }}>
              {teamSchedule && teamSchedule.length > 0 && !isLoadingSchedule ? (
                <>
                  {teamSchedule.slice(0, 5).map((game) => (
                    <Box
                      key={game.id}
                      sx={{
                        p: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        "&:last-child": { borderBottom: "none" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {game.isHome ? (
                            <HomeIcon
                              sx={{ fontSize: "medium", color: "white" }}
                            />
                          ) : (
                            <FlightTakeoffIcon
                              sx={{
                                fontSize: "small",
                                color: "primary.main",
                              }}
                            />
                          )}
                          {game.opponentLogo && (
                            <Box
                              component="img"
                              src={game.opponentLogo}
                              alt={game.opponent}
                              sx={{
                                width: 40,
                                height: 40,
                                objectFit: "contain",
                              }}
                            />
                          )}
                          <Typography variant="body1" fontWeight="medium">
                            {game.opponent}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(game.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {new Date(game.date).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </>
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ borderRadius: 2, p: 3, textAlign: "center" }}
                >
                  No upcoming games scheduled
                </Typography>
              )}
            </Card>
          </>
        </Box>
      )}
    </Modal>
  );
};

export default TeamDetailsDrawer;
