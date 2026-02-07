import { motion } from "motion/react";
import { Giggles } from "./Giggles";
import { AvatarGuide } from "./AvatarGuide";
import { UserCircle } from "lucide-react";

interface HomeScreenProps {
  onNavigate: (screen: string, subject?: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const subjects = [
    {
      title: "MATHS MAGIC",
      gradient: "linear-gradient(145deg, #FF9966 0%, #FFD93D 100%)",
      icon: "🔢",
      description: "Numbers & Counting!",
      screen: "explore",
      subject: "maths"
    },
    {
      title: "ENGLISH FUN",
      gradient: "linear-gradient(145deg, #FF6EC7 0%, #FF8ED5 100%)",
      icon: "📚",
      description: "Stories & Letters!",
      screen: "explore",
      subject: "english"
    },
    {
      title: "MY WORLD",
      gradient: "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)",
      icon: "🌍",
      description: "Explore & Discover!",
      screen: "explore",
      subject: "world"
    },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{
      background: "linear-gradient(180deg, #FFE66D 0%, #A8E063 50%, #87CEEB 100%)"
    }}>
      {/* Cocomelon-style floating elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute text-5xl"
          style={{
            top: `${5 + (i % 5) * 20}%`,
            left: `${3 + i * 6}%`,
            opacity: 0.4,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 360],
            transition: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {i % 5 === 0 ? "⭐" : i % 5 === 1 ? "🎈" : i % 5 === 2 ? "☁️" : i % 5 === 3 ? "🌈" : "✨"}
        </motion.div>
      ))}

      {/* Avatar Guide */}
      <AvatarGuide
        message="Pick any subject you want to learn! Maths is super fun today! 🎯"
        suggestions={[
          { text: "🧮 Learn Maths Magic", action: () => onNavigate("explore") },
          { text: "📚 Try English Fun", action: () => onNavigate("explore") },
          { text: "🌍 Explore My World", action: () => onNavigate("explore") },
        ]}
        position="float"
      />

      {/* Top right - Parent Zone icon */}
      <motion.button
        onClick={() => onNavigate("parent")}
        className="absolute top-8 right-8 z-10 flex items-center gap-3 px-8 py-5 text-white font-bold text-2xl"
        style={{
          background: "linear-gradient(145deg, #A881E8 0%, #8E44AD 100%)",
          borderRadius: "40px",
          boxShadow: `
            0 12px 30px rgba(168, 129, 232, 0.5),
            inset 0 -4px 10px rgba(0,0,0,0.15),
            inset 0 4px 10px rgba(255,255,255,0.4)
          `,
          border: "5px solid rgba(255,255,255,0.5)",
        }}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <UserCircle className="w-8 h-8" />
        Parent Zone
      </motion.button>

      <div className="w-full h-full flex flex-col items-center justify-center px-12 py-8 gap-10">
        {/* Header with Giggles - Cocomelon style */}
        <motion.div
          className="flex items-center gap-8"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 12 }}
        >
          <Giggles size={140} animate={true} />
          <div className="text-center">
            <h1 className="text-8xl font-bold mb-2" style={{
              background: "linear-gradient(135deg, #FF6B6B 0%, #FFD93D 33%, #7ED321 66%, #4A90E2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 6px 15px rgba(0,0,0,0.1)",
              letterSpacing: "0.04em"
            }}>
              MY ADVENTURES!
            </h1>
            <p className="text-3xl font-bold text-white" style={{
              textShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}>
              What do you want to learn today? 🎉
            </p>
          </div>
        </motion.div>

        {/* Three subject cards - Cocomelon bright style */}
        <div className="flex gap-10 items-center justify-center">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              onClick={() => onNavigate(subject.screen, subject.subject)}
              className="relative cursor-pointer flex flex-col items-center justify-center"
              style={{
                width: "360px",
                height: "440px",
                background: subject.gradient,
                borderRadius: "60px",
                boxShadow: `
                  0 25px 55px rgba(0,0,0,0.25),
                  inset 0 -8px 20px rgba(0,0,0,0.15),
                  inset 0 8px 20px rgba(255,255,255,0.6)
                `,
                border: "10px solid rgba(255,255,255,0.6)",
              }}
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, type: "spring", damping: 12 }}
              whileHover={{ scale: 1.1, y: -15 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon bubble - bigger and friendlier */}
              <motion.div
                className="flex items-center justify-center text-9xl mb-6"
                style={{
                  width: "180px",
                  height: "180px",
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: "50%",
                  boxShadow: `
                    0 15px 35px rgba(0,0,0,0.2),
                    inset 0 8px 20px rgba(255,255,255,0.7)
                  `,
                  border: "8px solid rgba(255,255,255,0.7)",
                }}
                animate={{
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {subject.icon}
              </motion.div>

              {/* Text content */}
              <div className="text-center px-6">
                <h2 className="text-5xl font-bold text-white mb-4" style={{
                  textShadow: "0 5px 15px rgba(0,0,0,0.3)",
                  letterSpacing: "0.05em"
                }}>
                  {subject.title}
                </h2>
                <p className="text-3xl font-bold text-white/95" style={{
                  textShadow: "0 3px 8px rgba(0,0,0,0.25)"
                }}>
                  {subject.description}
                </p>
              </div>

              {/* Stronger shine effect */}
              <div
                className="absolute top-10 left-10 pointer-events-none"
                style={{
                  width: "140px",
                  height: "140px",
                  background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
                  borderRadius: "50%",
                }}
              />

              {/* Bouncing stars around card */}
              <motion.div
                className="absolute -top-6 -right-6 text-6xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  transition: { duration: 3, repeat: Infinity }
                }}
              >
                ⭐
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}