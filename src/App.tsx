import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { AgeSelectionScreen } from "./components/AgeSelectionScreen";
import { MathMagicCatalog } from "./components/MathMagicCatalog";
import { MathQuestionsScreen } from "./components/MathQuestionsScreen";
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

type Screen = "login" | "ageSelect" | "home" | "mathCatalog" | "mathQuestions" | "subjects" | "explore" | "question" | "tutorial" | "additionGame" | "gameSelection" | "civicSenseGame";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [selectedSubject, setSelectedSubject] = useState<string>("maths");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedCatalog, setSelectedCatalog] = useState<string>("");

  const handleNavigate = (screen: string, param?: string) => {
    if (screen === "mathQuestions") {
      setSelectedCatalog(param || "");
    }
    if (screen === "explore") {
      setSelectedSubject(param || "maths");
    }
    setCurrentScreen(screen as Screen);
  };

  const handleAgeSelect = (ageGroup: string) => {
    setSelectedAge(ageGroup);
    setCurrentScreen("home");
  };

  return (
    <ThemeProvider>
      <div className="w-full h-full">
        <ThemeSwitcher />
        {currentScreen === "login" && <LoginScreen onNavigate={handleNavigate} />}
        {currentScreen === "ageSelect" && <AgeSelectionScreen onSelectAge={handleAgeSelect} />}
        {currentScreen === "home" && <HomeScreen onNavigate={handleNavigate} />}
        {currentScreen === "mathCatalog" && <MathMagicCatalog onNavigate={handleNavigate} />}
        {currentScreen === "mathQuestions" && <MathQuestionsScreen onNavigate={handleNavigate} catalog={selectedCatalog} />}
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
