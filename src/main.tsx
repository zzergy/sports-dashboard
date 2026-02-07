// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { RefineSnackbarProvider, RefineThemes } from "@refinedev/mui";

import { store } from "./app/store/store";
import { AppQueryProvider } from "./app/providers/queryProvider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* basename for GitHub Pages deployment only */}

    <Provider store={store}>
      <ThemeProvider theme={RefineThemes.BlueDark}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ".MuiDrawer-root .MuiDrawer-paper": {
              transition: "width 0.3s ease-in-out",
            },
            ".refine-themed-layout-header-actions": {
              display: "none",
            },
            html: { WebkitFontSmoothing: "auto" },
          }}
        />
        <RefineSnackbarProvider>
          <AppQueryProvider>
            <App />
          </AppQueryProvider>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
