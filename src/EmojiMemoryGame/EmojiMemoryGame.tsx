import React, { useEffect, useState } from 'react';
import "../styles/EmojiGame.css";

type emoji = {
  id: number,
  emoji: string,
  isMatched: boolean,
  isFlipped: boolean,
};

const shuffle = (array: emoji[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function EmojiMemoryGame() {
  const [emojis, setEmojis] = useState<emoji[]>(shuffle([
    { id: 1, emoji: "😀", isMatched: false, isFlipped: false },
    { id: 2, emoji: "😎", isMatched: false, isFlipped: false },
    { id: 3, emoji: "🐶", isMatched: false, isFlipped: false },
    { id: 4, emoji: "🍕", isMatched: false, isFlipped: false },
    { id: 5, emoji: "🚀", isMatched: false, isFlipped: false },
    { id: 6, emoji: "🌈", isMatched: false, isFlipped: false },
    { id: 7, emoji: "🎉", isMatched: false, isFlipped: false },
    { id: 8, emoji: "🧠", isMatched: false, isFlipped: false },
    { id: 9, emoji: "😀", isMatched: false, isFlipped: false },
    { id: 10, emoji: "😎", isMatched: false, isFlipped: false },
    { id: 11, emoji: "🐶", isMatched: false, isFlipped: false },
    { id: 12, emoji: "🍕", isMatched: false, isFlipped: false },
    { id: 13, emoji: "🚀", isMatched: false, isFlipped: false },
    { id: 14, emoji: "🌈", isMatched: false, isFlipped: false },
    { id: 15, emoji: "🎉", isMatched: false, isFlipped: false },
    { id: 16, emoji: "🧠", isMatched: false, isFlipped: false },
  ]));

  const [selectedEmojis, setSelectedEmojis] = useState<emoji[]>([]);

  const handleOnGridItemClick = (clickedEmoji: emoji) => {
    // Prevent clicking on already matched or already flipped emoji
    if (clickedEmoji.isMatched || clickedEmoji.isFlipped || selectedEmojis.length === 2) return;

    const updated = emojis.map((e) =>
      e.id === clickedEmoji.id ? { ...e, isFlipped: true } : e
    );

    setEmojis(updated);
    const newSelected = [...selectedEmojis, { ...clickedEmoji, isFlipped: true }];
    setSelectedEmojis(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;

      if (first.emoji === second.emoji) {
        // Match found
        setTimeout(() => {
          setEmojis((prev) =>
            prev.map((e) =>
              e.emoji === first.emoji
                ? { ...e, isMatched: true }
                : e
            )
          );
          setSelectedEmojis([]);
        }, 500);
      } else {
        // No match: flip back after delay
        setTimeout(() => {
          setEmojis((prev) =>
            prev.map((e) =>
              e.id === first.id || e.id === second.id
                ? { ...e, isFlipped: false }
                : e
            )
          );
          setSelectedEmojis([]);
        }, 800);
      }
    }
  };

  const isGameWon = emojis.every(e => e.isMatched);

  return (
    <div className='emoji-container'>
      <button className='go-back-button' onClick={() => window.location.href = '/' }>Go Back</button>
      <h1>Emoji Memory Game</h1>
      {isGameWon && <h2 className="win-message">🎉 You Won! 🎉</h2>}
      <div className='grid-container'>
        {
          emojis.map((emoj) => (
            <button
              className={emoj.isFlipped || emoj.isMatched ? "grid-item-flipped" : "grid-item-unflipped"}
              key={emoj.id}
              onClick={() => handleOnGridItemClick(emoj)}
              disabled={emoj.isMatched}
            >
              { emoj.emoji}
            </button>
          ))
        }
      </div>
    </div>
  );
}
