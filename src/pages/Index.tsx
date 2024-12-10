import React, { useState, useEffect, useCallback } from 'react';
import { Bird } from '@/components/Bird';
import { Pipe } from '@/components/Pipe';
import { GameOver } from '@/components/GameOver';
import { toast } from 'sonner';

const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const PIPE_GAP = 150;
const PIPE_SPEED = 3;
const BIRD_SIZE = 32; // Bird width/height
const PIPE_WIDTH = 64; // Pipe width
const COLLISION_FORGIVENESS = 20; // Increased forgiveness for better gameplay
const GAP_FORGIVENESS = 30; // Extra forgiveness specifically for the gap area

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [birdPosition, setBirdPosition] = useState(300);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [birdRotation, setBirdRotation] = useState(0);
  const [pipes, setPipes] = useState<Array<{ x: number; height: number }>>([]);
  const [score, setScore] = useState(0);

  const jump = useCallback(() => {
    if (!gameStarted) {
      setGameStarted(true);
      toast('Game Started! Keep clicking or press space to fly!');
    }
    if (!gameOver) {
      setBirdVelocity(JUMP_FORCE);
      setBirdRotation(-20);
    }
  }, [gameOver, gameStarted]);

  const handleClick = () => jump();

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      jump();
    }
  }, [jump]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(() => {
      if (gameOver) return;

      // Update bird
      setBirdPosition((prev) => {
        const newPosition = prev + birdVelocity;
        if (newPosition > 600 || newPosition < 0) {
          setGameOver(true);
          return prev;
        }
        return newPosition;
      });
      setBirdVelocity((prev) => prev + GRAVITY);
      setBirdRotation((prev) => Math.min(prev + 2, 90));

      // Update pipes
      setPipes((prevPipes) => {
        const newPipes = prevPipes
          .map((pipe) => ({
            ...pipe,
            x: pipe.x - PIPE_SPEED,
          }))
          .filter((pipe) => pipe.x > -100);

        if (newPipes.length < 2) {
          newPipes.push({
            x: 800,
            height: Math.random() * (400 - PIPE_GAP) + 100,
          });
        }

        return newPipes;
      });

      // Check collisions with more forgiving hitbox
      pipes.forEach((pipe) => {
        const birdLeft = 0.25 * window.innerWidth;
        const birdRight = birdLeft + BIRD_SIZE * 0.8;
        const birdTop = birdPosition + BIRD_SIZE * 0.2;
        const birdBottom = birdPosition + BIRD_SIZE * 0.8;

        // More forgiving collision detection, especially in the gap
        if (
          birdRight > pipe.x + COLLISION_FORGIVENESS &&
          birdLeft < pipe.x + PIPE_WIDTH - COLLISION_FORGIVENESS &&
          (
            // Check top pipe with extra forgiveness near the gap
            birdTop < pipe.height - (birdBottom < pipe.height + GAP_FORGIVENESS ? GAP_FORGIVENESS : COLLISION_FORGIVENESS) ||
            // Check bottom pipe with extra forgiveness near the gap
            birdBottom > pipe.height + PIPE_GAP + (birdTop > pipe.height + PIPE_GAP - GAP_FORGIVENESS ? GAP_FORGIVENESS : COLLISION_FORGIVENESS)
          )
        ) {
          setGameOver(true);
          toast('Game Over! Try again!');
        }

        // Score point
        if (pipe.x + PIPE_SPEED < birdLeft && pipe.x > birdLeft - PIPE_SPEED) {
          setScore((prev) => prev + 1);
          toast('Point scored!');
        }
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, birdVelocity, pipes]);

  const restartGame = () => {
    setBirdPosition(300);
    setBirdVelocity(0);
    setBirdRotation(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  return (
    <div 
      className="relative w-full h-screen bg-gradient-to-b from-sky-start to-sky-end overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {!gameStarted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Flappy Bird</h1>
            <p className="text-xl text-white drop-shadow">Click or press space to start!</p>
          </div>
        </div>
      )}
      
      <Bird position={birdPosition} rotation={birdRotation} />
      
      {pipes.map((pipe, index) => (
        <React.Fragment key={index}>
          <Pipe height={pipe.height} isTop={true} position={pipe.x} />
          <Pipe height={600 - pipe.height - PIPE_GAP} isTop={false} position={pipe.x} />
        </React.Fragment>
      ))}

      {/* Ground */}
      <div className="absolute bottom-0 w-full h-20 bg-ground" />
      
      {/* Score */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <span className="text-4xl font-bold text-white drop-shadow-lg">{score}</span>
      </div>

      {gameOver && <GameOver score={score} onRestart={restartGame} />}
    </div>
  );
};

export default Index;
