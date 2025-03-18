import React from 'react';
import { BugIcon, ZapIcon, TimerIcon } from 'lucide-react';
interface StartScreenProps {
  onStart: () => void;
}
const StartScreen: React.FC<StartScreenProps> = ({
  onStart
}) => {
  return <div className="max-w-md mx-auto p-6 bg-indigo-800 rounded-xl shadow-xl text-center">
      <h1 className="text-4xl font-bold mb-2 text-yellow-300 flex items-center justify-center gap-2">
        Bug Blitz <BugIcon className="h-8 w-8" />
      </h1>
      <h2 className="text-xl mb-6 text-indigo-200">
        Zap the Bugs, Beat the Clock!
      </h2>
      <div className="mb-6 text-left space-y-4">
        <div className="flex items-start gap-3">
          <ZapIcon className="h-6 w-6 text-yellow-300 mt-1 flex-shrink-0" />
          <p>
            Tap bugs quickly to earn points. The faster you zap, the higher your
            combo bonus!
          </p>
        </div>
        <div className="flex items-start gap-3">
          <TimerIcon className="h-6 w-6 text-yellow-300 mt-1 flex-shrink-0" />
          <p>You have 60 seconds to zap as many bugs as possible.</p>
        </div>
        <div className="flex items-start gap-3">
          <BugIcon className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
          <p>
            Watch for special bugs that give extra points, slow down time, or
            provide shields!
          </p>
        </div>
      </div>
      <button onClick={onStart} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 px-8 rounded-full hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all shadow-lg">
        START GAME
      </button>
    </div>;
};
export default StartScreen;