import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Palette, X } from "lucide-react";
import { useTheme, themes } from "../contexts/ThemeContext";

export function ThemeSwitcher() {
  const { currentTheme, setTheme, themeId } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating theme button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 p-4 text-white rounded-full shadow-lg"
        style={{
          background: currentTheme.gradients.button1,
          border: "3px solid white"
        }}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 8px 20px rgba(0,0,0,0.3)",
            "0 12px 30px rgba(0,0,0,0.4)",
            "0 8px 20px rgba(0,0,0,0.3)"
          ],
          transition: { duration: 2, repeat: Infinity }
        }}
      >
        <Palette className="w-7 h-7" />
      </motion.button>

      {/* Theme selection modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] bg-white rounded-3xl p-8 shadow-2xl"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "900px",
                border: "6px solid rgba(255,255,255,0.9)"
              }}
              initial={{ scale: 0.5, opacity: 0, y: "-50%", x: "-50%" }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-bold" style={{
                  background: currentTheme.gradients.header,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  🎨 Choose Your Theme!
                </h2>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-full text-white"
                  style={{
                    background: currentTheme.gradients.button1
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Theme grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto max-h-[70vh]">
                {Object.values(themes).map((theme, index) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => {
                      setTheme(theme.id);
                      setTimeout(() => setIsOpen(false), 300);
                    }}
                    className="relative p-6 rounded-2xl text-white"
                    style={{
                      background: theme.gradients.main,
                      border: themeId === theme.id ? "4px solid #FFD93D" : "4px solid rgba(255,255,255,0.5)",
                      boxShadow: themeId === theme.id 
                        ? "0 0 0 4px rgba(255,217,61,0.3), 0 10px 30px rgba(0,0,0,0.3)"
                        : "0 8px 20px rgba(0,0,0,0.2)"
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Selected indicator */}
                    {themeId === theme.id && (
                      <motion.div
                        className="absolute -top-3 -right-3 text-4xl"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                      >
                        ✅
                      </motion.div>
                    )}

                    {/* Theme icon */}
                    <motion.div
                      className="text-6xl mb-3"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                        transition: { duration: 2, repeat: Infinity, delay: index * 0.2 }
                      }}
                    >
                      {theme.icon}
                    </motion.div>

                    {/* Theme name */}
                    <p className="text-lg font-bold" style={{
                      textShadow: "0 2px 6px rgba(0,0,0,0.3)"
                    }}>
                      {theme.name}
                    </p>

                    {/* Preview decorations */}
                    <div className="flex gap-1 justify-center mt-2 text-2xl">
                      {theme.decorations.floating.slice(0, 3).map((emoji, i) => (
                        <motion.span
                          key={i}
                          animate={{
                            y: [0, -5, 0],
                            transition: { duration: 1.5, repeat: Infinity, delay: i * 0.2 }
                          }}
                        >
                          {emoji}
                        </motion.span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Current theme info */}
              <motion.div
                className="mt-6 p-4 rounded-2xl text-white text-center"
                style={{
                  background: currentTheme.gradients.button2
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xl font-bold">
                  Current Theme: {currentTheme.icon} {currentTheme.name}
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
