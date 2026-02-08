import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface ShapeMatchingBoardProps {
  targetShape: "circle" | "square" | "triangle" | "rectangle";
  targetColor: string;
  onComplete: (isCorrect: boolean) => void;
}

const shapeStyles = {
  circle: (color: string, size: number = 140) => ({
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    background: color
  }),
  square: (color: string, size: number = 140) => ({
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "15px",
    background: color
  }),
  triangle: (color: string, size: number = 140) => ({
    width: 0,
    height: 0,
    borderLeft: `${size/2}px solid transparent`,
    borderRight: `${size/2}px solid transparent`,
    borderBottom: `${size * 0.87}px solid ${color}`
  }),
  rectangle: (color: string, size: number = 140) => ({
    width: `${size * 1.5}px`,
    height: `${size}px`,
    borderRadius: "15px",
    background: color
  })
};

const allShapes: Array<"circle" | "square" | "triangle" | "rectangle"> = ["circle", "square", "triangle", "rectangle"];

interface DraggableShapeProps {
  shapeType: "circle" | "square" | "triangle" | "rectangle";
  color: string;
  isDragged: boolean;
}

function DraggableShape({ shapeType, color, isDragged }: DraggableShapeProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'shape',
    item: { shapeType },
    canDrag: !isDragged,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  if (isDragged) return null;

  return (
    <motion.div
      ref={drag as any}
      className="cursor-grab active:cursor-grabbing relative"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      whileHover={{ scale: 1.15, y: -10 }}
      animate={{
        y: [0, -10, 0],
        transition: { duration: 2, repeat: Infinity, delay: Math.random() }
      }}
    >
      <div
        style={{
          ...shapeStyles[shapeType](color),
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          border: "5px solid rgba(255,255,255,0.9)"
        }}
      />
    </motion.div>
  );
}

interface ShapeSlotProps {
  targetShape: "circle" | "square" | "triangle" | "rectangle";
  targetColor: string;
  onDrop: (droppedShape: string) => void;
  isMatched: boolean;
}

function ShapeSlot({ targetShape, targetColor, onDrop, isMatched }: ShapeSlotProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'shape',
    drop: (item: { shapeType: string }) => {
      onDrop(item.shapeType);
    },
    canDrop: (item: { shapeType: string }) => item.shapeType === targetShape && !isMatched,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop as any}
      className="relative flex items-center justify-center"
      style={{
        width: "300px",
        height: "300px",
        background: isOver && canDrop
          ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
          : isMatched
          ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
          : "linear-gradient(145deg, #FFFFFF 0%, #F0F0F0 100%)",
        borderRadius: "40px",
        border: isMatched 
          ? "8px solid #7ED321"
          : "8px dashed rgba(200,200,200,0.6)",
        boxShadow: `
          0 15px 40px rgba(0,0,0,0.2),
          inset 0 -5px 15px rgba(0,0,0,0.1),
          inset 0 5px 15px rgba(255,255,255,0.5)
        `,
        transition: "all 0.3s ease"
      }}
    >
      {/* Outline/shadow of target shape */}
      {!isMatched && (
        <div
          style={{
            ...shapeStyles[targetShape]("#D0D0D0", 160),
            opacity: 0.4
          }}
        />
      )}

      {/* Matched shape */}
      {isMatched && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12 }}
        >
          <div
            style={{
              ...shapeStyles[targetShape](targetColor, 160),
              boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
              border: "5px solid rgba(255,255,255,0.9)"
            }}
          />
        </motion.div>
      )}

      {/* Check mark */}
      {isMatched && (
        <motion.div
          className="absolute -top-6 -right-6 text-8xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
        >
          ✅
        </motion.div>
      )}

      {/* Glowing effect when hovering with correct shape */}
      {isOver && canDrop && !isMatched && (
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            border: "6px solid #FFD93D",
            boxShadow: "0 0 30px rgba(255, 217, 61, 0.8)"
          }}
          animate={{
            scale: [1, 1.05, 1],
            transition: { duration: 0.5, repeat: Infinity }
          }}
        />
      )}
    </div>
  );
}

