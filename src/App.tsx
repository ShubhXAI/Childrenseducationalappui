import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { HomeScreen } from "./components/HomeScreen";
import { SubjectDashboard } from "./components/SubjectDashboard";
import { ExploreScreen } from "./components/ExploreScreen";
import { QuestionUI } from "./components/QuestionUI";
import { TutorialScreen } from "./components/TutorialScreen";
import { AdditionGameScreen } from "./components/AdditionGameScreen";
import { GameSelectionScreen } from "./components/GameSelectionScreen";
import { CivicSenseGameScreen } from "./components/CivicSenseGameScreen";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

type Screen = "login" | "home" | "subjects" | "explore" | "question" | "tutorial" | "additionGame" | "gameSelection" | "civicSenseGame" | "evsGame";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [selectedSubject, setSelectedSubject] = useState<string>("maths");

  const handleNavigate = (screen: string, subject?: string) => {
    setCurrentScreen(screen as Screen);
    if (subject) {
      setSelectedSubject(subject);
    }
  };

  return (
    <ThemeProvider>
      <div className="w-full h-full">
        <ThemeSwitcher />
        {currentScreen === "login" && <LoginScreen onNavigate={handleNavigate} />}
        {currentScreen === "home" && <HomeScreen onNavigate={handleNavigate} />}
        {currentScreen === "subjects" && <SubjectDashboard onNavigate={handleNavigate} />}
        {currentScreen === "explore" && <ExploreScreen onNavigate={handleNavigate} subject={selectedSubject} />}
        {currentScreen === "question" && <QuestionUI onNavigate={handleNavigate} />}
        {currentScreen === "tutorial" && <TutorialScreen onNavigate={handleNavigate} />}
        {currentScreen === "gameSelection" && <GameSelectionScreen onNavigate={handleNavigate} />}
        {currentScreen === "additionGame" && <AdditionGameScreen onNavigate={handleNavigate} />}
        {currentScreen === "civicSenseGame" && <CivicSenseGameScreen onNavigate={handleNavigate} />}
      </div>
    </ThemeProvider>
  );
}