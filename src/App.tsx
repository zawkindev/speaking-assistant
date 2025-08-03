import React from "react";
import Summary from "./Summary";
import type { AppState, Recording } from "./types";
import { useAppContext } from "./AppContext";
import ModeSelect from "./ModeSelect";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import AppProvider from "./AppProvider";
import Practice from "./Practice";

// Main App Component with Context Wrapper
const AppContent: React.FC = () => {
  const { currentPage } = useAppContext();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <ModeSelect />;
      case "practice":
        return <Practice />;
      case "part1":
        return <Part1 />;
      case "part2":
        return <Part2 />;
      case "part3":
        return <Part3 />;
      case "summary":
        return <Summary />;
      default:
        return <ModeSelect />;
    }
  };

  return <div className="min-h-screen">{renderCurrentPage()}</div>;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
