import React, { useState, ReactNode } from 'react';
import {
  Search,
  BookOpen,
  Globe,
  Castle,
  Rocket,
  Heart,
  Star,
  Clock,
  ArrowLeft,
  X,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

// Define the interface for a Story object
interface Story {
  id: number;
  title: string;
  category: string;
  icon: ReactNode;
  color: string;
  lightColor: string;
  textColor: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  chapters: number;
  time: string;
  image: string;
  description: string;
  author: string;
}

interface StoryAdventureProps {
  onBack: () => void;
  onComplete: (activityType: string, xp: number, badges: string[], items: string[]) => void;
  childData: {
    name: string;
  };
}

const storyPages = [
  {
    text: "Once upon a time, in a magical forest, there lived a brave little explorer named {name}. 🌲",
    image: "🏞️",
    question: null,
    videoUrl: "https://www.youtube.com/watch?v=q5T-v5lYnck",
  },
  {
    text: "One sunny morning, {name} discovered a mysterious glowing path that led deep into the forest. ✨",
    image: "🛤️",
    question: null,
    videoUrl: "https://www.youtube.com/watch?v=q5T-v5lYnck",
  },
  {
    text: "What should {name} do?",
    image: "🤔",
    question: {
      options: [
        "Follow the glowing path",
        "Go back home",
      ],
      correctIndex: 0,
    },
    videoUrl: "https://www.youtube.com/watch?v=q5T-v5lYnck",
  },
  {
    text: "{name} bravely followed the path and found a friendly dragon who needed help! 🐉",
    image: "🐲",
    question: null,
    videoUrl: "https://www.youtube.com/watch?v=q5T-v5lYnck",
  },
  {
    text: "The dragon had lost its magical crystal. Where should they look?",
    image: "💎",
    question: {
      options: [
        "In the dark cave",
        "By the sparkling lake",
      ],
      correctIndex: 1,
    },
    videoUrl: "https://www.youtube.com/watch?v=q5T-v5lYnck",
  },
  {
    text: "At the sparkling lake, {name} found the crystal! The dragon was so happy and gave {name} a special reward! 🎁",
    image: "🌟",
    question: null,
    videoUrl: "https://www.youtube.com/watch?v=q5T-v5lYnck",
  },
  {
    text: "Thanks to {name}'s kindness and bravery, the forest became even more magical! The End. 🎉",
    image: "🏆",
    question: null,
    videoUrl: "https://www.youtube.com/watch?v=q5T-v5lYnck",
  },
];

// Extract video ID from YouTube URL
function getVideoId(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v') || '';
  } catch {
    return '';
  }
}

