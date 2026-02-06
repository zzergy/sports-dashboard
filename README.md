# Sports Dashboard

A React + TypeScript sports dashboard built with Refine.dev, Material-UI (MUI), React Query, and Redux Toolkit using the ESPN public API. View live scores, teams, and game statistics for NBA and NFL leagues.

## Tech Stack

| Technology                          | Version |
| ----------------------------------- | ------- |
| React                               | 18.3.1  |
| TypeScript                          | 5.9.3   |
| Refine.dev                          | 4.46.1  |
| Material-UI                         | 5.8.6   |
| Emotion                             | 11.14+  |
| Vite                                | 7.2.4   |
| React Query (@tanstack/react-query) | 4.36.1  |
| Redux Toolkit                       | 2.11.2  |

## Features

- **League Selection**: Switch between NBA and NFL leagues with a dropdown selector
- **Live Scoreboard**: View recent games with team logos, scores, and game status
- **Game Details**: Click any game to view detailed statistics in a modal
- **Teams Directory**: Browse all teams with logos and search functionality
- **Team Details**: View team records, standings, venue info, and upcoming schedule
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile
- **Loading & Error States**: Proper handling of API loading, errors, and empty states

## Setup Instructions

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sports-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The built files will be in the `dist/` directory.

### Linting

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## Architecture

### Project Structure

```
src/
├── app/
│   ├── providers/
│   │   └── queryProvider.tsx    # React Query provider setup
│   ├── slices/
│   │   └── leagueSlice.ts       # Redux slice for league selection
│   └── store/
│       └── store.ts             # Redux store configuration
├── hooks/
│   ├── useScoreboard.ts         # Custom hook for scoreboard data
│   ├── useGameSummary.ts       # Custom hook for game summary/stats
│   ├── useTeams.ts              # Custom hook for teams list
│   ├── useTeamDetails.ts        # Custom hook for team details
│   └── useTeamSchedule.ts       # Custom hook for team schedule
├── pages/
│   ├── dashboard/
│   │   ├── DashboardPage.tsx    # Main scoreboard page
│   │   ├── DashboardPage.styles.ts  # Emotion-styled components
│   │   └── GameDetailsModal.tsx # Game details modal
│   └── teams/
│       ├── TeamsPage.tsx        # Teams listing page
│       └── TeamsDrawer.tsx      # Team details drawer
├── shared/
│   ├── LeagueSelector.tsx       # League dropdown component
│   └── Modal.tsx                # Reusable modal component
├── types.ts                     # TypeScript type definitions
├── App.tsx                      # Main app component with routing
└── main.tsx                     # Entry point with providers
```

### State Management

The application uses a hybrid state management approach:

- **React Query (@tanstack/react-query)**: Manages server state (API data, caching, stale-time)
  - Scoreboard data
  - Game summaries
  - Teams list
  - Team details
  - Team schedules

- **Redux Toolkit**: Manages global UI state only
  - Currently selected league (NBA/NFL)
  - Derived sport type (basketball/football)

## API Usage

### ESPN Public API

This application uses the [ESPN Public API](https://github.com/pseudo-r/Public-ESPN-API), which is an undocumented but widely-used set of endpoints that power ESPN's website and mobile apps.


***NOTE:*** APIs are unofficial and may change without notice

### Endpoints Used

| Endpoint      | Purpose                          | URL                                                                                      |
| ------------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| Scoreboard    | Get recent games for a league    | `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/scoreboard`              |
| Teams         | Get all teams for a league       | `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/teams`                   |
| Game Summary  | Get game statistics and boxscore | `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/summary?event={gameId}`  |
| Team Details  | Get team info, records, colors   | `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/teams/{teamId}`          |
| Team Schedule | Get team's upcoming games        | `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/teams/{teamId}/schedule` |

### URL Patterns

```
# NBA
/sports/basketball/nba/{resource}

# NFL
/sports/football/nfl/{resource}
```

### Example API Calls

#### Get NBA scoreboard
```bash
curl "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
```
#### Get NFL teams
```bash
curl "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
```
#### Get game summary
```bash
curl "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=401612825"
```
#### Get team details
```bash
curl "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/1"
```
#### Get team schedule
```bash
curl "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/1/schedule"
```

## Additional Resources

- [Refine.dev Documentation](https://refine.dev/docs/)
- [Material-UI Documentation](https://mui.com/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [ESPN Public API Docs](https://github.com/pseudo-r/Public-ESPN-API)
