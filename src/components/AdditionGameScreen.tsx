import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Star, Trophy } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { InteractiveAvatar, AvatarMood } from "./InteractiveAvatar";

interface AdditionGameScreenProps {
  onNavigate: (screen: string) => void;
}

interface Question {
  num1: number;
  num2: number;
  answer: number;
  fruit1: string;
  fruit2: string;
  story: string;
}

export function AdditionGameScreen({ onNavigate }: AdditionGameScreenProps) {
  const { currentTheme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState<Question>({ 
    num1: 2, 
    num2: 3, 
    answer: 5,
    fruit1: "🍊",
    fruit2: "🍎",
    story: "You're walking in a sunny garden..."
  });
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [stars, setStars] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [avatarMood, setAvatarMood] = useState<AvatarMood>("happy");
  const [avatarMessage, setAvatarMessage] = useState<string>("");

  const fruits = ["🍊", "🍎", "🍋", "🍌", "🍇", "🍓", "🍑", "🍒"];
  const fruitNames: { [key: string]: string } = {
    "🍊": "oranges",
    "🍎": "apples",
    "🍋": "lemons",
    "🍌": "bananas",
    "🍇": "grapes",
    "🍓": "strawberries",
    "🍑": "peaches",
    "🍒": "cherries"
  };

  const stories = [
    "You're walking in a sunny garden and you see 2 beautiful trees! 🌳",
    "Look! There's a magical orchard with 2 special trees! 🌳",
    "In the enchanted garden, you discover 2 fruit trees! 🌳",
    "While exploring, you find 2 amazing trees full of fruits! 🌳",
    "A gentle breeze leads you to 2 wonderful trees! 🌳"
  ];

  // Generate explanation for current question
  const getExplanation = () => {
    return `Let me help you count! 🤗\n\nOn the first tree, we have ${currentQuestion.num1} ${fruitNames[currentQuestion.fruit1]}. Let's count them together: ${Array.from({length: currentQuestion.num1}, (_, i) => i + 1).join(', ')}!\n\nOn the second tree, we have ${currentQuestion.num2} ${fruitNames[currentQuestion.fruit2]}. Count with me: ${Array.from({length: currentQuestion.num2}, (_, i) => i + 1).join(', ')}!\n\nNow, when we put them all together: ${currentQuestion.num1} + ${currentQuestion.num2} = ${currentQuestion.answer}!\n\nSo the answer is ${currentQuestion.answer} fruits in total! 🎉`;
  };

  // Generate random addition question with story
  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 5) + 1; // 1-5 fruits
    const num2 = Math.floor(Math.random() * 5) + 1; // 1-5 fruits
    const correctAnswer = num1 + num2;
    
    const fruit1 = fruits[Math.floor(Math.random() * fruits.length)];
    let fruit2 = fruits[Math.floor(Math.random() * fruits.length)];
    // Make sure second fruit is different
    while (fruit2 === fruit1) {
      fruit2 = fruits[Math.floor(Math.random() * fruits.length)];
    }

    const story = stories[Math.floor(Math.random() * stories.length)];
    
    // Generate 3 options (one correct, two wrong)
    const wrongOptions = [
      correctAnswer + Math.floor(Math.random() * 3) + 1,
      correctAnswer - Math.floor(Math.random() * 3) - 1
    ].filter(n => n > 0 && n !== correctAnswer);
    
    const allOptions = [correctAnswer, ...wrongOptions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    setCurrentQuestion({ num1, num2, answer: correctAnswer, fruit1, fruit2, story });
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setWrongAttempts(0);
    setAvatarMood("happy");
    setAvatarMessage("You can do this! 🌟");
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === currentQuestion.answer) {
      setScore(prev => prev + 10);
      setStars(prev => Math.min(prev + 1, 5));
      setAvatarMood("excited");
      setAvatarMessage("Amazing! You're so smart! 🎉");
      
      setTimeout(() => {
        setQuestionCount(prev => prev + 1);
        generateQuestion();
      }, 2500);
    } else {
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      setAvatarMood("sad");
      
      if (newWrongAttempts === 1) {
        setAvatarMessage("Oops! Try again! You can do it! 💪");
      } else if (newWrongAttempts >= 2) {
        setAvatarMessage("Let me help you understand! 🤗");
      }
      
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        if (newWrongAttempts < 2) {
          setAvatarMood("encouraging");
          setAvatarMessage("Take your time and try again! 😊");
        } else {
          setAvatarMood("thinking");
        }
      }, 1500);
    }
  };

  const handleHintRequest = () => {
    setAvatarMood("thinking");
    setAvatarMessage("Let me explain this to you! 💡");
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col" style={{
      background: currentTheme.gradients.main
    }}>
      {/* Floating decorations */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          style={{
            top: `${10 + i * 15}%`,
            left: `${5 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            transition: { duration: 3 + i * 0.5, repeat: Infinity }
          }}
        >
          {currentTheme.decorations.floating[i % currentTheme.decorations.floating.length]}
        </motion.div>
      ))}

      {/* Interactive Avatar */}
      <InteractiveAvatar
        mood={avatarMood}
        message={avatarMessage}
        showHintButton={wrongAttempts >= 1}
        onHintRequest={handleHintRequest}
        explanation={getExplanation()}
        wrongAttempts={wrongAttempts}
      />

      {/* Header */}
      <div className="p-4 flex items-center justify-between" style={{
        background: "rgba(255,255,255,0.9)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => onNavigate("gameSelection")}
            className="p-3 text-white"
            style={{
              background: currentTheme.gradients.button1,
              borderRadius: "50%",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
              border: "3px solid white"
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <div>
            <h1 className="text-2xl font-bold" style={{
              background: currentTheme.gradients.header,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Garden Adventure! 🌳
            </h1>
            <p className="text-sm text-gray-600">Question {questionCount + 1}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Stars */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-7 h-7 ${i < stars ? 'fill-yellow-400 text-yellow-500' : 'text-gray-300'}`}
              />
            ))}
          </div>

          {/* Score */}
          <div className="px-4 py-2 rounded-full text-white font-bold" style={{
            background: "linear-gradient(145deg, #FFD93D 0%, #FFA500 100%)",
            boxShadow: "0 4px 10px rgba(255, 165, 0, 0.4)"
          }}>
            <Trophy className="w-5 h-5 inline mr-1" />
            {score}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-around p-8 max-w-6xl mx-auto w-full">
        {/* Story text */}
        <motion.div
          className="text-center mb-4"
          key={`story-${questionCount}`}
          initial={{ scale: 0.8, opacity: 0, y: -30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 10 }}
        >
          <div className="inline-block px-8 py-4 bg-white rounded-3xl shadow-lg" style={{
            border: "4px solid rgba(126, 211, 33, 0.3)"
          }}>
            <p className="text-2xl font-bold text-gray-700">
              {currentQuestion.story}
            </p>
          </div>
        </motion.div>

        {/* Trees with fruits */}
        <div className="flex justify-center gap-16 mb-6">
          {/* First Tree */}
          <motion.div
            className="relative"
            initial={{ scale: 0, x: -100 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ type: "spring", delay: 0.3 }}
          >
            <div className="text-center">
              {/* Tree crown */}
              <div className="relative w-48 h-48 flex items-center justify-center" style={{
                background: "radial-gradient(circle at 30% 30%, #7ED321 0%, #5FA019 100%)",
                borderRadius: "50%",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2), inset -5px -5px 15px rgba(0,0,0,0.2), inset 5px 5px 15px rgba(255,255,255,0.3)"
              }}>
                {/* Fruits on tree */}
                <div className="flex flex-wrap justify-center gap-2 p-4">
                  {[...Array(currentQuestion.num1)].map((_, i) => (
                    <motion.div
                      key={`fruit1-${i}`}
                      className="text-4xl"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    >
                      {currentQuestion.fruit1}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Tree trunk */}
              <div className="mx-auto w-12 h-16" style={{
                background: "linear-gradient(180deg, #8B4513 0%, #654321 100%)",
                borderRadius: "0 0 10px 10px",
                boxShadow: "inset -3px 0 6px rgba(0,0,0,0.3)"
              }} />

              {/* Label */}
              <motion.div
                className="mt-3 px-4 py-2 bg-white rounded-full shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-xl font-bold" style={{ color: "#5FA019" }}>
                  {currentQuestion.num1} {fruitNames[currentQuestion.fruit1]}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Plus sign */}
          <motion.div
            className="self-center text-6xl font-bold text-white"
            style={{ textShadow: "0 4px 10px rgba(0,0,0,0.3)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            ➕
          </motion.div>

          {/* Second Tree */}
          <motion.div
            className="relative"
            initial={{ scale: 0, x: 100 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ type: "spring", delay: 0.4 }}
          >
            <div className="text-center">
              {/* Tree crown */}
              <div className="relative w-48 h-48 flex items-center justify-center" style={{
                background: "radial-gradient(circle at 30% 30%, #7ED321 0%, #5FA019 100%)",
                borderRadius: "50%",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2), inset -5px -5px 15px rgba(0,0,0,0.2), inset 5px 5px 15px rgba(255,255,255,0.3)"
              }}>
                {/* Fruits on tree */}
                <div className="flex flex-wrap justify-center gap-2 p-4">
                  {[...Array(currentQuestion.num2)].map((_, i) => (
                    <motion.div
                      key={`fruit2-${i}`}
                      className="text-4xl"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                    >
                      {currentQuestion.fruit2}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Tree trunk */}
              <div className="mx-auto w-12 h-16" style={{
                background: "linear-gradient(180deg, #8B4513 0%, #654321 100%)",
                borderRadius: "0 0 10px 10px",
                boxShadow: "inset -3px 0 6px rgba(0,0,0,0.3)"
              }} />

              {/* Label */}
              <motion.div
                className="mt-3 px-4 py-2 bg-white rounded-full shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <p className="text-xl font-bold" style={{ color: "#5FA019" }}>
                  {currentQuestion.num2} {fruitNames[currentQuestion.fruit2]}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Question */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="inline-block px-8 py-4 rounded-3xl" style={{
            background: "linear-gradient(145deg, #FFD93D 0%, #FFA500 100%)",
            boxShadow: "0 10px 25px rgba(255, 165, 0, 0.4)",
            border: "4px solid rgba(255,255,255,0.6)"
          }}>
            <p className="text-3xl font-bold text-white" style={{
              textShadow: "0 3px 8px rgba(0,0,0,0.3)"
            }}>
              How many fruits in total? 🤔
            </p>
          </div>
        </motion.div>

        {/* Answer options */}
        <motion.div
          className="flex justify-center gap-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {options.map((option) => {
            const isCorrect = option === currentQuestion.answer;
            const isSelected = selectedAnswer === option;
            
            return (
              <motion.button
                key={option}
                onClick={() => !showFeedback && handleAnswer(option)}
                className="text-6xl font-bold text-white relative"
                style={{
                  width: "150px",
                  height: "150px",
                  background: showFeedback && isSelected
                    ? isCorrect
                      ? "linear-gradient(145deg, #7ED321 0%, #5FA019 100%)"
                      : "linear-gradient(145deg, #E74C3C 0%, #C0392B 100%)"
                    : "linear-gradient(145deg, #FF8E53 0%, #FE6B8B 100%)",
                  borderRadius: "50%",
                  boxShadow: `
                    0 20px 40px rgba(0,0,0,0.25),
                    inset 0 -8px 15px rgba(0,0,0,0.2),
                    inset 0 8px 15px rgba(255,255,255,0.4)
                  `,
                  border: isSelected ? "8px solid white" : "6px solid rgba(255,255,255,0.5)",
                  textShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  cursor: showFeedback ? "default" : "pointer",
                }}
                whileHover={!showFeedback ? { scale: 1.15, y: -10 } : {}}
                whileTap={!showFeedback ? { scale: 0.95 } : {}}
                animate={showFeedback && isSelected && isCorrect ? {
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 0.5, repeat: 3 }
                } : {}}
              >
                {option}
                
                {showFeedback && isSelected && (
                  <motion.div
                    className="absolute -top-4 -right-4 text-5xl"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                  >
                    {isCorrect ? "✅" : "❌"}
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Feedback message */}
        {showFeedback && selectedAnswer === currentQuestion.answer && (
          <motion.div
            className="text-center"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
          >
            <div className="text-5xl font-bold" style={{
              background: "linear-gradient(135deg, #FFD93D 0%, #7ED321 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 6px 15px rgba(0,0,0,0.2)"
            }}>
              🎉 Perfect! You counted {currentQuestion.answer} fruits! +10 points!
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom grass decoration */}
      <div className="absolute bottom-0 w-full h-24" style={{
        background: `linear-gradient(180deg, transparent 0%, ${currentTheme.colors.secondary} 100%)`,
        borderRadius: "50% 50% 0 0 / 30% 30% 0 0",
      }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-2 text-4xl"
            style={{ left: `${i * 12 + 5}%` }}
            animate={{
              rotate: [-5, 5, -5],
              transition: { duration: 2 + i * 0.2, repeat: Infinity }
            }}
          >
            {currentTheme.decorations.ground[i % currentTheme.decorations.ground.length]}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
