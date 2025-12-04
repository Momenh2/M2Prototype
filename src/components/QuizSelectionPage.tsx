// QuizSelectionPage.tsx - Updated with props for navigation
import React, { useState, ReactNode } from 'react';
import {
  Search,
  Play,
  Calculator,
  Beaker,
  Languages,
  BrainCircuit,
  Music,
  Globe,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import { Button } from './ui/button';

interface QuizSelectionPageProps {
  onBack: () => void;
  onSelectQuiz: (quizId: number) => void;
}

// Define the interface for a Quiz object
interface Quiz {
  id: number;
  title: string;
  category: string;
  icon: ReactNode;
  color: string;
  lightColor: string;
  textColor: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number;
  time: string;
  image: string;
  description: string;
}

const QuizSelectionPage: React.FC<QuizSelectionPageProps> = ({ onBack, onSelectQuiz }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock Data for Quizzes typed with the Quiz interface
  const quizzes: Quiz[] = [
    {
      id: 1,
      title: 'Space Explorer',
      category: 'Science',
      icon: <Beaker size={24} />,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      difficulty: 'Easy',
      questions: 10,
      time: '5 min',
      image: '🚀',
      description: 'Journey through the solar system and learn about planets!',
    },
    {
      id: 2,
      title: 'Math Magic',
      category: 'Math',
      icon: <Calculator size={24} />,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      difficulty: 'Medium',
      questions: 15,
      time: '10 min',
      image: '🔢',
      description: 'Solve fun puzzles with addition, subtraction, and magic numbers.',
    },
    {
      id: 3,
      title: 'Word Wizard',
      category: 'English',
      icon: <Languages size={24} />,
      color: 'bg-pink-500',
      lightColor: 'bg-pink-100',
      textColor: 'text-pink-600',
      difficulty: 'Hard',
      questions: 20,
      time: '12 min',
      image: '📚',
      description: 'Master new words and become a spelling champion!',
    },
    {
      id: 4,
      title: 'Brain Teasers',
      category: 'Logic',
      icon: <BrainCircuit size={24} />,
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      difficulty: 'Hard',
      questions: 8,
      time: '15 min',
      image: '🧩',
      description: 'Tricky puzzles to stretch your brain power.',
    },
    {
      id: 5,
      title: 'Animal Kingdom',
      category: 'Science',
      icon: <Beaker size={24} />,
      color: 'bg-green-500',
      lightColor: 'bg-green-100',
      textColor: 'text-green-600',
      difficulty: 'Easy',
      questions: 10,
      time: '5 min',
      image: '🦁',
      description: 'Roar! Learn about wild animals and their habitats.',
    },
    {
      id: 6,
      title: 'Geography Geniuses',
      category: 'Social Studies',
      icon: <Globe size={24} />,
      color: 'bg-indigo-500',
      lightColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
      difficulty: 'Medium',
      questions: 12,
      time: '8 min',
      image: '🌍',
      description: 'Travel the world and identify countries and flags.',
    },
    {
      id: 7,
      title: 'Melody Maker',
      category: 'Music',
      icon: <Music size={24} />,
      color: 'bg-rose-500',
      lightColor: 'bg-rose-100',
      textColor: 'text-rose-600',
      difficulty: 'Easy',
      questions: 10,
      time: '6 min',
      image: '🎵',
      description: 'Listen to sounds and guess the instruments.',
    },
    {
      id: 8,
      title: 'Super Shapes',
      category: 'Math',
      icon: <Calculator size={24} />,
      color: 'bg-teal-500',
      lightColor: 'bg-teal-100',
      textColor: 'text-teal-600',
      difficulty: 'Easy',
      questions: 10,
      time: '5 min',
      image: '🔺',
      description: 'Identify shapes and learn about geometry.',
    },
  ];

  const categories: string[] = ['All', 'Math', 'Science', 'English', 'Logic', 'Social Studies', 'Music'];

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesCategory = selectedCategory === 'All' || quiz.category === selectedCategory;
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
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
              <p className="text-gray-500">Pick a quiz and test your skills!</p>
            </div>
            
            <div className="flex items-center bg-white border-2 border-indigo-100 rounded-2xl px-4 py-2 shadow-sm w-full sm:w-auto">
              <Search className="text-gray-400 mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Search quizzes..." 
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

          {/* Quiz Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div 
                key={quiz.id} 
                className="group bg-white rounded-3xl p-6 shadow-lg border-2 border-transparent hover:border-indigo-200 hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${quiz.lightColor} ${quiz.textColor}`}>
                    {quiz.icon}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {quiz.difficulty}
                  </div>
                </div>

                {/* Card Content */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300 cursor-default">
                    {quiz.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{quiz.description}</p>
                </div>

                {/* Card Stats */}
                <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
                  <div className="bg-gray-50 rounded-lg p-2 flex flex-col items-center">
                    <span className="text-gray-400 font-semibold text-xs">QUESTIONS</span>
                    <span className="text-gray-700 font-bold">{quiz.questions}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 flex flex-col items-center">
                    <span className="text-gray-400 font-semibold text-xs">TIME</span>
                    <div className="flex items-center text-gray-700 font-bold">
                      <Clock size={12} className="mr-1" />
                      {quiz.time}
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <button 
                  onClick={() => onSelectQuiz(quiz.id)}
                  className={`mt-auto w-full py-3 rounded-xl font-bold text-white shadow-md flex items-center justify-center transition-all active:scale-95 ${quiz.color} hover:brightness-110`}
                >
                  <Play size={20} className="mr-2 fill-current" />
                  Start Quiz
                </button>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredQuizzes.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="text-2xl font-bold text-gray-400">No quizzes found!</h3>
              <p className="text-gray-400">Try searching for something else.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default QuizSelectionPage;