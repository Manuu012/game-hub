import GameCards from "../components/GameCards";
import memorygamepic from "../assets/memory-game.png";
import tictacgamepic from "../assets/tic-tac-toe.png";
import snake from "../assets/snake.png";
import "../styles/Home.css";

const games = [
  {
    title: "Emoji Memory Game",
    imgsrc: memorygamepic,
    description: "Flip, Match, and Train Your Brain!",
    id: "emoji-memory-game"
  },
  {
    title: "Tic Tac Toe Game",
    imgsrc: tictacgamepic,
    description: "Classic Xs and Os — Outsmart Your Opponent!",
    id: "tic-tac-toe-game"
  },
  {
    title: "Snake Board Game",
    imgsrc: snake,
    description: "Slither, Snack, and Survive!",
    id: "snake-board-game"
  }
];


const Home = () => {
  return (
    <div className="game-container">
      {games.map((game) => (
        <GameCards
          key={game.id}
          id={game.id}
          title={game.title}
          imgsrc={game.imgsrc}
          description={game.description}
        />
      ))}
    </div>
  );
};

export default Home;
