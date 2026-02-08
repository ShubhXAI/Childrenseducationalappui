import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface DragDropCountingProps {
  targetNumber: number;
  objectEmoji: string;
  objectName: string;
  onComplete: (isCorrect: boolean) => void;
}

interface DraggableItemProps {
  id: number;
  emoji: string;
  onDrop: () => void;
}

function DraggableItem({ id, emoji, onDrop }: DraggableItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    item: { id },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onDrop();
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag as any}
      className="cursor-grab active:cursor-grabbing text-6xl"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      whileHover={{ scale: 1.2 }}
      animate={{
        y: [0, -10, 0],
        transition: { duration: 2, repeat: Infinity, delay: id * 0.2 }
      }}
    >
      {emoji}
    </motion.div>
  );
}

function DropZone({ children, onDrop }: { children: React.ReactNode; onDrop: () => void }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: () => onDrop(),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as any}
      className="relative"
      style={{
        width: "400px",
        height: "400px",
        background: isOver 
          ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
          : "linear-gradient(145deg, #FFE66D 0%, #FFD93D 100%)",
        borderRadius: "50px",
        border: "8px dashed rgba(255,255,255,0.8)",
        boxShadow: `
          0 15px 40px rgba(0,0,0,0.2),
          inset 0 -4px 12px rgba(0,0,0,0.1),
          inset 0 4px 12px rgba(255,255,255,0.5)
        `,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease"
      }}
    >
      {children}
    </div>
  );
}

export function DragDropCounting({ targetNumber, objectEmoji, objectName, onComplete }: DragDropCountingProps) {
  const [droppedCount, setDroppedCount] = useState(0);
  const [availableItems, setAvailableItems] = useState<number[]>([]);
  const [droppedItems, setDroppedItems] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Generate more items than needed
    setAvailableItems(Array.from({ length: targetNumber + 3 }, (_, i) => i));
  }, [targetNumber]);

  const handleDrop = (itemId: number) => {
    if (!droppedItems.includes(itemId)) {
      const newCount = droppedCount + 1;
      setDroppedCount(newCount);
      setDroppedItems([...droppedItems, itemId]);

      if (newCount === targetNumber) {
        setShowSuccess(true);
        setTimeout(() => {
          onComplete(true);
        }, 2000);
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-8">
        {/* Instructions */}
        <motion.div
          className="text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="inline-block px-10 py-6 bg-white rounded-3xl shadow-lg">
            <p className="text-4xl font-bold text-gray-700">
              🎯 Drag <span className="text-6xl">{targetNumber}</span> {objectName} into the basket!
            </p>
          </div>
        </motion.div>

        <div className="flex items-center gap-16">
          {/* Available items */}
          <motion.div
            className="flex flex-wrap gap-6 p-8 rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.3)",
              border: "6px solid rgba(255,255,255,0.5)",
              maxWidth: "500px"
            }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {availableItems.map((id) => 
              !droppedItems.includes(id) && (
                <DraggableItem
                  key={id}
                  id={id}
                  emoji={objectEmoji}
                  onDrop={() => handleDrop(id)}
                />
              )
            )}
          </motion.div>

          {/* Drop zone */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <DropZone onDrop={() => {}}>
              {/* Basket emoji */}
              <div className="text-9xl mb-4">🧺</div>
              
              {/* Count display */}
              <motion.div
                className="text-8xl font-bold text-white mb-4"
                style={{ textShadow: "0 4px 10px rgba(0,0,0,0.3)" }}
                key={droppedCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
              >
                {droppedCount}
              </motion.div>

              {/* Collected items display */}
              <div className="flex flex-wrap gap-2 justify-center max-w-xs">
                {droppedItems.map((id) => (
                  <motion.div
                    key={id}
                    className="text-4xl"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12 }}
                  >
                    {objectEmoji}
                  </motion.div>
                ))}
              </div>
            </DropZone>
          </motion.div>
        </div>

        {/* Success animation */}
        {showSuccess && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <motion.div
              className="text-9xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.5, 1],
                transition: { duration: 1, repeat: 2 }
              }}
            >
              🎉✨🌟
            </motion.div>
          </motion.div>
        )}
      </div>
    </DndProvider>
  );
}
