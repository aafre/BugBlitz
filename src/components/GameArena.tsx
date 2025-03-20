import React, { useEffect, useState, useRef } from "react";
import Bug from "./Bug";
import { ZapIcon } from "lucide-react";

interface GameArenaProps {
  onGameOver: (score: number) => void;
}

interface BugType {
  id: number;
  x: number;
  y: number;
  type: "normal" | "special" | "time" | "shield";
  size: number;
  speed: number;
}

const GameArena: React.FC<GameArenaProps> = ({ onGameOver }) => {
  const [bugs, setBugs] = useState<BugType[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showCombo, setShowCombo] = useState(false);
  const [comboText, setComboText] = useState("");
  // Replace slow time with fast time effect
  const [isFastTime, setIsFastTime] = useState(false);
  const [hasShield, setHasShield] = useState(false);
  const arenaRef = useRef<HTMLDivElement>(null);
  const lastZapTime = useRef<number>(0);
  const bugIdCounter = useRef(0);

  // Timer logic
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          onGameOver(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [onGameOver, score]);

  // Bug generation logic with fast time effect
  useEffect(() => {
    const generateBug = () => {
      if (!arenaRef.current) return;
      const arenaWidth = arenaRef.current.offsetWidth;
      const arenaHeight = arenaRef.current.offsetHeight;
      // Determine bug type with probabilities
      const rand = Math.random();
      let bugType: BugType["type"] = "normal";
      if (rand > 0.95) bugType = "shield";
      else if (rand > 0.9) bugType = "time";
      else if (rand > 0.8) bugType = "special";
      // Adjust difficulty based on time left
      const difficulty = Math.max(1, (60 - timeLeft) / 10);
      const speed = 1 + Math.random() * difficulty * 0.5;
      const size = Math.max(30, 50 - difficulty * 3);
      const newBug: BugType = {
        id: bugIdCounter.current++,
        x: Math.random() * (arenaWidth - size),
        y: Math.random() * (arenaHeight - size),
        type: bugType,
        size,
        speed,
      };
      setBugs((prev) => [...prev, newBug]);
    };
    // In fast time mode, bugs are generated faster (e.g., every 500ms)
    const bugInterval = isFastTime ? 500 : 1000 - Math.min(500, timeLeft * 5);
    const bugTimer = setInterval(generateBug, bugInterval);
    return () => clearInterval(bugTimer);
  }, [timeLeft, isFastTime]);

  // Bug movement logic with fast time effect
  useEffect(() => {
    const moveBugs = () => {
      if (!arenaRef.current) return;
      const arenaWidth = arenaRef.current.offsetWidth;
      const arenaHeight = arenaRef.current.offsetHeight;
      setBugs((prev) =>
        prev.map((bug) => {
          // Random movement with boundaries
          let newX = bug.x + (Math.random() - 0.5) * 10 * bug.speed;
          let newY = bug.y + (Math.random() - 0.5) * 10 * bug.speed;
          newX = Math.max(0, Math.min(arenaWidth - bug.size, newX));
          newY = Math.max(0, Math.min(arenaHeight - bug.size, newY));
          return { ...bug, x: newX, y: newY };
        })
      );
    };
    // In fast time mode, bugs move faster: update positions more frequently (e.g., every 50ms)
    const moveInterval = isFastTime ? 50 : 100;
    const moveTimer = setInterval(moveBugs, moveInterval);
    return () => clearInterval(moveTimer);
  }, [bugs, isFastTime]);

  // Fast time effect duration: lasts for 5 seconds
  useEffect(() => {
    if (isFastTime) {
      const timer = setTimeout(() => {
        setIsFastTime(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isFastTime]);

  // Shield effect duration remains unchanged (7 seconds)
  useEffect(() => {
    if (hasShield) {
      const timer = setTimeout(() => {
        setHasShield(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [hasShield]);

  const zapBug = (id: number, type: BugType["type"]) => {
    // Remove the bug from the arena
    setBugs((prev) => prev.filter((bug) => bug.id !== id));
    // Calculate combo bonus
    const now = Date.now();
    const timeSinceLastZap = now - lastZapTime.current;
    lastZapTime.current = now;
    let points = 10; // Base points
    let newCombo = combo;
    if (timeSinceLastZap < 1000) {
      newCombo += 1;
      points += newCombo * 5;
      setComboText(`${newCombo}x Combo! +${points}`);
      setShowCombo(true);
      setTimeout(() => setShowCombo(false), 1000);
    } else {
      newCombo = 0;
    }
    setCombo(newCombo);
    // Special bug effects
    switch (type) {
      case "special":
        points *= 3;
        break;
      case "time":
        // Instead of slowing time, we now speed it up for a more competitive challenge
        setIsFastTime(true);
        break;
      case "shield":
        setHasShield(true);
        break;
      default:
        break;
    }
    setScore((prev) => prev + points);
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4 px-4">
        <div className="text-2xl font-bold">
          Score: <span className="text-yellow-300">{score}</span>
        </div>
        <div className="flex items-center gap-2">
          {isFastTime && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              FAST TIME
            </span>
          )}
          {hasShield && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              SHIELD
            </span>
          )}
        </div>
        <div className="text-2xl font-bold">
          Time:{" "}
          <span className={timeLeft <= 10 ? "text-red-500" : "text-yellow-300"}>
            {timeLeft}
          </span>
        </div>
      </div>
      <div
        ref={arenaRef}
        className="relative w-full aspect-[4/3] bg-indigo-950 rounded-xl border-4 border-indigo-700 overflow-hidden shadow-xl"
      >
        {bugs.map((bug) => (
          <Bug
            key={bug.id}
            id={bug.id}
            x={bug.x}
            y={bug.y}
            type={bug.type}
            size={bug.size}
            onZap={() => zapBug(bug.id, bug.type)}
          />
        ))}
        {showCombo && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-300 text-4xl font-bold animate-bounce flex items-center">
            {comboText} <ZapIcon className="ml-2 h-8 w-8" />
          </div>
        )}
        {hasShield && (
          <div className="absolute inset-0 border-8 border-green-500 opacity-30 rounded-lg pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default GameArena;
