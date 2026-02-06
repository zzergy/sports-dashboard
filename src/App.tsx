import { Routes, Route, Outlet } from "react-router-dom";
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/mui";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

import DashboardPage from "./pages/dashboard/DashboardPage";
import TeamsPage from "./pages/teams/TeamsPage";

const App = () => {
  return (
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
    </Refine>
  );
};

export default App;
