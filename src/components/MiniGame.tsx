import { useState, useEffect } from 'react';
import { ChildData } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Trophy } from 'lucide-react';

interface MiniGameProps {
  childData: ChildData;
  onComplete: (activityType: string, xp: number, badges: string[], items: string[]) => void;
  onBack: () => void;
}

const emojis = ['🍎', '🍌', '🍊', '🍇', '🍓', '🍉', '🥝', '🍒'];

export function MiniGame({ childData, onComplete, onBack }: MiniGameProps) {
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameEmojis = emojis.slice(0, 6);
    const shuffled = [...gameEmojis, ...gameEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameComplete(false);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].flipped || cards[cardId].matched) return;

    const newCards = [...cards];
    newCards[cardId].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          
          const newMatches = matches + 1;
          setMatches(newMatches);
          
          if (newMatches === 6) {
            setGameComplete(true);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleFinish = () => {
    const xpEarned = Math.max(100 - (moves * 5), 50);
    const badges = moves <= 8 ? ['Memory Master!'] : [];
    onComplete('mini-game', xpEarned, badges, []);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            className="rounded-2xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="flex gap-6 text-xl">
            <span className="text-gray-600">Moves: <span className="text-purple-600">{moves}</span></span>
            <span className="text-gray-600">Matches: <span className="text-green-600">{matches}/6</span></span>
          </div>
        </div>

        {/* Game Title */}
        <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl shadow-xl text-center">
          <h2 className="text-4xl">🎮 Memory Match Game</h2>
          <p className="text-xl mt-2 opacity-90">Find all the matching pairs!</p>
        </Card>

        {/* Game Board */}
        {!gameComplete ? (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {cards.map((card) => (
              <Card
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square flex items-center justify-center text-6xl cursor-pointer transition-all rounded-3xl ${
                  card.flipped || card.matched
                    ? 'bg-white shadow-lg'
                    : 'bg-gradient-to-br from-purple-400 to-pink-400 hover:scale-105'
                } ${card.matched ? 'opacity-50' : ''}`}
              >
                {card.flipped || card.matched ? card.emoji : '❓'}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 bg-white rounded-3xl shadow-xl text-center space-y-6">
            <div className="space-y-4">
              <div className="text-8xl">🎉</div>
              <h2 className="text-5xl text-purple-600">Great Job!</h2>
              <p className="text-2xl text-gray-600">
                You completed the game in {moves} moves!
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-xl text-gray-700">
                <Trophy className="w-6 h-6 text-yellow-500" />
                You earned {Math.max(100 - (moves * 5), 50)} XP!
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={initializeGame}
                  variant="outline"
                  className="h-14 px-8 text-xl rounded-2xl border-2"
                >
                  Play Again
                </Button>
                <Button
                  onClick={handleFinish}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl h-14 px-8 text-xl"
                >
                  Collect Reward! 🎁
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
