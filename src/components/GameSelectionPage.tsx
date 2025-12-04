import React, { useState, ReactNode } from 'react';
import {
  Gamepad2,
  Brain,
  Eye,
  Shapes,
  Palette,
  Volume2,
  Puzzle,
  ArrowLeft,
  Clock,
  Search,
  Play,
} from 'lucide-react';
import { Button } from './ui/button';

interface GameSelectionPageProps {
  onBack: () => void;
  onSelectGame: (gameId: number) => void;
}

interface Game {
  id: number;
  title: string;
  category: string;
  icon: ReactNode;
  color: string;
  lightColor: string;
  textColor: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time: string;
  image: string;
  description: string;
}

const GameSelectionPage: React.FC<GameSelectionPageProps> = ({ onBack, onSelectGame}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

const games: Game[] = [
    {
      id: 1,
      title: 'Memory Match',
      category: 'Logic',
      icon: <Brain size={24} />,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      difficulty: 'Easy',
      time: '5 min',
      image: '🧠',
      description: 'Match pairs of cards and test your memory skills!',
    },
    {
      id: 2,
      title: 'Spot the Difference',
      category: 'Visual Skills',
      icon: <Eye size={24} />,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      difficulty: 'Medium',
      time: '8 min',
      image: '👀',
      description: 'Look closely and find differences between two pictures!',
    },
    {
      id: 3,
      title: 'Shape Matcher',
      category: 'Math',
      icon: <Shapes size={24} />,
      color: 'bg-teal-500',
      lightColor: 'bg-teal-100',
      textColor: 'text-teal-600',
      difficulty: 'Easy',
      time: '6 min',
      image: '🔺',
      description: 'Match geometric shapes to their correct outlines.',
    },
    {
      id: 4,
      title: 'Color Sorter',
      category: 'Colors',
      icon: <Palette size={24} />,
      color: 'bg-rose-500',
      lightColor: 'bg-rose-100',
      textColor: 'text-rose-600',
      difficulty: 'Easy',
      time: '4 min',
      image: '🎨',
      description: 'Sort items into their correct color groups.',
    },
    {
      id: 5,
      title: 'Pattern Builder',
      category: 'Logic',
      icon: <Puzzle size={24} />,
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      difficulty: 'Medium',
      time: '10 min',
      image: '🧩',
      description: 'Complete fun visual patterns and sequences.',
    },
    {
      id: 6,
      title: 'Guess the Sound',
      category: 'Music',
      icon: <Volume2 size={24} />,
      color: 'bg-indigo-500',
      lightColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
      difficulty: 'Easy',
      time: '5 min',
      image: '🔊',
      description: 'Listen to sounds and choose the correct source!',
    },
  ];

  const categories = ['All', 'Logic', 'Visual Skills', 'Math', 'Colors', 'Music'];

  const filteredGames = games.filter((game) => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-blue-50 font-sans">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md p-6 shadow-sm z-10">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              className="rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Ready to Learn? 🚀</h1>
              <p className="text-gray-500">Pick a game and test your skills!</p>
            </div>
            
            <div className="flex items-center bg-white border-2 border-indigo-100 rounded-2xl px-4 py-2 shadow-sm w-full sm:w-auto">
              <Search className="text-gray-400 mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Search games..." 
                className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Categories & Grid */}
        <main className="flex-1 overflow-y-auto p-6 z-10">
          
          {/* Category Tabs */}
          <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-6 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all transform hover:scale-105 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Game Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <div 
                key={game.id} 
                className="group bg-white rounded-3xl p-6 shadow-lg border-2 border-transparent hover:border-indigo-200 hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${game.lightColor} ${game.textColor}`}>
                    {game.icon}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {game.difficulty}
                  </div>
                </div>

                {/* Card Content */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300 cursor-default">
                    {game.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{game.description}</p>
                </div>

                {/* Card Stats */}
                  <div className="bg-gray-50 rounded-lg p-2 flex flex-col items-center">
                    <span className="text-gray-400 font-semibold text-xs">TIME</span>
                    <div className="flex items-center text-gray-700 font-bold">
                      <Clock size={12} className="mr-1" />
                      {game.time}
                    </div>
                  </div>

                {/* Start Button */}
                <button 
                  onClick={() => onSelectGame(game.id)}
                  className={`mt-auto w-full py-3 rounded-xl font-bold text-white shadow-md flex items-center justify-center transition-all active:scale-95 ${game.color} hover:brightness-110`}
                >
                  <Play size={20} className="mr-2 fill-current" />
                  Play Game
                </button>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredGames.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="text-2xl font-bold text-gray-400">No games found!</h3>
              <p className="text-gray-400">Try searching for something else.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default GameSelectionPage;