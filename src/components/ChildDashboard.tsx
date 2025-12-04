import { useState, useEffect } from 'react';
import { ChildData, ViewType } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';

import { BookOpen, Gamepad2, Trophy, Target, Sparkles, Star, User, ArrowLeft, Lock, Shield, Pencil } from 'lucide-react';import { Progress } from './ui/progress';
import { createPortal } from "react-dom";
import { Input } from './ui/input';

interface ChildDashboardProps {
  childData: ChildData;
  setCurrentView: (view: ViewType) => void;
  onLogin: () => void;
  onBack: () => void;
}


export function ChildDashboard({ childData, setCurrentView, onLogin, onBack }: ChildDashboardProps) {
  const [showParentModal, setShowParentModal] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const xpPercentage = (childData.xp / childData.maxXp) * 100;

  // Bulletproof scroll lock
  useEffect(() => {
    if (showParentModal) {
      document.body.classList.add('overflow-hidden');
      document.documentElement.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [showParentModal]);

  const getAvatarEmoji = () => {
    const bodyEmojis: Record<string, string> = {
      default: '🙂',
      happy: '😊',
      cool: '😎',
      star: '🌟',
    };
    return bodyEmojis[childData.body] || '🙂';
  };

  const activities = [
    {
      id: 'quiz',
      title: 'Quizzes',
      emoji: '📝',
      color: 'from-blue-400 to-blue-600',
      view: 'quiz-selection' as ViewType,
      description: 'Test your knowledge!',
    },
    {
      id: 'game',
      title: 'Mini Games',
      emoji: '🎮',
      color: 'from-green-400 to-green-600',
      view: 'game-selection' as ViewType,
      description: 'Play and learn!',
    },
    {
      id: 'story',
      title: 'Story Time',
      emoji: '📚',
      color: 'from-purple-400 to-purple-600',
      view: 'story' as ViewType,
      description: 'Read adventures!',
    },
    {
      id: 'missions',
      title: 'Daily Missions',
      emoji: '🎯',
      color: 'from-orange-400 to-orange-600',
      view: 'missions' as ViewType,
      description: 'Complete challenges!',
    },
  ];

  const handlePinChange = (value: string) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value);
      setError('');
    }
  };

  const handleLogin = () => {
    if (pin === '1234') {
      closePopup();
      onLogin();
    } else {
      setError('Incorrect PIN. Try 1234 for demo.');
    }
  };

  const closePopup = () => {
    setShowParentModal(false);
    setPin('');
    setError('');
  };

  return (
    <>
      {/* DASHBOARD CONTENT */}
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative">
        {/* User Button - Fixed position toggle */}
        <button
          onClick={() => setShowParentModal(true)}
          className="fixed bottom-6 right-6 z-50 bg-white shadow-xl rounded-full p-4 hover:scale-105 transition-all duration-200 flex items-center justify-center border border-purple-300 hover:shadow-2xl hover:border-purple-400"
        >
          <User className="w-6 h-6 text-purple-600" />
        </button>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header with Avatar */}
          <Card className="p-6 bg-white/90 backdrop-blur rounded-3xl shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar Display */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center text-7xl shadow-lg">
                  {getAvatarEmoji()}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full px-3 py-1 shadow-lg border-4 border-white">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span className="font-bold">{childData.level}</span>
                  </span>
                </div>
                {/* Edit Avatar Button */}
                <button
                  onClick={() => setCurrentView('avatar-editor')}
                  className="absolute -top-2 -left-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg border-2 border-white transition-all"
                  title="Edit Avatar"
                >
                   <Pencil className="w-4 h-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <h1 className="text-4xl font-bold text-purple-600">
                  Welcome back, {childData.name}! 👋
                </h1>
                
                {/* XP Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Level {childData.level}</span>
                    <span>{childData.xp} / {childData.maxXp} XP</span>
                  </div>
                  <Progress value={xpPercentage} className="h-4 bg-gray-200" />
                </div>
              </div>

              {/* Progress Button */}
              <Button
                onClick={() => setCurrentView('child-progress')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl h-12 px-6"
              >
                <Trophy className="w-5 h-5 mr-2" />
                My Progress
              </Button>
            </div>
          </Card>

          {/* Continue Quest Section */}
          <Card className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-3xl shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-3xl font-bold flex items-center gap-2 justify-center md:justify-start">
                  <Sparkles className="w-8 h-8" />
                  Continue Your Quest!
                </h2>
                <p className="text-xl opacity-90">Keep learning and grow stronger!</p>
              </div>
              <Button
                onClick={() => setCurrentView('quiz')}
                className="bg-white text-purple-600 hover:bg-gray-100 rounded-2xl h-16 px-8 text-xl font-bold"
              >
                Start Learning →
              </Button>
            </div>
          </Card>

          {/* Activity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <Card
                key={activity.id}
                className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer hover:scale-105"
                onClick={() => setCurrentView(activity.view)}
              >
                <div className="space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${activity.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg`}>
                    {activity.emoji}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{activity.title}</h3>
                    <p className="text-gray-600">{activity.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white rounded-3xl shadow-lg text-center">
              <div className="text-5xl mb-2">🏆</div>
              <div className="text-3xl font-bold text-purple-600">{childData.badges.length}</div>
              <div className="text-gray-600">Badges Earned</div>
            </Card>
            
            <Card className="p-6 bg-white rounded-3xl shadow-lg text-center">
              <div className="text-5xl mb-2">✨</div>
              <div className="text-3xl font-bold text-purple-600">{childData.completedActivities.length}</div>
              <div className="text-gray-600">Activities Done</div>
            </Card>
            
            <Card className="p-6 bg-white rounded-3xl shadow-lg text-center">
              <div className="text-5xl mb-2">🔥</div>
              <div className="text-3xl font-bold text-purple-600">{childData.stats.streakDays}</div>
              <div className="text-gray-600">Day Streak</div>
            </Card>
          </div>
        </div>
      </div>

      {/* PORTAL THE MODAL */}
      {showParentModal &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closePopup}
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99999999
            }}
          >
            <div
              className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl relative max-h-[90vh] overflow-y-auto mx-auto"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                zIndex: 99999999,
                width: '90%',
                maxWidth: '400px',
              }}
            >
              <Button
                onClick={closePopup}
                variant="ghost"
                className="rounded-2xl mb-4 hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>

              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-5 rounded-2xl">
                    <Shield className="w-16 h-16 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Parent Access</h2>
                <p className="text-gray-600">Enter your PIN to continue</p>
              </div>

              <div className="space-y-4 mt-6">
                <label className="text-sm text-gray-600 flex items-center gap-2 font-medium">
                  <Lock className="w-4 h-4" />
                  4-Digit PIN
                </label>

                <Input
                  type="password"
                  inputMode="numeric"
                  value={pin}
                  onChange={(e) => handlePinChange(e.target.value)}
                  placeholder="••••"
                  className="h-14 text-2xl text-center tracking-widest rounded-xl border-2"
                  maxLength={4}
                />

                {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

                <Button
                  onClick={handleLogin}
                  disabled={pin.length !== 4}
                  className="w-full h-12 bg-gray-800 hover:bg-gray-900 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Access Dashboard
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}