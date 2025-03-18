import React, { useState } from "react";
import GameArena from "./components/GameArena";
import StartScreen from "./components/StartScreen";
import GameOverScreen from "./components/GameOverScreen";
export function App() {
  const [gameState, setGameState] = useState<"start" | "playing" | "gameOver">(
    "start"
  );
  const [score, setScore] = useState(0);
  const startGame = () => {
    setGameState("playing");
    setScore(0);
  };
  const endGame = (finalScore: number) => {
    setScore(finalScore);
    setGameState("gameOver");
  };
  const restartGame = () => {
    setGameState("start");
  };
  return (
    <div className="w-full min-h-screen bg-indigo-900 text-white flex flex-col items-center justify-center">
      {gameState === "start" && <StartScreen onStart={startGame} />}
      {gameState === "playing" && <GameArena onGameOver={endGame} />}
      {gameState === "gameOver" && (
        <GameOverScreen score={score} onRestart={restartGame} />
      )}
    </div>
  );
}