const StoryAdventure: React.FC<StoryAdventureProps> = ({ onBack, onComplete, childData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [correctChoices, setCorrectChoices] = useState(0);
  const [showVideo, setShowVideo] = useState(true);

  // Mock Data for Stories
  const stories: Story[] = [
    {
      id: 1,
      title: 'Space Adventure',
      category: 'Sci-Fi',
      icon: <Rocket size={24} />,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      difficulty: 'Easy',
      chapters: 10,
      time: '15 min',
      image: '🚀',
      description: 'Journey to distant galaxies and discover alien worlds!',
      author: 'Alex Starwalker',
    },
    {
      id: 2,
      title: 'Magical Forest',
      category: 'Fantasy',
      icon: <Castle size={24} />,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      difficulty: 'Medium',
      chapters: 15,
      time: '25 min',
      image: '🌳',
      description: 'Enter an enchanted forest full of magical creatures and secrets.',
      author: 'Emma Greenleaf',
    },
    {
      id: 3,
      title: 'World Explorer',
      category: 'Adventure',
      icon: <Globe size={24} />,
      color: 'bg-pink-500',
      lightColor: 'bg-pink-100',
      textColor: 'text-pink-600',
      difficulty: 'Hard',
      chapters: 20,
      time: '12 min',
      image: '🗺️',
      description: 'Travel across continents and learn about different cultures.',
      author: 'Leo Navigator',
    },
    {
      id: 4,
      title: 'Dragon Kingdom',
      category: 'Fantasy',
      icon: <Castle size={24} />,
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      difficulty: 'Hard',
      chapters: 8,
      time: '15 min',
      image: '🐉',
      description: 'A tale of dragons, knights, and ancient kingdoms.',
      author: 'Dragon Master',
    },
    {
      id: 5,
      title: 'Ocean Deep',
      category: 'Adventure',
      icon: <Globe size={24} />,
      color: 'bg-green-500',
      lightColor: 'bg-green-100',
      textColor: 'text-green-600',
      difficulty: 'Easy',
      chapters: 10,
      time: '5 min',
      image: '🌊',
      description: 'Dive into the deep sea and discover amazing marine life.',
      author: 'Marina Blue',
    },
    {
      id: 6,
      title: 'Friendship Tales',
      category: 'Heartwarming',
      icon: <Heart size={24} />,
      color: 'bg-indigo-500',
      lightColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
      difficulty: 'Medium',
      chapters: 12,
      time: '8 min',
      image: '👫',
      description: 'Beautiful stories about friendship and kindness.',
      author: 'Kindness Crew',
    },
    {
      id: 7,
      title: 'Mystery Island',
      category: 'Mystery',
      icon: <BookOpen size={24} />,
      color: 'bg-rose-500',
      lightColor: 'bg-rose-100',
      textColor: 'text-rose-600',
      difficulty: 'Easy',
      chapters: 10,
      time: '6 min',
      image: '🏝️',
      description: 'Solve puzzles and uncover secrets on a mysterious island.',
      author: 'Detective Max',
    },
    {
      id: 8,
      title: 'Starry Night',
      category: 'Bedtime',
      icon: <Star size={24} />,
      color: 'bg-teal-500',
      lightColor: 'bg-teal-100',
      textColor: 'text-teal-600',
      difficulty: 'Easy',
      chapters: 10,
      time: '5 min',
      image: '✨',
      description: 'Gentle stories perfect for bedtime reading.',
      author: 'Sleepy Owl',
    },
  ];

  const categories: string[] = ['All', 'Fantasy', 'Adventure', 'Sci-Fi', 'Mystery', 'Heartwarming', 'Bedtime'];

  const filteredStories = stories.filter((story) => {
    const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const page = storyPages[currentPage];
  const storyText = page.text.replace(/{name}/g, childData.name);
  const videoId = getVideoId(page.videoUrl);

  const handleChoice = (index: number) => {
    if (page.question && index === page.question.correctIndex) {
      setCorrectChoices(prev => prev + 1);
    }
    
    if (currentPage < storyPages.length - 1) {
      setCurrentPage(prev => prev + 1);
      setShowVideo(true);
    } else {
      // Story completed
      onComplete('story', 50, ['Story Master'], ['Magical Crystal']);
    }
  };

  const handleNext = () => {
    if (currentPage < storyPages.length - 1) {
      setCurrentPage(prev => prev + 1);
      setShowVideo(true);
    } else {
      // Story completed
      onComplete('story', 50, ['Story Master'], ['Magical Crystal']);
    }
  };

  const handleSelectStory = (storyId: number) => {
    setSelectedStoryId(storyId);
  };

  const handleBackToSelection = () => {
    setSelectedStoryId(null);
    setCurrentPage(0);
    setCorrectChoices(0);
    setShowVideo(true);
  };

  // If a story is selected, show the adventure page
  if (selectedStoryId !== null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBackToSelection}
              variant="ghost"
              className="rounded-2xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Stories
            </Button>
            <div className="flex items-center gap-2 text-xl text-gray-600">
              <BookOpen className="w-5 h-5" />
              Page {currentPage + 1} of {storyPages.length}
            </div>
          </div>

          {/* Story Card */}
          <Card className="p-8 md:p-12 bg-white rounded-3xl shadow-xl">
            <div className="space-y-8">
              {/* Video Section - Always Visible */}
              {videoId && showVideo && (
                <div className="relative">
                  <Button
                    onClick={() => setShowVideo(false)}
                    variant="ghost"
                    size="sm"
                    className="absolute -top-4 -right-4 z-10 rounded-full bg-white shadow-lg hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                      title="Story video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Show Video Button if hidden */}
              {videoId && !showVideo && (
                <div className="flex justify-center">
                  <Button
                    onClick={() => setShowVideo(true)}
                    variant="outline"
                    className="h-12 px-8 text-lg rounded-2xl border-2 border-purple-300 hover:bg-purple-50"
                  >
                    Show Video 🎥
                  </Button>
                </div>
              )}

              {/* Story Image */}
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl flex items-center justify-center text-9xl shadow-lg">
                  {page.image}
                </div>
              </div>

              {/* Story Text */}
              <p className="text-2xl md:text-3xl text-gray-800 text-center leading-relaxed">
                {storyText}
              </p>

              {/* Interactive Choices or Next Button */}
              {page.question ? (
                <div className="space-y-4">
                  {page.question.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleChoice(index)}
                      className="w-full h-16 text-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center">
                  <Button
                    onClick={handleNext}
                    className="h-16 px-12 text-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl"
                  >
                    {currentPage < storyPages.length - 1 ? 'Continue →' : 'Finish Story 🎉'}
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            {storyPages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentPage
                    ? 'bg-purple-500 w-8'
                    : index < currentPage
                    ? 'bg-purple-300'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show story selection page
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
              <h1 className="text-3xl font-bold text-gray-800">Choose Your Adventure 📚</h1>
              <p className="text-gray-500">Pick a story and start your journey!</p>
            </div>
            
            <div className="flex items-center bg-white border-2 border-indigo-100 rounded-2xl px-4 py-2 shadow-sm w-full sm:w-auto">
              <Search className="text-gray-400 mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Search stories or authors..." 
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

          {/* Story Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStories.map((story) => (
              <div 
                key={story.id} 
                className="group bg-white rounded-3xl p-6 shadow-lg border-2 border-transparent hover:border-indigo-200 hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${story.lightColor} ${story.textColor}`}>
                    {story.icon}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    story.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    story.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {story.difficulty}
                  </div>
                </div>

                {/* Card Content */}
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300 cursor-default">
                    {story.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-2">{story.description}</p>
                  <p className="text-gray-400 text-xs italic">by {story.author}</p>
                </div>

                {/* Card Stats */}
                <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
                  <div className="bg-gray-50 rounded-lg p-2 flex flex-col items-center">
                    <span className="text-gray-400 font-semibold text-xs">CHAPTERS</span>
                    <span className="text-gray-700 font-bold">{story.chapters}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 flex flex-col items-center">
                    <span className="text-gray-400 font-semibold text-xs">TIME</span>
                    <div className="flex items-center text-gray-700 font-bold">
                      <Clock size={12} className="mr-1" />
                      {story.time}
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <button 
                  onClick={() => handleSelectStory(story.id)}
                  className={`mt-auto w-full py-3 rounded-xl font-bold text-white shadow-md flex items-center justify-center transition-all active:scale-95 ${story.color} hover:brightness-110`}
                >
                  <BookOpen size={20} className="mr-2 fill-current" />
                  Start Reading
                </button>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredStories.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-2xl font-bold text-gray-400">No stories found!</h3>
              <p className="text-gray-400">Try searching for something else.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default StoryAdventure;