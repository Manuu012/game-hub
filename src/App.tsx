import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import EmojiMemoryGame from "./EmojiMemoryGame/EmojiMemoryGame";
import TictactoeGame from "./TictactoeGame/TictactoeGame";

function App() {
  return (
    <Router basename="/game-hub">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="emoji-memory-game" element={<EmojiMemoryGame />} />
        <Route path="tic-tac-toe-game" element={<TictactoeGame/>} />
      </Routes>
    </Router>
  );
}

export default App;
