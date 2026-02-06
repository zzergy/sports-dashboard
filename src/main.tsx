// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { RefineSnackbarProvider, RefineThemes } from "@refinedev/mui";

import { store } from "./app/store/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
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
            <App />
          </RefineSnackbarProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
