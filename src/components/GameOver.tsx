import React from 'react';
import { Button } from "@/components/ui/button";

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg text-center space-y-4">
        <h2 className="text-2xl font-bold">Game Over!</h2>
        <p className="text-xl">Score: {score}</p>
        <Button onClick={onRestart}>Play Again</Button>
      </div>
    </div>
  );
};