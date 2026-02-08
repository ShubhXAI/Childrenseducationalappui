import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Star } from "lucide-react";
import { Giggles } from "./Giggles";
import { NumberRecognition } from "./interactive-templates/NumberRecognition";
import { VisualCounting } from "./interactive-templates/VisualCounting";
import { ShapeChoice } from "./interactive-templates/ShapeChoice";
import { ShapeMatchingBoard } from "./interactive-templates/ShapeMatchingBoard";
import { BigVsSmallChoice } from "./interactive-templates/BigVsSmallChoice";
import { DragDropCounting } from "./interactive-templates/DragDropCounting";
import { MatchNumberToDots } from "./interactive-templates/MatchNumberToDots";
import { PopTheNumber } from "./interactive-templates/PopTheNumber";
import { TraceTheNumber } from "./interactive-templates/TraceTheNumber";
import { TapAndCount } from "./interactive-templates/TapAndCount";
import { CorrectOrNot } from "./interactive-templates/CorrectOrNot";

interface MathQuestionsScreenProps {
  onNavigate: (screen: string) => void;
  catalog: string;
}

// Question type definitions
type QuestionType = 
  | { type: "numberRecognition"; question: string; correctAnswer: number; options: number[]; }
  | { type: "matchNumberToDots"; dotCount: number; numberOptions: number[]; }
  | { type: "popTheNumber"; targetNumber: number; numberOptions: number[]; }
  | { type: "traceTheNumber"; targetNumber: number; }
  | { type: "visualCounting"; question: string; objectEmoji: string; objectCount: number; correctAnswer: number; options: number[]; }
  | { type: "dragDrop"; targetNumber: number; objectEmoji: string; objectName: string; }
  | { type: "tapAndCount"; objectEmoji: string; objectCount: number; }
  | { type: "correctOrNot"; objectEmoji: string; displayCount: number; actualCount: number; }
  | { type: "shapeChoice"; question: string; correctShape: "circle" | "square" | "triangle" | "rectangle"; }
  | { type: "shapeMatch"; targetShape: "circle" | "square" | "triangle" | "rectangle"; targetColor: string; }
  | { type: "bigSmall"; objectEmoji: string; objectName: string; correctAnswer: "big" | "small"; };

