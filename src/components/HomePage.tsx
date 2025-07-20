import GameCards from "../components/GameCards";
import memorygamepic from "../assets/memory-game.png";
import "../styles/Home.css";

const games = [
  {
    title: "Emoji Memory Game",
    imgsrc: memorygamepic,
    description: "Flip and match emoji tiles!",
    id: "emoji-memory-game"
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
