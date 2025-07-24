import React, { useEffect, useRef, useState } from 'react';
import { Snake, Position } from './Snake';
import "../styles/SnakeGame.css"
import restart from "../assets/restart.png";
import play from "../assets/play.png";
import stop from "../assets/stop.png";


const BOARD_SIZE = 11;

const getRandomFood = (): Position => ({
  x: Math.floor(Math.random() * BOARD_SIZE),
  y: Math.floor(Math.random() * BOARD_SIZE),
});

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const directionMap: Record<Direction, Position> = {
  UP: { x: -1, y: 0 },
  DOWN: { x: 1, y: 0 },
  LEFT: { x: 0, y: -1 },
  RIGHT: { x: 0, y: 1 },
};

export default function SnakeGame() {
  const snakeRef = useRef(new Snake({ x: 6, y: 6 }));
  const [snakeBody, setSnakeBody] = useState<Position[]>(snakeRef.current.getBody());
  const [food, setFood] = useState<Position>(getRandomFood());
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
  if (isGameOver || !gameRunning) return;

  const interval = setInterval(() => {
    const head = snakeRef.current.head.position;
    const delta = directionMap[direction];
    const newHead: Position = { x: head.x + delta.x, y: head.y + delta.y };

    if (
      newHead.x < 0 || newHead.x >= BOARD_SIZE ||
      newHead.y < 0 || newHead.y >= BOARD_SIZE ||
      snakeRef.current.hasCollision(newHead)
    ) {
      setIsGameOver(true);
      setGameRunning(false);
      return;
    }

    const isFood = newHead.x === food.x && newHead.y === food.y;

    snakeRef.current.move(newHead, isFood);
    setSnakeBody(snakeRef.current.getBody());

    if (isFood) {
      let newFood;
      do {
        newFood = getRandomFood();
      } while (snakeRef.current.hasCollision(newFood));
      setFood(newFood);
      setScore(prev => prev + 1);
    }
  }, 200);

  return () => clearInterval(interval);
}, [direction, food, isGameOver, gameRunning]);


  return (
    <div className='snake-game-container'>
      <div className="score-board">
         <h2 className='game-status'>{isGameOver ? '💀 Game Over' : '🐍 Snake Game'}</h2>
        <div className="controls">
        {!gameRunning && !isGameOver && (
         <button className='control-btn' onClick={() => {
            setGameRunning(true)
            }}>
          <img src={play} className='control-icon' alt='play-icon' />
         </button>
        )}
       {gameRunning && !isGameOver && (
       <button className='control-btn' onClick={() => setGameRunning(false)}>
       <img src={stop} className='control-icon' alt='stop-icon' />
       </button>
       )}
        {isGameOver && (
        <button onClick={() => window.location.reload()} className='restart-btn'>
          <img src={restart} className='reset-img' alt='reset-icon'/>
        </button>
       )}
      </div>
          <span>Score: {score}</span>
       </div>
      <div
        className='snake-board'
      >
        {[...Array(BOARD_SIZE)].flatMap((_, row) =>
          [...Array(BOARD_SIZE)].map((_, col) => {
            const isSnake = snakeBody.some(pos => pos.x === row && pos.y === col);
            const isFoodHere = food.x === row && food.y === col;

            return (
              <div
  key={`${row}-${col}`}
  className={`snake-cell
    ${isSnake ? (row === snakeBody[0]?.x && col === snakeBody[0]?.y ? 'snake-head' : 'snake-body') : ''}
    ${isFoodHere ? 'food' : ''}
  `}
>{isFoodHere && <span className="food-emoji">🍎</span>}
</div>

            );
          })
        )}
      </div>
    </div>
  );
}
