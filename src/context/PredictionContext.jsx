import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_PREDICTION_HISTORY } from "../data/sampleHistory";
import { checkBackendHealth } from "../services/api";

const PredictionContext = createContext();

export function PredictionProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("staywise_history");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to load history from localStorage", e);
    }
    return INITIAL_PREDICTION_HISTORY;
  });

  const [backendStatus, setBackendStatus] = useState({
    online: false,
    modelLoaded: false,
    modelFile: "None",
    mode: "standalone",
    checked: true,
  });

  // Save history updates
  useEffect(() => {
    try {
      localStorage.setItem("staywise_history", JSON.stringify(history));
    } catch (e) {
      console.warn("Failed to save history to localStorage", e);
    }
  }, [history]);

  const addPrediction = (predictionRecord) => {
    setHistory((prev) => [predictionRecord, ...prev]);
  };

  const removePrediction = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const resetHistoryToDefault = () => {
    setHistory(INITIAL_PREDICTION_HISTORY);
    localStorage.removeItem("staywise_history");
  };

  return (
    <PredictionContext.Provider
      value={{
        history,
        addPrediction,
        removePrediction,
        resetHistoryToDefault,
        backendStatus,
        refreshBackendStatus: async () => {
          const s = await checkBackendHealth();
          setBackendStatus({ ...s, checked: true });
          return s;
        },
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
}

export function usePredictions() {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error("usePredictions must be used within a PredictionProvider");
  }
  return context;
}