export function ShapeMatchingBoard({ targetShape, targetColor, onComplete }: ShapeMatchingBoardProps) {
  const [isMatched, setIsMatched] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [shapeOptions, setShapeOptions] = useState<Array<{ type: "circle" | "square" | "triangle" | "rectangle"; color: string }>>([]);
  const [draggedShape, setDraggedShape] = useState<string | null>(null);

  // Reset when target changes
  useEffect(() => {
    setIsMatched(false);
    setShowSuccess(false);
    setWrongAttempt(false);
    setDraggedShape(null);

    // Generate 2-3 shape options including the target
    const options: Array<{ type: "circle" | "square" | "triangle" | "rectangle"; color: string }> = [
      { type: targetShape, color: targetColor }
    ];

    // Add 1-2 other random shapes
    const otherShapes = allShapes.filter(s => s !== targetShape);
    const shuffled = otherShapes.sort(() => Math.random() - 0.5);
    
    const numOtherShapes = Math.random() > 0.5 ? 2 : 1; // Randomly pick 1 or 2 other shapes
    const colors = ["#FF6B6B", "#4A90E2", "#FFD93D", "#FF6EC7", "#A8E063"];
    
    for (let i = 0; i < numOtherShapes; i++) {
      options.push({
        type: shuffled[i],
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Shuffle final options
    setShapeOptions(options.sort(() => Math.random() - 0.5));
  }, [targetShape, targetColor]);

  const handleDrop = (droppedShape: string) => {
    if (droppedShape === targetShape) {
      setIsMatched(true);
      setShowSuccess(true);
      setDraggedShape(droppedShape);
      
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    } else {
      // Wrong shape
      setWrongAttempt(true);
      setTimeout(() => {
        setWrongAttempt(false);
      }, 1500);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full h-full flex flex-col items-center justify-center gap-16 p-8">
        {/* Instructions */}
        <motion.div
          className="text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="inline-block px-12 py-8 bg-white rounded-3xl shadow-lg">
            <p className="text-5xl font-bold text-gray-700">
              🎯 Drag the <span className="text-blue-600">{targetShape}</span> to match! 👇
            </p>
          </div>
        </motion.div>

        <div className="flex items-center gap-24">
          {/* Shape options on the left */}
          <motion.div
            className="flex flex-col gap-8 p-12 rounded-3xl"
            style={{
              background: "linear-gradient(145deg, #FFE66D 0%, #FFD93D 100%)",
              border: "8px solid rgba(255,255,255,0.6)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
            }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="text-4xl font-bold text-center text-gray-700 mb-2">
              Choose a Shape 🔷
            </div>
            <div className="flex flex-col gap-8">
              {shapeOptions.map((option, idx) => (
                <div key={`${option.type}-${idx}`}>
                  <DraggableShape
                    shapeType={option.type}
                    color={option.color}
                    isDragged={draggedShape === option.type}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Target slot on the right */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="px-8 py-4 bg-white rounded-full shadow-lg">
              <p className="text-3xl font-bold text-gray-700">
                Match Here! ⭐
              </p>
            </div>
            
            <ShapeSlot
              targetShape={targetShape}
              targetColor={targetColor}
              onDrop={handleDrop}
              isMatched={isMatched}
            />
          </motion.div>
        </div>

        {/* Encouragement for wrong attempt */}
        {wrongAttempt && (
          <motion.div
            className="text-4xl font-bold text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Try a different shape! You can do it! 💪
          </motion.div>
        )}

        {/* Success animation */}
        {showSuccess && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <motion.div
              className="text-center"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
                transition: { duration: 0.5, repeat: 3 }
              }}
            >
              <div className="text-9xl mb-6">🎉✨🌟</div>
              <div className="text-7xl font-bold text-white" style={{
                textShadow: "0 6px 15px rgba(0,0,0,0.5)",
                background: "linear-gradient(135deg, #FFD93D 0%, #7ED321 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Perfect Match! You found the {targetShape}! 🏆
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </DndProvider>
  );
}
