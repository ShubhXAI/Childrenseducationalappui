import { motion } from "motion/react";
import { Giggles } from "./Giggles";
import { ChevronLeft, TrendingUp, Award, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ParentDashboardProps {
  onNavigate: (screen: string) => void;
}

export function ParentDashboard({ onNavigate }: ParentDashboardProps) {
  const weeklyData = [
    { day: "Mon", minutes: 15 },
    { day: "Tue", minutes: 22 },
    { day: "Wed", minutes: 18 },
    { day: "Thu", minutes: 25 },
    { day: "Fri", minutes: 30 },
    { day: "Sat", minutes: 12 },
    { day: "Sun", minutes: 20 },
  ];

  const achievements = [
    { title: "Addition Master", date: "Feb 5, 2026", icon: "🏆" },
    { title: "5-Day Streak", date: "Feb 4, 2026", icon: "🔥" },
    { title: "Shape Expert", date: "Feb 3, 2026", icon: "⭐" },
    { title: "Fast Learner", date: "Feb 2, 2026", icon: "⚡" },
  ];

  return (
    <div className="w-full h-full relative overflow-auto" style={{
      background: "linear-gradient(135deg, #E3F2FD 0%, #E8F5E9 50%, #FFF9C4 100%)"
    }}>
      {/* Header */}
      <div className="sticky top-0 z-10 p-8 flex items-center justify-between" style={{
        background: "linear-gradient(145deg, #5DADE2 0%, #48C9B0 100%)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        borderBottom: "5px solid rgba(255,255,255,0.4)",
      }}>
        <div className="flex items-center gap-6">
          <motion.button
            onClick={() => onNavigate("home")}
            className="p-4 text-white"
            style={{
              background: "rgba(255,255,255,0.3)",
              borderRadius: "50%",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              border: "3px solid rgba(255,255,255,0.5)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-9 h-9" />
          </motion.button>
          <h1 className="text-6xl font-bold text-white" style={{
            textShadow: "0 4px 12px rgba(0,0,0,0.25)",
            letterSpacing: "0.05em"
          }}>
            PARENT ZONE
          </h1>
        </div>
        <div className="relative">
          <Giggles size={100} animate={false} accessory="glasses" />
        </div>
      </div>

      <div className="max-w-full px-12 py-8">
        {/* Top row - Summary cards */}
        <div className="grid grid-cols-3 gap-8 mb-10">
          {/* Total time card */}
          <motion.div
            className="p-8"
            style={{
              background: "linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)",
              borderRadius: "35px",
              boxShadow: `
                0 18px 45px rgba(0,0,0,0.15),
                inset 0 -5px 12px rgba(0,0,0,0.06),
                inset 0 5px 12px rgba(255,255,255,0.9)
              `,
              border: "5px solid rgba(255,255,255,0.7)",
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-5 mb-4">
              <div
                className="p-4"
                style={{
                  background: "linear-gradient(145deg, #3498DB 0%, #2874A6 100%)",
                  borderRadius: "50%",
                  boxShadow: "0 10px 25px rgba(52, 152, 219, 0.4)",
                }}
              >
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-700">This Week</h3>
            </div>
            <p className="text-7xl font-bold mb-2" style={{
              background: "linear-gradient(135deg, #3498DB 0%, #2874A6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              142
            </p>
            <p className="text-2xl text-gray-500">Minutes learning</p>
          </motion.div>

          {/* Top subject card */}
          <motion.div
            className="p-8"
            style={{
              background: "linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)",
              borderRadius: "35px",
              boxShadow: `
                0 18px 45px rgba(0,0,0,0.15),
                inset 0 -5px 12px rgba(0,0,0,0.06),
                inset 0 5px 12px rgba(255,255,255,0.9)
              `,
              border: "5px solid rgba(255,255,255,0.7)",
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-5 mb-4">
              <div
                className="p-4"
                style={{
                  background: "linear-gradient(145deg, #E74C3C 0%, #C0392B 100%)",
                  borderRadius: "50%",
                  boxShadow: "0 10px 25px rgba(231, 76, 60, 0.4)",
                }}
              >
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-700">Top Subject</h3>
            </div>
            <p className="text-6xl font-bold mb-2" style={{
              background: "linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Maths 🧮
            </p>
            <p className="text-2xl text-gray-500">Most practiced</p>
          </motion.div>

          {/* Achievements count card */}
          <motion.div
            className="p-8"
            style={{
              background: "linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)",
              borderRadius: "35px",
              boxShadow: `
                0 18px 45px rgba(0,0,0,0.15),
                inset 0 -5px 12px rgba(0,0,0,0.06),
                inset 0 5px 12px rgba(255,255,255,0.9)
              `,
              border: "5px solid rgba(255,255,255,0.7)",
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-5 mb-4">
              <div
                className="p-4"
                style={{
                  background: "linear-gradient(145deg, #F39C12 0%, #D68910 100%)",
                  borderRadius: "50%",
                  boxShadow: "0 10px 25px rgba(243, 156, 18, 0.4)",
                }}
              >
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-700">Achievements</h3>
            </div>
            <p className="text-7xl font-bold mb-2" style={{
              background: "linear-gradient(135deg, #F39C12 0%, #D68910 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              24
            </p>
            <p className="text-2xl text-gray-500">Total earned</p>
          </motion.div>
        </div>

        {/* Bottom row - Chart and Achievements */}
        <div className="grid grid-cols-2 gap-8">
          {/* Weekly progress chart */}
          <motion.div
            className="p-10"
            style={{
              background: "linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)",
              borderRadius: "40px",
              boxShadow: `
                0 25px 55px rgba(0,0,0,0.15),
                inset 0 -6px 15px rgba(0,0,0,0.06),
                inset 0 6px 15px rgba(255,255,255,0.9)
              `,
              border: "6px solid rgba(255,255,255,0.7)",
            }}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Weekly Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis 
                  dataKey="day" 
                  stroke="#757575"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                />
                <YAxis 
                  stroke="#757575"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                />
                <Tooltip 
                  contentStyle={{
                    background: "linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)",
                    border: "3px solid #E0E0E0",
                    borderRadius: "20px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  }}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A90E2" stopOpacity={1} />
                    <stop offset="100%" stopColor="#7ED321" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Bar 
                  dataKey="minutes" 
                  fill="url(#barGradient)" 
                  radius={[20, 20, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent achievements */}
          <motion.div
            className="p-10"
            style={{
              background: "linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)",
              borderRadius: "40px",
              boxShadow: `
                0 25px 55px rgba(0,0,0,0.15),
                inset 0 -6px 15px rgba(0,0,0,0.06),
                inset 0 6px 15px rgba(255,255,255,0.9)
              `,
              border: "6px solid rgba(255,255,255,0.7)",
            }}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Recent Achievements</h2>
            <div className="space-y-5">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="flex items-center gap-5 p-6"
                  style={{
                    background: "linear-gradient(145deg, #F8F9FA 0%, #ECEFF1 100%)",
                    borderRadius: "25px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    border: "4px solid rgba(255,255,255,0.9)",
                  }}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div
                    className="flex items-center justify-center text-4xl"
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(145deg, #FFD93D 0%, #F39C12 100%)",
                      borderRadius: "50%",
                      boxShadow: "0 8px 20px rgba(243, 156, 18, 0.4)",
                      border: "4px solid rgba(255,255,255,0.6)",
                      flexShrink: 0,
                    }}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">{achievement.title}</h3>
                    <p className="text-lg text-gray-500 mt-1">{achievement.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
