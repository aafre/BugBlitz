import React from 'react';
import { BugIcon } from 'lucide-react';
interface BugProps {
  id: number;
  x: number;
  y: number;
  type: 'normal' | 'special' | 'time' | 'shield';
  size: number;
  onZap: () => void;
}
const Bug: React.FC<BugProps> = ({
  id,
  x,
  y,
  type,
  size,
  onZap
}) => {
  const getBugColor = () => {
    switch (type) {
      case 'special':
        return 'text-purple-500';
      case 'time':
        return 'text-blue-400';
      case 'shield':
        return 'text-green-400';
      default:
        return 'text-red-500';
    }
  };
  const getAnimation = () => {
    const baseAnimation = 'animate-pulse';
    switch (type) {
      case 'special':
        return `${baseAnimation} animate-bounce`;
      case 'time':
        return `${baseAnimation} animate-spin`;
      case 'shield':
        return baseAnimation;
      default:
        return '';
    }
  };
  return <button className={`absolute cursor-pointer transform hover:scale-110 transition-transform ${getBugColor()} ${getAnimation()}`} style={{
    left: `${x}px`,
    top: `${y}px`,
    width: `${size}px`,
    height: `${size}px`
  }} onClick={e => {
    e.preventDefault();
    onZap();
  }}>
      <BugIcon className="w-full h-full" />
    </button>;
};
export default Bug;