import { motion } from "motion/react";
import { Giggles } from "./Giggles";
import { AvatarGuide } from "./AvatarGuide";
import { Lock, Star, ChevronLeft, MapPin, List } from "lucide-react";
import { useState, useRef } from "react";

interface ExploreScreenProps {
  onNavigate: (screen: string, subject?: string) => void;
  subject?: string;
}

export function ExploreScreen({ onNavigate, subject = "maths" }: ExploreScreenProps) {
  // Define topics for each subject
  const subjectTopics: Record<string, Array<{ id: string; title: string; icon: string; color: string }>> = {
    maths: [
      { id: "counting", title: "Counting", icon: "🔢", color: "#5B9FED" },
      { id: "addition", title: "Addition", icon: "➕", color: "#7ED321" },
      { id: "subtraction", title: "Subtraction", icon: "➖", color: "#FF8C69" },
      { id: "multiplication", title: "Multiplication", icon: "✖️", color: "#FF6EC7" },
      { id: "division", title: "Division", icon: "➗", color: "#A881E8" },
      { id: "shapes", title: "Shapes", icon: "🔷", color: "#4ECDC4" },
      { id: "time", title: "Time", icon: "🕐", color: "#FFD93D" },
      { id: "money", title: "Money", icon: "💰", color: "#7ED321" },
      { id: "fractions", title: "Fractions", icon: "🍕", color: "#FF9966" },
    ],
    english: [
      { id: "alphabet", title: "Alphabet", icon: "🔤", color: "#FF6EC7" },
      { id: "phonics", title: "Phonics", icon: "🗣️", color: "#5B9FED" },
      { id: "reading", title: "Reading", icon: "📖", color: "#7ED321" },
      { id: "spelling", title: "Spelling", icon: "✍️", color: "#FFD93D" },
      { id: "grammar", title: "Grammar", icon: "📝", color: "#A881E8" },
      { id: "stories", title: "Stories", icon: "📚", color: "#FF8C69" },
      { id: "rhymes", title: "Rhymes", icon: "🎵", color: "#4ECDC4" },
      { id: "vocabulary", title: "Vocabulary", icon: "💬", color: "#FF9966" },
    ],
    world: [
      { id: "animals", title: "Animals", icon: "🦁", color: "#FF9966" },
      { id: "plants", title: "Plants", icon: "🌱", color: "#7ED321" },
      { id: "weather", title: "Weather", icon: "🌦️", color: "#87CEEB" },
      { id: "seasons", title: "Seasons", icon: "🍂", color: "#FFD93D" },
      { id: "helpers", title: "Community", icon: "👨‍🚒", color: "#FF6EC7" },
      { id: "transport", title: "Transport", icon: "🚗", color: "#5B9FED" },
      { id: "space", title: "Space", icon: "🚀", color: "#A881E8" },
      { id: "ocean", title: "Ocean", icon: "🌊", color: "#4ECDC4" },
      { id: "food", title: "Food", icon: "🍎", color: "#FF6B6B" },
    ],
  };

  const subtopics = subjectTopics[subject] || subjectTopics.maths;
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>(subtopics[0].title);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentLevel = 8;
  const totalLevels = 20;

  // Define adventure zones with themes based on subject
  const subjectZones: Record<string, Array<any>> = {
    maths: [
      { 
        name: "Number Garden", 
        levels: [1, 2, 3, 4, 5], 
        color: "#FFD93D", 
        bgGradient: "linear-gradient(180deg, #87CEEB 0%, #A8E063 100%)",
        emoji: "🌻",
        description: "Count the flowers!"
      },
      { 
        name: "Candy Forest", 
        levels: [6, 7, 8, 9, 10], 
        color: "#FF6B9D", 
        bgGradient: "linear-gradient(180deg, #A8E063 0%, #FF8EC1 100%)",
        emoji: "🍭",
        description: "Sweet math treats!"
      },
      { 
        name: "Crystal River", 
        levels: [11, 12, 13, 14, 15], 
        color: "#4ECDC4", 
        bgGradient: "linear-gradient(180deg, #FF8EC1 0%, #4ECDC4 100%)",
        emoji: "💎",
        description: "Sparkly problems!"
      },
      { 
        name: "Rainbow Peak", 
        levels: [16, 17, 18, 19, 20], 
        color: "#A881E8", 
        bgGradient: "linear-gradient(180deg, #4ECDC4 0%, #A881E8 100%)",
        emoji: "🌈",
        description: "Top mathematician!"
      },
    ],
    english: [
      { 
        name: "Letter Land", 
        levels: [1, 2, 3, 4, 5], 
        color: "#FF6EC7", 
        bgGradient: "linear-gradient(180deg, #FFE8F5 0%, #FFC1E3 100%)",
        emoji: "🔤",
        description: "Learn your ABCs!"
      },
      { 
        name: "Word Woods", 
        levels: [6, 7, 8, 9, 10], 
        color: "#7ED321", 
        bgGradient: "linear-gradient(180deg, #FFC1E3 0%, #A8E063 100%)",
        emoji: "📚",
        description: "Build your words!"
      },
      { 
        name: "Story Stream", 
        levels: [11, 12, 13, 14, 15], 
        color: "#5B9FED", 
        bgGradient: "linear-gradient(180deg, #A8E063 0%, #87CEEB 100%)",
        emoji: "📖",
        description: "Read amazing tales!"
      },
      { 
        name: "Poetry Peak", 
        levels: [16, 17, 18, 19, 20], 
        color: "#A881E8", 
        bgGradient: "linear-gradient(180deg, #87CEEB 0%, #DDA0DD 100%)",
        emoji: "🎭",
        description: "Master storyteller!"
      },
    ],
    world: [
      { 
        name: "Animal Kingdom", 
        levels: [1, 2, 3, 4, 5], 
        color: "#FF9966", 
        bgGradient: "linear-gradient(180deg, #87CEEB 0%, #FFDAB9 100%)",
        emoji: "🦁",
        description: "Meet the animals!"
      },
      { 
        name: "Nature Valley", 
        levels: [6, 7, 8, 9, 10], 
        color: "#7ED321", 
        bgGradient: "linear-gradient(180deg, #FFDAB9 0%, #98FB98 100%)",
        emoji: "🌳",
        description: "Explore plants & trees!"
      },
      { 
        name: "Weather Station", 
        levels: [11, 12, 13, 14, 15], 
        color: "#87CEEB", 
        bgGradient: "linear-gradient(180deg, #98FB98 0%, #B0E0E6 100%)",
        emoji: "⛅",
        description: "Learn about weather!"
      },
      { 
        name: "Space Galaxy", 
        levels: [16, 17, 18, 19, 20], 
        color: "#A881E8", 
        bgGradient: "linear-gradient(180deg, #B0E0E6 0%, #9370DB 100%)",
        emoji: "🚀",
        description: "Blast off to space!"
      },
    ],
  };

  const zones = subjectZones[subject] || subjectZones.maths;

  // Subject-specific decorations
  const getZoneDecorations = (zoneIndex: number) => {
    if (subject === "maths") {
      if (zoneIndex === 0) return { emoji: "🌼", count: 8 };
      if (zoneIndex === 1) return { emoji: "🍭", count: 6 };
      if (zoneIndex === 2) return { emoji: "💧", count: 10 };
      if (zoneIndex === 3) return { emoji: "⭐", count: 8 };
    } else if (subject === "english") {
      if (zoneIndex === 0) return { emoji: "🔤", count: 8 };
      if (zoneIndex === 1) return { emoji: "📚", count: 6 };
      if (zoneIndex === 2) return { emoji: "📖", count: 8 };
      if (zoneIndex === 3) return { emoji: "✨", count: 10 };
    } else if (subject === "world") {
      if (zoneIndex === 0) return { emoji: "🦋", count: 8 };
      if (zoneIndex === 1) return { emoji: "🌺", count: 7 };
      if (zoneIndex === 2) return { emoji: "☁️", count: 9 };
      if (zoneIndex === 3) return { emoji: "🌟", count: 8 };
    }
    return { emoji: "✨", count: 5 };
  };

  const getLevelZone = (level: number) => {
    return zones.find(zone => zone.levels.includes(level)) || zones[0];
  };

  // Generate path points for the winding adventure map
  const getPathPosition = (level: number) => {
    const zoneIndex = zones.findIndex(zone => zone.levels.includes(level));
    const levelInZone = level - zones[zoneIndex].levels[0];
    
    // Create a winding S-curve path
    const baseY = 180 + zoneIndex * 350;
    const xOffset = levelInZone * 220;
    const yWave = Math.sin(levelInZone * 0.8) * 80;
    
    return {
      x: 150 + xOffset,
      y: baseY + yWave,
    };
  };

  const scrollTopics = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getSubjectTitle = () => {
    if (subject === "maths") return "Maths Magic";
    if (subject === "english") return "English Fun";
    if (subject === "world") return "My World";
    return "Adventure";
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col" style={{
      background: "linear-gradient(135deg, #E8F5E9 0%, #E3F2FD 50%, #FCE4EC 100%)"
    }}>
      {/* Avatar Guide - floating */}
      <AvatarGuide
        message={`Welcome to ${getSubjectTitle()}! Want to go topic by topic or jump around? Pick any level you want! 🗺️`}
        suggestions={[
          { text: "▶ Continue Current Level", action: () => onNavigate("question") },
          { text: "🔄 Change Subject", action: () => onNavigate("home") },
          { text: "🏠 Back to Home", action: () => onNavigate("home") },
        ]}
        position="float"
      />

      {/* Header */}
      <div className="relative z-20 p-6 flex items-center justify-between" style={{
        background: "rgba(255,255,255,0.95)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
      }}>
        <div className="flex items-center gap-6">
          <motion.button
            onClick={() => onNavigate("home")}
            className="p-4 text-white"
            style={{
              background: "linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)",
              borderRadius: "50%",
              boxShadow: "0 8px 20px rgba(74, 144, 226, 0.4)",
              border: "4px solid rgba(255,255,255,0.5)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>
          <div>
            <h1 className="text-4xl font-bold" style={{
              background: "linear-gradient(135deg, #FF6B6B 0%, #4A90E2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {selectedSubtopic} Adventure
            </h1>
            <p className="text-xl text-gray-600 mt-1">{getSubjectTitle()} • Level {currentLevel} of {totalLevels}</p>
          </div>
        </div>
        
        {/* Zone indicator */}
        <div className="flex items-center gap-3 px-6 py-3" style={{
          background: getLevelZone(currentLevel).bgGradient,
          borderRadius: "30px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          border: "4px solid rgba(255,255,255,0.5)",
        }}>
          <span className="text-3xl">{getLevelZone(currentLevel).emoji}</span>
          <div>
            <h3 className="text-xl font-bold text-white" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>
              {getLevelZone(currentLevel).name}
            </h3>
          </div>
        </div>

        {/* Topic list view button */}
        <motion.button
          onClick={() => onNavigate("subjects")}
          className="p-4 text-white"
          style={{
            background: "linear-gradient(145deg, #FF6B9D 0%, #FF8ED5 100%)",
            borderRadius: "30px",
            boxShadow: "0 8px 20px rgba(255, 107, 157, 0.4)",
            border: "4px solid rgba(255,255,255,0.5)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2 px-3">
            <List className="w-6 h-6" />
            <span className="text-lg font-bold">All Topics</span>
          </div>
        </motion.button>
      </div>

      {/* Adventure World Map - scrollable */}
      <div className="flex-1 overflow-auto relative" style={{ paddingBottom: "140px" }}>
        <div className="relative" style={{ 
          width: "100%", 
          minHeight: "1800px",
          padding: "40px"
        }}>
          {/* Zone backgrounds with transitions */}
          {zones.map((zone, zoneIndex) => (
            <div
              key={zone.name}
              className="absolute left-0 right-0"
              style={{
                top: `${zoneIndex * 350}px`,
                height: "400px",
                background: zone.bgGradient,
                borderRadius: zoneIndex === 0 ? "0" : "0",
                opacity: 0.3,
              }}
            />
          ))}

          {/* Zone labels and decorations */}
          {zones.map((zone, zoneIndex) => {
            const decorations = getZoneDecorations(zoneIndex);
            return (
              <div key={`zone-label-${zone.name}`}>
                {/* Zone title card */}
                <motion.div
                  className="absolute"
                  style={{
                    left: "40px",
                    top: `${zoneIndex * 350 + 60}px`,
                  }}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: zoneIndex * 0.2 }}
                >
                  <div
                    className="px-8 py-5"
                    style={{
                      background: "linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)",
                      borderRadius: "30px",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                      border: "5px solid rgba(255,255,255,0.8)",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-5xl">{zone.emoji}</span>
                      <div>
                        <h2 className="text-3xl font-bold" style={{
                          color: zone.color,
                          textShadow: `0 2px 8px ${zone.color}80`
                        }}>
                          {zone.name}
                        </h2>
                        <p className="text-lg text-gray-600">{zone.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Environmental decorations */}
                {[...Array(decorations.count)].map((_, i) => (
                  <motion.div
                    key={`deco-${zoneIndex}-${i}`}
                    className="absolute text-4xl"
                    style={{
                      left: `${120 + i * 150 + Math.random() * 80}px`,
                      top: `${zoneIndex * 350 + 280 + Math.random() * 60}px`,
                    }}
                    animate={{
                      rotate: zoneIndex === 1 ? [0, 360] : [-5, 5, -5],
                      y: [0, -10, 0],
                      transition: { duration: 2 + i * 0.3, repeat: Infinity }
                    }}
                  >
                    {decorations.emoji}
                  </motion.div>
                ))}
              </div>
            );
          })}

          {/* Adventure path - connecting lines */}
          {Array.from({ length: totalLevels - 1 }, (_, i) => {
            const level = i + 1;
            const nextLevel = level + 1;
            const pos1 = getPathPosition(level);
            const pos2 = getPathPosition(nextLevel);
            
            const angle = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x) * 180 / Math.PI;
            const distance = Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
            
            const zone = getLevelZone(level);
            const isPathCompleted = level < currentLevel;

            return (
              <div
                key={`path-${level}`}
                className="absolute"
                style={{
                  left: `${pos1.x}px`,
                  top: `${pos1.y}px`,
                  width: `${distance}px`,
                  height: "12px",
                  background: isPathCompleted 
                    ? `linear-gradient(90deg, ${zone.color} 0%, ${getLevelZone(nextLevel).color} 100%)`
                    : "linear-gradient(90deg, #E0E0E0 0%, #D0D0D0 100%)",
                  transformOrigin: "left center",
                  transform: `rotate(${angle}deg)`,
                  borderRadius: "6px",
                  boxShadow: isPathCompleted ? `0 4px 12px ${zone.color}60` : "0 2px 6px rgba(0,0,0,0.1)",
                  border: "2px solid rgba(255,255,255,0.5)",
                  zIndex: 1,
                }}
              />
            );
          })}

          {/* Level nodes - Question checkpoints */}
          {Array.from({ length: totalLevels }, (_, i) => {
            const level = i + 1;
            const isCompleted = level < currentLevel;
            const isCurrent = level === currentLevel;
            const isLocked = level > currentLevel;
            const zone = getLevelZone(level);
            const pos = getPathPosition(level);

            return (
              <motion.div
                key={level}
                className="absolute"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  zIndex: isCurrent ? 20 : 10,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: level * 0.05 }}
              >
                {/* Question checkpoint structure */}
                <div className="relative flex flex-col items-center" style={{ width: "180px", marginLeft: "-90px", marginTop: "-90px" }}>
                  {/* Current level - Giggles standing here */}
                  {isCurrent && (
                    <motion.div
                      className="absolute -top-36 left-1/2 -translate-x-1/2"
                      animate={{
                        y: [0, -12, 0],
                        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <Giggles size={80} animate={true} />
                      {/* Speech bubble */}
                      <motion.div
                        className="absolute -top-20 left-1/2 -translate-x-1/2 px-5 py-3 text-lg font-bold whitespace-nowrap"
                        style={{
                          background: "linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)",
                          borderRadius: "20px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                          border: "3px solid rgba(200,200,200,0.3)",
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        Let's learn! 🎯
                        {/* Speech pointer */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "-10px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "0",
                            height: "0",
                            borderLeft: "10px solid transparent",
                            borderRight: "10px solid transparent",
                            borderTop: "10px solid #F8F9FA",
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Main checkpoint button */}
                  <motion.button
                    onClick={() => (isCurrent || isCompleted) && onNavigate("question")}
                    className="relative flex flex-col items-center justify-center"
                    style={{
                      width: isCurrent ? "110px" : "90px",
                      height: isCurrent ? "110px" : "90px",
                      background: isLocked
                        ? "linear-gradient(145deg, #BDBDBD 0%, #9E9E9E 100%)"
                        : `linear-gradient(145deg, ${zone.color} 0%, ${zone.color}dd 100%)`,
                      borderRadius: "50%",
                      boxShadow: isLocked
                        ? "0 10px 25px rgba(0,0,0,0.15)"
                        : isCurrent
                        ? `0 0 50px ${zone.color}, 0 20px 40px rgba(0,0,0,0.25)`
                        : `0 15px 35px ${zone.color}80`,
                      border: isCurrent ? "6px solid white" : "5px solid rgba(255,255,255,0.6)",
                      cursor: isLocked ? "default" : "pointer",
                    }}
                    whileHover={!isLocked ? { scale: 1.15, y: -5 } : {}}
                    whileTap={!isLocked ? { scale: 0.95 } : {}}
                  >
                    {isLocked ? (
                      <Lock className="w-10 h-10 text-white" />
                    ) : isCompleted ? (
                      <Star className="w-12 h-12 fill-white text-white" />
                    ) : (
                      <span className="text-4xl font-bold text-white" style={{
                        textShadow: "0 3px 8px rgba(0,0,0,0.4)"
                      }}>
                        {level}
                      </span>
                    )}
                  </motion.button>

                  {/* Question label */}
                  <motion.div
                    className="mt-3 px-4 py-2 text-sm font-bold"
                    style={{
                      background: "linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)",
                      borderRadius: "15px",
                      boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                      border: "3px solid rgba(200,200,200,0.2)",
                      color: isLocked ? "#999" : zone.color,
                    }}
                  >
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {isCompleted ? "Solved!" : isCurrent ? "Current" : isLocked ? "Locked" : "Ready"}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom scrollable topic navigation bar */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-30"
        style={{
          background: "linear-gradient(145deg, #FFFFFF 0%, #FFFEF8 100%)",
          boxShadow: "0 -8px 30px rgba(0,0,0,0.2)",
          borderTop: "6px solid rgba(200,200,200,0.2)",
          padding: "16px 20px",
        }}
      >
        <div className="flex items-center gap-4">
          {/* Scroll left button */}
          <motion.button
            onClick={() => scrollTopics('left')}
            className="flex-shrink-0 p-3 text-white"
            style={{
              background: "linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)",
              borderRadius: "50%",
              boxShadow: "0 6px 15px rgba(74, 144, 226, 0.4)",
              border: "4px solid rgba(255,255,255,0.5)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Scrollable topic buttons */}
          <div 
            ref={scrollRef}
            className="flex-1 flex gap-4 overflow-x-auto items-center"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {subtopics.map((topic, index) => (
              <motion.button
                key={topic.id}
                onClick={() => setSelectedSubtopic(topic.title)}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-4"
                style={{
                  background: selectedSubtopic === topic.title
                    ? `linear-gradient(145deg, ${topic.color} 0%, ${topic.color}dd 100%)`
                    : "linear-gradient(145deg, #F5F5F5 0%, #E0E0E0 100%)",
                  borderRadius: "30px",
                  boxShadow: selectedSubtopic === topic.title
                    ? `0 8px 20px ${topic.color}60`
                    : "0 4px 12px rgba(0,0,0,0.1)",
                  border: selectedSubtopic === topic.title 
                    ? "4px solid rgba(255,255,255,0.6)" 
                    : "4px solid rgba(200,200,200,0.3)",
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-3xl">{topic.icon}</span>
                <span 
                  className="text-xl font-bold whitespace-nowrap"
                  style={{
                    color: selectedSubtopic === topic.title ? "white" : "#666",
                    textShadow: selectedSubtopic === topic.title ? "0 2px 6px rgba(0,0,0,0.3)" : "none"
                  }}
                >
                  {topic.title}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Scroll right button */}
          <motion.button
            onClick={() => scrollTopics('right')}
            className="flex-shrink-0 p-3 text-white"
            style={{
              background: "linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)",
              borderRadius: "50%",
              boxShadow: "0 6px 15px rgba(74, 144, 226, 0.4)",
              border: "4px solid rgba(255,255,255,0.5)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 transform rotate-180" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
