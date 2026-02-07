import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/mui";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

import DashboardPage from "./pages/dashboard/DashboardPage";
import TeamsPage from "./pages/teams/TeamsPage";

const App = () => {
  return (
    // @ts-expect-error - Im not using dataProvider and requests are made directly with useQuery in the hooks, so this error can be ignored
    <Refine
      resources={[
        {
          name: "dashboard",
          list: "/",
          icon: <DashboardIcon />,
          meta: { label: "Dashboard" },
        },
        {
          name: "teams",
          list: "/teams",
          icon: <SportsBasketballIcon />,
          meta: { label: "Teams" },
        },
      ]}
      options={{ syncWithLocation: true }}
    >
      <BrowserRouter
        basename={import.meta.env.PROD ? "/sports-dashboard" : undefined}
      >
        <Routes>
          <Route
            element={
              <ThemedLayoutV2>
                <Outlet />
              </ThemedLayoutV2>
            }
          >
            <Route path="/" element={<DashboardPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Refine>
  );
};

export default App;
