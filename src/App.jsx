import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { PredictionProvider } from "./context/PredictionContext";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import PredictionStudioPage from "./pages/PredictionStudioPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ModelInsightsPage from "./pages/ModelInsightsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <ThemeProvider>
      <PredictionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="prediction" element={<PredictionStudioPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="model-insights" element={<ModelInsightsPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PredictionProvider>
    </ThemeProvider>
  );
}

