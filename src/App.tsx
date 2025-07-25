import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import EmojiMemoryGame from "./EmojiMemoryGame/EmojiMemoryGame";
import TictactoeGame from "./TictactoeGame/TictactoeGame";
import SnakeGame from "./SnakeGame/SnakeGame";

function App() {
  return (
    <Router basename="/game-hub">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="emoji-memory-game" element={<EmojiMemoryGame />} />
        <Route path="tic-tac-toe-game" element={<TictactoeGame/>} />
        <Route path="snake-board-game" element={<SnakeGame/>} />
      </Routes>
    </Router>
  );
}

export default App;
