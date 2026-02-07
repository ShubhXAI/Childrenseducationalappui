import { motion } from "motion/react";
import { Giggles } from "./Giggles";
import { ChevronLeft } from "lucide-react";

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const subjects = [
    {
      title: "Counting",
      icon: "🧮",
      gradient: "linear-gradient(145deg, #4A90E2 0%, #5DADE2 100%)",
    },
    {
      title: "Shapes",
      icon: "🔷",
      gradient: "linear-gradient(145deg, #FF6B6B 0%, #FF8787 100%)",
    },
    {
      title: "Time",
      icon: "🕐",
      gradient: "linear-gradient(145deg, #9B59B6 0%, #BB8FCE 100%)",
    },
    {
      title: "Money",
      icon: "💰",
      gradient: "linear-gradient(145deg, #F39C12 0%, #F8C471 100%)",
    },
  ];

  return (
    <div className="w-full h-full relative overflow-auto" style={{
      background: "linear-gradient(180deg, #E8F8F5 0%, #FCF3CF 100%)"
    }}>
      {/* Header */}
      <div className="sticky top-0 z-10 p-4 flex items-center gap-4" style={{
        background: "rgba(255,255,255,0.95)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <motion.button
          onClick={() => onNavigate("home")}
          className="p-3 text-white"
          style={{
            background: "linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)",
            borderRadius: "50%",
            boxShadow: "0 6px 15px rgba(74, 144, 226, 0.3)",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <h1 className="text-3xl font-bold" style={{
          background: "linear-gradient(135deg, #FF6B6B 0%, #4A90E2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Learning Topics
        </h1>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Giggles with magnifying glass */}
        <motion.div
          className="flex justify-end mb-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <Giggles size={100} animate={true} accessory="magnifyingGlass" />
        </motion.div>

        {/* Grid of subject cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              onClick={() => onNavigate("addition")}
              className="relative p-10 cursor-pointer"
              style={{
                background: subject.gradient,
                borderRadius: "45px",
                boxShadow: `
                  0 25px 50px rgba(0,0,0,0.18),
                  inset 0 -8px 20px rgba(0,0,0,0.12),
                  inset 0 8px 20px rgba(255,255,255,0.4)
                `,
                border: "6px solid rgba(255,255,255,0.4)",
                minHeight: "220px",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon circle */}
              <div
                className="flex items-center justify-center text-7xl mb-4 mx-auto"
                style={{
                  width: "130px",
                  height: "130px",
                  background: "rgba(255,255,255,0.35)",
                  borderRadius: "50%",
                  boxShadow: `
                    0 12px 25px rgba(0,0,0,0.15),
                    inset 0 6px 15px rgba(255,255,255,0.5),
                    inset 0 -6px 15px rgba(0,0,0,0.1)
                  `,
                  border: "5px solid rgba(255,255,255,0.5)",
                }}
              >
                {subject.icon}
              </div>

              {/* Title */}
              <h2 className="text-4xl font-bold text-white text-center" style={{
                textShadow: "0 4px 10px rgba(0,0,0,0.3)",
                letterSpacing: "0.03em"
              }}>
                {subject.title}
              </h2>

              {/* Shine effect */}
              <div
                className="absolute top-6 left-6 pointer-events-none"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
                  borderRadius: "50%",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          className="mt-12 text-center text-2xl font-bold text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Choose a topic to start learning! 📚
        </motion.div>
      </div>
    </div>
  );
}
