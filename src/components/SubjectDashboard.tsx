import { motion } from "motion/react";
import { ChevronLeft, Sparkles, Play } from "lucide-react";
import { AvatarGuide } from "./AvatarGuide";

interface SubjectDashboardProps {
  onNavigate: (screen: string) => void;
}

export function SubjectDashboard({ onNavigate }: SubjectDashboardProps) {
  const topics = [
    { title: "Counting", icon: "1234", color: "#5B9FED", iconBg: "#8EBFFF" },
    { title: "Addition", icon: "➕", color: "#7ED321", iconBg: "#A8E063" },
    { title: "Subtraction", icon: "➖", color: "#FF8C69", iconBg: "#FFB199" },
    { title: "Division", icon: "➗", color: "#A881E8", iconBg: "#C5A9F5" },
    { title: "EVS", icon: "🌱", color: "#7ED321", iconBg: "#A8E063" },
    { title: "Traffic Sense", icon: "🚗", color: "#FF7B8C", iconBg: "#FFAAB5" },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{
      background: "linear-gradient(180deg, #87CEEB 0%, #A8E063 50%, #FFE66D 100%)"
    }}>
      {/* Cocomelon floating decorations */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`deco-${i}`}
          className="absolute text-5xl"
          style={{
            top: `${8 + (i % 4) * 22}%`,
            left: `${4 + i * 8}%`,
            opacity: 0.35,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            transition: { duration: 4 + i * 0.4, repeat: Infinity }
          }}
        >
          {i % 4 === 0 ? "⭐" : i % 4 === 1 ? "🎈" : i % 4 === 2 ? "🌈" : "✨"}
        </motion.div>
      ))}

      {/* Avatar Guide */}
      <AvatarGuide
        message="Choose a topic you'd like to learn! I think Addition is really cool! 🌟"
        suggestions={[
          { text: "➕ Start with Addition", action: () => onNavigate("explore") },
          { text: "🎯 Show me all levels", action: () => onNavigate("explore") },
          { text: "🏠 Go back home", action: () => onNavigate("home") },
        ]}
        position="float"
      />

      {/* Main container - white rounded card */}
      <div
        className="relative w-full h-full max-w-[85%] max-h-[90%] p-10 flex flex-col"
        style={{
          background: "linear-gradient(145deg, #FFFFFF 0%, #FFFEF8 100%)",
          borderRadius: "60px",
          boxShadow: `
            0 35px 75px rgba(0,0,0,0.25),
            inset 0 -8px 20px rgba(0,0,0,0.03),
            inset 0 8px 20px rgba(255,255,255,1)
          `,
          border: "12px solid rgba(255,255,255,1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-6 mb-10">
          <motion.button
            onClick={() => onNavigate("home")}
            className="p-5 text-white flex-shrink-0"
            style={{
              background: "linear-gradient(145deg, #5B9FED 0%, #4A8BD9 100%)",
              borderRadius: "50%",
              boxShadow: `
                0 12px 30px rgba(91, 159, 237, 0.5),
                inset 0 -4px 10px rgba(0,0,0,0.2),
                inset 0 4px 10px rgba(255,255,255,0.4)
              `,
              border: "4px solid rgba(255,255,255,0.5)",
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-10 h-10" />
          </motion.button>
          <h1 className="text-6xl font-bold" style={{
            background: "linear-gradient(135deg, #FF6B9D 0%, #A881E8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.02em"
          }}>
            Choose Your Adventure
          </h1>
        </div>

        {/* Topics grid - 2 columns */}
        <div className="flex-1 grid grid-cols-2 gap-6 mb-8 overflow-y-auto px-2">
          {topics.map((topic, index) => (
            <motion.button
              key={topic.title}
              onClick={() => onNavigate("explore")}
              className="relative flex items-center gap-6 px-8 py-6"
              style={{
                background: `linear-gradient(145deg, ${topic.color} 0%, ${topic.color}ee 100%)`,
                borderRadius: "40px",
                boxShadow: `
                  0 18px 40px ${topic.color}60,
                  inset 0 -6px 16px rgba(0,0,0,0.15),
                  inset 0 6px 16px rgba(255,255,255,0.4)
                `,
                border: "6px solid rgba(255,255,255,0.5)",
                height: "130px",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.08, type: "spring", damping: 15 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon circle */}
              <div
                className="flex items-center justify-center text-5xl flex-shrink-0"
                style={{
                  width: "95px",
                  height: "95px",
                  background: `linear-gradient(145deg, ${topic.iconBg} 0%, ${topic.iconBg}dd 100%)`,
                  borderRadius: "50%",
                  boxShadow: `
                    0 10px 25px rgba(0,0,0,0.15),
                    inset 0 -4px 10px rgba(0,0,0,0.1),
                    inset 0 4px 10px rgba(255,255,255,0.6)
                  `,
                  border: "5px solid rgba(255,255,255,0.6)",
                }}
              >
                {topic.icon}
              </div>

              {/* Title */}
              <h2 className="flex-1 text-left text-4xl font-bold text-white" style={{
                textShadow: "0 4px 12px rgba(0,0,0,0.3)",
                letterSpacing: "0.02em"
              }}>
                {topic.title}
              </h2>

              {/* Play button */}
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: "65px",
                  height: "65px",
                  background: "linear-gradient(145deg, #FFFFFF 0%, #F0F0F0 100%)",
                  borderRadius: "50%",
                  boxShadow: `
                    0 10px 25px rgba(0,0,0,0.2),
                    inset 0 -3px 8px rgba(0,0,0,0.08),
                    inset 0 3px 8px rgba(255,255,255,0.9)
                  `,
                  border: "4px solid rgba(255,255,255,0.7)",
                }}
              >
                <Play className="w-8 h-8" style={{ 
                  color: topic.color,
                  marginLeft: "4px",
                  fill: topic.color
                }} />
              </div>

              {/* Shine effect */}
              <div
                className="absolute top-4 left-8 pointer-events-none"
                style={{
                  width: "80px",
                  height: "60px",
                  background: "radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%)",
                  borderRadius: "50%",
                }}
              />
            </motion.button>
          ))}
        </div>

        {/* Bottom - Explore Everything button */}
        <div className="flex justify-center pt-4">
          <motion.button
            onClick={() => onNavigate("explore")}
            className="px-16 py-7 text-white text-4xl font-bold tracking-wider flex items-center gap-4"
            style={{
              background: "linear-gradient(135deg, #FF9966 0%, #FFD93D 50%, #A8E063 100%)",
              borderRadius: "50px",
              boxShadow: `
                0 20px 45px rgba(255, 153, 102, 0.6),
                inset 0 -6px 15px rgba(0,0,0,0.2),
                inset 0 6px 15px rgba(255,255,255,0.5)
              `,
              border: "6px solid rgba(255,255,255,0.6)",
            }}
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                "0 20px 45px rgba(255, 153, 102, 0.6)",
                "0 25px 55px rgba(255, 153, 102, 0.8)",
                "0 20px 45px rgba(255, 153, 102, 0.6)",
              ],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            <Sparkles className="w-9 h-9" />
            EXPLORE EVERYTHING WITH GIGGLES
            <Sparkles className="w-9 h-9" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}