export function MathQuestionsScreen({ onNavigate, catalog }: MathQuestionsScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  // Generate questions based on catalog
  useEffect(() => {
    const generatedQuestions = generateQuestionsForCatalog(catalog);
    setQuestions(generatedQuestions);
  }, [catalog]);

  const generateQuestionsForCatalog = (catalogId: string): QuestionType[] => {
    switch (catalogId) {
      case "numberFriends":
        // Number Recognition - 5 Different Techniques
        return [
          // 1. Tap the Number (Visual Choice)
          { type: "numberRecognition", question: "Tap number 5 👆", correctAnswer: 5, options: [3, 5, 7, 9] },
          
          // 2. Match Number to Dots
          { type: "matchNumberToDots", dotCount: 4, numberOptions: [3, 4, 6] },
          
          // 3. Pop the Correct Number
          { type: "popTheNumber", targetNumber: 7, numberOptions: [5, 7, 8, 10] },
          
          // 4. Match Number to Dots (another one)
          { type: "matchNumberToDots", dotCount: 6, numberOptions: [4, 6, 8] },
          
          // 5. Trace or Highlight the Number
          { type: "traceTheNumber", targetNumber: 3 }
        ];
      
      case "countWithMe":
        // Counting Physical Objects - 5 Different Techniques
        return [
          // 1. Count & Select (Tap Count)
          { type: "visualCounting", question: "How many apples are there? 🍎", objectEmoji: "🍎", objectCount: 5, correctAnswer: 5, options: [4, 5, 6] },
          
          // 2. Drag Objects into a Basket
          { type: "dragDrop", targetNumber: 4, objectEmoji: "⭐", objectName: "stars" },
          
          // 3. One-by-One Counting Animation
          { type: "tapAndCount", objectEmoji: "🎈", objectCount: 3 },
          
          // 4. Tap and Count (another one)
          { type: "tapAndCount", objectEmoji: "🐟", objectCount: 6 },
          
          // 5. Find Extra / Missing Objects
          { type: "correctOrNot", objectEmoji: "🍓", displayCount: 4, actualCount: 5 }
        ];
      
      case "shapeMatch":
        // Shapes - Matching Shapes
        return [
          {
            type: "shapeMatch",
            targetShape: "circle",
            targetColor: "#FF6B6B"
          },
          { type: "shapeChoice", question: "Which one is a Triangle? 🔺", correctShape: "triangle" },
          {
            type: "shapeMatch",
            targetShape: "square",
            targetColor: "#4A90E2"
          },
          { type: "shapeChoice", question: "Find the Rectangle 📐", correctShape: "rectangle" },
          {
            type: "shapeMatch",
            targetShape: "circle",
            targetColor: "#FF6EC7"
          },
          {
            type: "shapeMatch",
            targetShape: "triangle",
            targetColor: "#FFD93D"
          }
        ];
      
      case "bigOrSmall":
        // Sizes - Big or Small
        return [
          { type: "bigSmall", objectEmoji: "🐘", objectName: "one", correctAnswer: "big" },
          { type: "bigSmall", objectEmoji: "⚽", objectName: "ball", correctAnswer: "small" },
          { type: "bigSmall", objectEmoji: "🍉", objectName: "fruit", correctAnswer: "big" },
          { type: "bigSmall", objectEmoji: "🧸", objectName: "toy", correctAnswer: "small" },
          { type: "bigSmall", objectEmoji: "🏠", objectName: "house", correctAnswer: "big" }
        ];
      
      default:
        return [];
    }
  };

  const handleQuestionComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 10);
      setStars(prev => Math.min(prev + 1, 5));
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // All questions complete! Show celebration and go back
        setTimeout(() => {
          onNavigate("mathCatalog");
        }, 2000);
      }
    }, 500);
  };

  if (questions.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-4xl">Loading...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const catalogTitles: { [key: string]: string } = {
    numberFriends: "Number Friends 🔢",
    countWithMe: "Count with Me 🍎",
    shapeMatch: "Shape Match 🔷",
    bigOrSmall: "Big or Small 🐘"
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col" style={{
      background: "linear-gradient(180deg, #FFE66D 0%, #A8E063 50%, #87CEEB 100%)"
    }}>
      {/* Floating decorations */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute text-4xl opacity-30"
          style={{
            top: `${10 + (i % 4) * 20}%`,
            left: `${5 + i * 9}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            transition: { duration: 3 + i * 0.5, repeat: Infinity }
          }}
        >
          {["⭐", "🎈", "✨", "🌟"][i % 4]}
        </motion.div>
      ))}

      {/* Header */}
      <div className="p-6 flex items-center justify-between relative z-10" style={{
        background: "rgba(255,255,255,0.95)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => onNavigate("mathCatalog")}
            className="p-4 text-white"
            style={{
              background: "linear-gradient(145deg, #FF6B6B 0%, #FE8C5B 100%)",
              borderRadius: "50%",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
              border: "4px solid white"
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-7 h-7" />
          </motion.button>
          
          <div>
            <h1 className="text-3xl font-bold" style={{
              background: "linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #7ED321 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {catalogTitles[catalog]}
            </h1>
            <p className="text-lg text-gray-600 font-semibold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Stars */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-10 h-10 ${i < stars ? 'fill-yellow-400 text-yellow-500' : 'text-gray-300'}`}
              />
            ))}
          </div>

          {/* Score */}
          <div className="px-6 py-3 rounded-full text-white font-bold text-2xl" style={{
            background: "linear-gradient(145deg, #FFD93D 0%, #FFA500 100%)",
            boxShadow: "0 4px 10px rgba(255, 165, 0, 0.4)",
            border: "4px solid white"
          }}>
            ⭐ {score}
          </div>

          <Giggles size={90} animate={true} />
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 relative z-10">
        {currentQuestion.type === "numberRecognition" && (
          <NumberRecognition
            question={currentQuestion.question}
            correctAnswer={currentQuestion.correctAnswer}
            options={currentQuestion.options}
            onComplete={handleQuestionComplete}
          />
        )}

        {currentQuestion.type === "matchNumberToDots" && (
          <MatchNumberToDots
            dotCount={currentQuestion.dotCount}
            numberOptions={currentQuestion.numberOptions}
            onComplete={handleQuestionComplete}
          />
        )}

        {currentQuestion.type === "popTheNumber" && (
          <PopTheNumber
            targetNumber={currentQuestion.targetNumber}
            numberOptions={currentQuestion.numberOptions}
            onComplete={handleQuestionComplete}
          />
        )}

        {currentQuestion.type === "traceTheNumber" && (
          <TraceTheNumber
            targetNumber={currentQuestion.targetNumber}
            onComplete={handleQuestionComplete}
          />
        )}

        {currentQuestion.type === "visualCounting" && (
          <VisualCounting
            question={currentQuestion.question}
            objectEmoji={currentQuestion.objectEmoji}
            objectCount={currentQuestion.objectCount}
            correctAnswer={currentQuestion.correctAnswer}
            options={currentQuestion.options}
            onComplete={handleQuestionComplete}
          />
        )}

        {currentQuestion.type === "tapAndCount" && (
          <TapAndCount
            objects={{ emoji: currentQuestion.objectEmoji, count: currentQuestion.objectCount }}
            onComplete={handleQuestionComplete}
          />
        )}

        {currentQuestion.type === "correctOrNot" && (
          <CorrectOrNot
            objectEmoji={currentQuestion.objectEmoji}
            displayCount={currentQuestion.displayCount}
            actualCount={currentQuestion.actualCount}
            onComplete={handleQuestionComplete}
          />
        )}

        {currentQuestion.type === "shapeChoice" && (
          <ShapeChoice
            question={currentQuestion.question}
            correctShape={currentQuestion.correctShape}
            onComplete={handleQuestionComplete}
          />
        )}

        {currentQuestion.type === "shapeMatch" && (
          <ShapeMatchingBoard
            targetShape={currentQuestion.targetShape}
            targetColor={currentQuestion.targetColor}
            onComplete={handleQuestionComplete}
          />
        )}

        {currentQuestion.type === "bigSmall" && (
          <BigVsSmallChoice
            objectEmoji={currentQuestion.objectEmoji}
            objectName={currentQuestion.objectName}
            correctAnswer={currentQuestion.correctAnswer}
            onComplete={handleQuestionComplete}
          />
        )}

        {currentQuestion.type === "dragDrop" && (
          <DragDropCounting
            targetNumber={currentQuestion.targetNumber}
            objectEmoji={currentQuestion.objectEmoji}
            objectName={currentQuestion.objectName}
            onComplete={handleQuestionComplete}
          />
        )}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gray-200 z-10">
        <motion.div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, #FFD93D 0%, #7ED321 100%)",
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
