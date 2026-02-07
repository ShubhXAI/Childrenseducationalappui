import { motion } from "motion/react";

interface GigglesProps {
  size?: number;
  animate?: boolean;
  accessory?: "wave" | "glasses" | "none";
}

export function Giggles({ size = 100, animate = false, accessory = "none" }: GigglesProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      style={{ width: size, height: size * 1.2 }}
      animate={animate ? {
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0],
        transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
      } : {}}
    >
      {/* Main body - pear shaped, very round and friendly */}
      <div
        className="relative"
        style={{
          width: size,
          height: size * 1.1,
          background: "linear-gradient(145deg, #FFE66D 0%, #FFD93D 100%)",
          borderRadius: "50% 50% 50% 50% / 45% 45% 55% 55%",
          boxShadow: `
            0 ${size * 0.25}px ${size * 0.5}px rgba(255, 193, 7, 0.4),
            inset 0 ${size * -0.08}px ${size * 0.2}px rgba(0,0,0,0.1),
            inset 0 ${size * 0.08}px ${size * 0.2}px rgba(255,255,255,0.6)
          `,
          border: `${size * 0.04}px solid rgba(255,255,255,0.7)`,
        }}
      >
        {/* Big friendly eyes - Cocomelon style */}
        <div className="absolute flex gap-2" style={{
          top: `${size * 0.28}px`,
          left: "50%",
          transform: "translateX(-50%)",
        }}>
          {/* Left eye */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width: size * 0.22,
              height: size * 0.22,
              background: "white",
              borderRadius: "50%",
              boxShadow: `0 ${size * 0.04}px ${size * 0.1}px rgba(0,0,0,0.15)`,
              border: `${size * 0.02}px solid #2C3E50`,
            }}
          >
            <motion.div
              style={{
                width: size * 0.12,
                height: size * 0.12,
                background: "#2C3E50",
                borderRadius: "50%",
                position: "relative",
              }}
              animate={animate ? {
                scale: [1, 1.1, 1],
                transition: { duration: 3, repeat: Infinity }
              } : {}}
            >
              {/* Pupil shine - makes eyes sparkle */}
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "20%",
                  width: "35%",
                  height: "35%",
                  background: "white",
                  borderRadius: "50%",
                }}
              />
            </motion.div>
          </div>

          {/* Right eye */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width: size * 0.22,
              height: size * 0.22,
              background: "white",
              borderRadius: "50%",
              boxShadow: `0 ${size * 0.04}px ${size * 0.1}px rgba(0,0,0,0.15)`,
              border: `${size * 0.02}px solid #2C3E50`,
            }}
          >
            <motion.div
              style={{
                width: size * 0.12,
                height: size * 0.12,
                background: "#2C3E50",
                borderRadius: "50%",
                position: "relative",
              }}
              animate={animate ? {
                scale: [1, 1.1, 1],
                transition: { duration: 3, repeat: Infinity }
              } : {}}
            >
              {/* Pupil shine */}
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "20%",
                  width: "35%",
                  height: "35%",
                  background: "white",
                  borderRadius: "50%",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Big friendly smile - Cocomelon style */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: `${size * 0.58}px`,
            width: size * 0.42,
            height: size * 0.22,
            background: "#E74C3C",
            borderRadius: "0 0 100px 100px / 0 0 80px 80px",
            boxShadow: `inset 0 ${size * 0.04}px ${size * 0.08}px rgba(0,0,0,0.15)`,
            border: `${size * 0.02}px solid #C0392B`,
            borderTop: "none",
          }}
        >
          {/* Tongue */}
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "40%",
              height: "35%",
              background: "#FF6B9D",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Rosy cheeks - Cocomelon style */}
        <div
          className="absolute"
          style={{
            top: `${size * 0.48}px`,
            left: `${size * 0.08}px`,
            width: size * 0.18,
            height: size * 0.14,
            background: "radial-gradient(circle, rgba(255, 107, 157, 0.5) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute"
          style={{
            top: `${size * 0.48}px`,
            right: `${size * 0.08}px`,
            width: size * 0.18,
            height: size * 0.14,
            background: "radial-gradient(circle, rgba(255, 107, 157, 0.5) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Main highlight - glossy shine */}
        <div
          className="absolute top-2 left-3 pointer-events-none"
          style={{
            width: size * 0.35,
            height: size * 0.35,
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Accessories */}
      {accessory === "wave" && (
        <motion.div
          className="absolute"
          style={{
            top: `${size * 0.3}px`,
            right: `${size * -0.25}px`,
            fontSize: size * 0.35,
          }}
          animate={{
            rotate: [0, 20, 0, 20, 0],
            transition: { duration: 1.5, repeat: Infinity }
          }}
        >
          👋
        </motion.div>
      )}

      {accessory === "glasses" && (
        <div
          className="absolute"
          style={{
            top: `${size * 0.25}px`,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: size * 0.4,
          }}
        >
          👓
        </div>
      )}

      {/* Floating sparkles for extra joy */}
      {animate && (
        <>
          <motion.div
            className="absolute text-2xl"
            style={{
              top: `${size * 0.1}px`,
              left: `${size * -0.15}px`,
            }}
            animate={{
              y: [-5, -15, -5],
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute text-2xl"
            style={{
              top: `${size * 0.05}px`,
              right: `${size * -0.1}px`,
            }}
            animate={{
              y: [-8, -18, -8],
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
              transition: { duration: 2.5, repeat: Infinity, delay: 0.5 }
            }}
          >
            ⭐
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
