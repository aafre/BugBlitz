import React from "react";
import { TrophyIcon, RefreshCwIcon } from "lucide-react";
interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}
const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  onRestart,
}) => {
  // Determine message based on score
  const getMessage = () => {
    if (score >= 15000) return "Bug Exterminator Supreme!";
    if (score >= 10000) return "Expert Bug Hunter!";
    if (score >= 5000) return "Skilled Bug Zapper!";
    if (score >= 50) return "Novice Bug Catcher!";
    return "Bug Hunting Apprentice!";
  };
  return (
    <div className="max-w-md mx-auto p-8 bg-indigo-800 rounded-xl shadow-2xl text-center">
      <h1 className="text-3xl font-bold mb-2">Game Over!</h1>
      <div className="my-6 flex flex-col items-center">
        <TrophyIcon className="h-16 w-16 text-yellow-300 mb-4" />
        <div className="text-2xl mb-1">Your Score</div>
        <div className="text-5xl font-bold text-yellow-300 mb-3">{score}</div>
        <div className="text-xl font-medium text-indigo-200">
          {getMessage()}
        </div>
      </div>
      <button
        onClick={onRestart}
        className="mt-6 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 px-8 rounded-full hover:from-green-300 hover:to-green-500 transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 mx-auto"
      >
        <RefreshCwIcon className="h-5 w-5" />
        Play Again
      </button>
    </div>
  );
};
export default GameOverScreen;
