import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Star, Trophy } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { InteractiveAvatar, AvatarMood } from "./InteractiveAvatar";

interface CivicSenseGameScreenProps {
  onNavigate: (screen: string) => void;
}

interface Question {
  scenario: string;
  question: string;
  correctAnswer: string;
  options: string[];
  emoji: string;
  sceneEmojis: string[];
  explanation: string;
}

export function CivicSenseGameScreen({ onNavigate }: CivicSenseGameScreenProps) {
  const { currentTheme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [stars, setStars] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [avatarMood, setAvatarMood] = useState<AvatarMood>("happy");
  const [avatarMessage, setAvatarMessage] = useState<string>("");

  const civicQuestions: Question[] = [
    {
      scenario: "You're eating a yummy ice cream in the park! 🍦",
      question: "Where should you throw the wrapper?",
      correctAnswer: "In the dustbin",
      options: ["On the ground", "In the dustbin", "In the pond"],
      emoji: "🗑️",
      sceneEmojis: ["🌳", "🏞️", "🧺", "🍦"],
      explanation: "Great question! 🌍 When we throw trash on the ground or in the pond, it makes our beautiful parks dirty and can hurt animals. The dustbin is the right place! It keeps our environment clean and safe for everyone. Always remember: trash goes in the bin! 🗑️✨"
    },
    {
      scenario: "You see an old person trying to cross the busy road! 👴",
      question: "What should you do?",
      correctAnswer: "Help them cross safely",
      options: ["Ignore them", "Help them cross safely", "Run away"],
      emoji: "🚸",
      sceneEmojis: ["🚗", "🚦", "👴", "🛣️"],
      explanation: "You have a kind heart! 💙 When we see someone who needs help, especially elderly people, we should help them. They might have trouble seeing or walking fast. By helping them cross the road safely, we show kindness and make the world a better place! 🤝"
    },
    {
      scenario: "You're in the library and want to talk to your friend! 📚",
      question: "How should you behave?",
      correctAnswer: "Speak softly",
      options: ["Speak softly", "Shout loudly", "Run around"],
      emoji: "🤫",
      sceneEmojis: ["📚", "📖", "🤓", "🏛️"],
      explanation: "Perfect thinking! 📚 In the library, people are reading and studying. They need quiet to concentrate. When we speak softly or whisper, we respect others and help them focus. Libraries are peaceful places where everyone can enjoy books! 🤫✨"
    },
    {
      scenario: "The bathroom tap is dripping water! 💧",
      question: "What should you do?",
      correctAnswer: "Turn it off properly",
      options: ["Leave it dripping", "Turn it off properly", "Play with water"],
      emoji: "🚰",
      sceneEmojis: ["💧", "🚿", "🚰", "💦"],
      explanation: "You're so thoughtful! 💧 Water is precious and not everyone has enough water. When we waste water, we're wasting something very important. By turning off the tap properly, we save water for people, animals, and plants who need it! 🌍💙"
    },
    {
      scenario: "You're waiting in line to buy tickets! 🎫",
      question: "What should you do?",
      correctAnswer: "Wait patiently in line",
      options: ["Push everyone", "Wait patiently in line", "Cut the line"],
      emoji: "🙋",
      sceneEmojis: ["🎫", "👥", "🎪", "⏰"],
      explanation: "Excellent manners! 🌟 When we wait in line, we show respect for others who came before us. Everyone wants to get their turn, and waiting patiently means everyone gets a fair chance. It's the polite and kind way to behave! 🤝"
    },
    {
      scenario: "Your friend is feeling sad at school! 😢",
      question: "What should you do?",
      correctAnswer: "Comfort and help them",
      options: ["Laugh at them", "Comfort and help them", "Ignore them"],
      emoji: "🤗",
      sceneEmojis: ["😢", "🏫", "👫", "💝"],
      explanation: "You have such a caring heart! 💝 Friends help each other, especially when someone is sad. A kind word, a hug, or just listening can make someone feel so much better. Being a good friend means being there when someone needs you! 🤗✨"
    },
    {
      scenario: "You see beautiful flowers in the public garden! 🌺",
      question: "What should you do?",
      correctAnswer: "Look and admire them",
      options: ["Pluck them all", "Look and admire them", "Step on them"],
      emoji: "🌸",
      sceneEmojis: ["🌺", "🌻", "🦋", "🌿"],
      explanation: "Perfect choice! 🌺 Flowers in public gardens are for everyone to enjoy! When we leave them growing, many people can see their beauty, and bees and butterflies can visit them too. We can take pictures instead of picking them! 📸🦋"
    },
    {
      scenario: "The lights are on but nobody is in the room! 💡",
      question: "What should you do?",
      correctAnswer: "Turn off the lights",
      options: ["Leave them on", "Turn off the lights", "Break the bulb"],
      emoji: "💡",
      sceneEmojis: ["💡", "🔌", "🏠", "⚡"],
      explanation: "Smart thinking! 💡 Electricity costs money and uses energy from our planet. When we turn off lights that aren't needed, we save energy and help protect the Earth! It's a simple way to be eco-friendly! 🌍⚡"
    }
  ];

  const generateQuestion = () => {
    const randomQuestion = civicQuestions[Math.floor(Math.random() * civicQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setWrongAttempts(0);
    setAvatarMood("happy");
    setAvatarMessage("Think about what's the right thing to do! 😊");
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 10);
      setStars(prev => Math.min(prev + 1, 5));
      setAvatarMood("excited");
      setAvatarMessage("You're such a good citizen! 🎉");
      
      setTimeout(() => {
        setQuestionCount(prev => prev + 1);
        generateQuestion();
      }, 2500);
    } else {
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      setAvatarMood("sad");
      
      if (newWrongAttempts === 1) {
        setAvatarMessage("Hmm, think again! 🤔");
      } else if (newWrongAttempts >= 2) {
        setAvatarMessage("Let me explain why! 💡");
      }
      
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        if (newWrongAttempts < 2) {
          setAvatarMood("encouraging");
          setAvatarMessage("You can do it! Try again! 💪");
        } else {
          setAvatarMood("thinking");
        }
      }, 1500);
    }
  };

  const handleHintRequest = () => {
    setAvatarMood("thinking");
    setAvatarMessage("Here's why the right answer matters! 📚");
  };

  if (!currentQuestion) return null;

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
        explanation={currentQuestion.explanation}
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
              World Tour! 🌍
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
        {/* Scenario text */}
        <motion.div
          className="text-center mb-6"
          key={`scenario-${questionCount}`}
          initial={{ scale: 0.8, opacity: 0, y: -30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 10 }}
        >
          <div className="inline-block px-10 py-6 bg-white rounded-3xl shadow-lg" style={{
            border: "4px solid rgba(74, 144, 226, 0.3)"
          }}>
            <p className="text-3xl font-bold text-gray-700">
              {currentQuestion.scenario}
            </p>
          </div>
        </motion.div>

        {/* Scene illustration */}
        <motion.div
          className="flex justify-center gap-6 mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="relative px-12 py-10 rounded-3xl" style={{
            background: "linear-gradient(145deg, #FFFFFF 0%, #F0F0F0 100%)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
            border: "5px solid rgba(255,255,255,0.8)"
          }}>
            <div className="flex items-center justify-center gap-6">
              {currentQuestion.sceneEmojis.map((emoji, i) => (
                <motion.div
                  key={i}
                  className="text-7xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-block px-8 py-4 rounded-3xl" style={{
            background: "linear-gradient(145deg, #FF6EC7 0%, #A881E8 100%)",
            boxShadow: "0 10px 25px rgba(168, 129, 232, 0.4)",
            border: "4px solid rgba(255,255,255,0.6)"
          }}>
            <p className="text-3xl font-bold text-white" style={{
              textShadow: "0 3px 8px rgba(0,0,0,0.3)"
            }}>
              {currentQuestion.question}
            </p>
          </div>
        </motion.div>

        {/* Answer options */}
        <motion.div
          className="flex justify-center gap-6 flex-wrap max-w-4xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {currentQuestion.options.map((option, index) => {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = selectedAnswer === option;
            
            return (
              <motion.button
                key={index}
                onClick={() => !showFeedback && handleAnswer(option)}
                className="text-xl font-bold text-white relative px-8 py-6 min-w-[280px]"
                style={{
                  background: showFeedback && isSelected
                    ? isCorrect
                      ? "linear-gradient(145deg, #7ED321 0%, #5FA019 100%)"
                      : "linear-gradient(145deg, #E74C3C 0%, #C0392B 100%)"
                    : "linear-gradient(145deg, #FF8E53 0%, #FE6B8B 100%)",
                  borderRadius: "40px",
                  boxShadow: `
                    0 15px 30px rgba(0,0,0,0.2),
                    inset 0 -6px 12px rgba(0,0,0,0.2),
                    inset 0 6px 12px rgba(255,255,255,0.4)
                  `,
                  border: isSelected ? "6px solid white" : "4px solid rgba(255,255,255,0.5)",
                  textShadow: "0 3px 8px rgba(0,0,0,0.3)",
                  cursor: showFeedback ? "default" : "pointer",
                }}
                whileHover={!showFeedback ? { scale: 1.08, y: -5 } : {}}
                whileTap={!showFeedback ? { scale: 0.95 } : {}}
                animate={showFeedback && isSelected && isCorrect ? {
                  scale: [1, 1.1, 1],
                  transition: { duration: 0.5, repeat: 3 }
                } : {}}
              >
                {option}
                
                {showFeedback && isSelected && (
                  <motion.div
                    className="absolute -top-3 -right-3 text-4xl"
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
        {showFeedback && selectedAnswer === currentQuestion.correctAnswer && (
          <motion.div
            className="text-center mt-6"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
          >
            <div className="text-5xl font-bold" style={{
              background: "linear-gradient(135deg, #FFD93D 0%, #7ED321 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 6px 15px rgba(0,0,0,0.2)"
            }}>
              🎉 Excellent choice! You're a good citizen! +10 points!
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom decoration */}
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
