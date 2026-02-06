export interface Competitor {
  homeAway: "home" | "away";
  team: {
    id: string;
    displayName: string;
    logo?: string;
  };
  score: string;
  records?: {
    summary: string;
  }[];
}

export interface Competition {
  competitors: Competitor[];
  venue?: {
    fullName?: string;
  };
  broadcasts?: {
    name: string;
  }[];
}

export interface Event {
  id: string;
  date: string;
  competitions: Competition[];
  status?: {
    type?: {
      detail?: string;
    };
  };
}

export interface ScoreboardResponse {
  events: Event[];
}

export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  status?: string;
  venue?: string;
  broadcasters?: string;
  homeRecord?: string;
  awayRecord?: string;
  homeLogo?: string;
  awayLogo?: string;
}
//  ----------------------------------

export interface TeamData {
  id: string;
  name: string;
  logo: string;
}

export interface TeamsAPIResponse {
  sports: {
    leagues: {
      teams: {
        team: {
          id: string;
          displayName: string;
          abbreviation: string;
          location: string;
          logos?: { href: string }[];
        };
      }[];
    }[];
  }[];
}

// ----------------------------------

// src/types/espn.ts (add this if not already)
export interface TeamStats {
  teamId: string;
  score: number;
  stats: Record<string, unknown>;
}

export interface GameSummaryData {
  homeStats: TeamStats;
  awayStats: TeamStats;
  plays: unknown[];
}

export interface TeamDetailsAPIResponse {
  team: {
    id: string;
    displayName: string;
    abbreviation: string;
    location: string;
    name: string;
    color: string;
    alternateColor: string;
    record?: {
      items: Array<{
        type: string;
        summary: string;
      }>;
    };
    franchise?: {
      venue?: {
        fullName: string;
        address?: {
          city: string;
          state: string;
        };
      };
    };
    standingSummary?: string;
  };
}

export interface TeamDetails {
  color: string;
  standingSummary: string;
  record: string;
  homeRecord?: string;
  awayRecord?: string;
  venue?: string;
}

export interface TeamScheduleAPIResponse {
  team: {
    id: string;
    displayName: string;
  };
  events?: Array<{
    id: string;
    date: string;
    name: string;
    shortName: string;
    competitions: Array<{
      competitors: Array<{
        homeAway: "home" | "away";
        team: {
          id: string;
          displayName: string;
          logo?: string;
        };
        score?: string;
      }>;
      venue?: {
        fullName: string;
      };
      status?: {
        type: {
          description: string;
          detail: string;
        };
      };
    }>;
  }>;
}

export interface TeamSchedule {
  id: string;
  date: string;
  opponent: string;
  opponentLogo?: string;
  isHome: boolean;
  venue?: string;
  status?: string;
}
