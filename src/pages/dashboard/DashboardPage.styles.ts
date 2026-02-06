import { Typography, Paper } from "@mui/material";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import type { Theme } from "@mui/material/styles";

export const Container = styled(Box)`
  padding: 16px;
`;

export const Header = styled(Box)`
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 64px;
  background-color: ${(props) => (props.theme as Theme).palette.background.paper};
  z-index: 1;
`;

export const GameCard = styled(Paper)`
  padding: 24px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const MatchupBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TeamBox = styled(Box)`
  flex: 1;
  text-align: center;
`;

export const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
  object-fit: contain;
`;

export const VsText = styled(Typography)`
  margin: 0 16px;
  text-align: center;
  font-weight: bold;
  font-size: 2.125rem;
  color: ${(props) => (props.theme as Theme).palette.primary.main};
`;

export const DateText = styled(Typography)`
  text-align: center;
  color: ${(props) => (props.theme as Theme).palette.text.secondary};
  margin-top: 8px;
  font-size: 0.875rem;
`;
