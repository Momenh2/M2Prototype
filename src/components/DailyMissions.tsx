import { useState } from 'react';
import { ChildData } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, CheckCircle2, Circle, Gift } from 'lucide-react';

interface DailyMissionsProps {
  childData: ChildData;
  onBack: () => void;
  onComplete: (activityType: string, xp: number, badges: string[], items: string[]) => void;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  emoji: string;
  xp: number;
  completed: boolean;
}

export function DailyMissions({ childData, onBack, onComplete }: DailyMissionsProps) {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 'daily-quiz',
      title: 'Complete a Quiz',
      description: 'Test your knowledge with any quiz',
      emoji: '📝',
      xp: 50,
      completed: childData.completedActivities.includes('quiz'),
    },
    {
      id: 'play-game',
      title: 'Play a Mini Game',
      description: 'Have fun with a learning game',
      emoji: '🎮',
      xp: 50,
      completed: childData.completedActivities.includes('mini-game'),
    },
    {
      id: 'read-story',
      title: 'Read a Story',
      description: 'Explore a new adventure',
      emoji: '📚',
      xp: 50,
      completed: childData.completedActivities.includes('story'),
    },
    {
      id: 'earn-xp',
      title: 'Earn 100 XP',
      description: 'Complete activities to earn XP',
      emoji: '⭐',
      xp: 30,
      completed: childData.xp >= 100,
    },
    {
      id: 'login-streak',
      title: 'Keep Your Streak',
      description: 'Login and learn every day',
      emoji: '🔥',
      xp: 40,
      completed: childData.stats.streakDays > 0,
    },
  ]);

  const completedCount = missions.filter(m => m.completed).length;
  const totalXP = missions.reduce((sum, m) => sum + (m.completed ? m.xp : 0), 0);
  const allCompleted = completedCount === missions.length;

  const handleClaimRewards = () => {
    const badges = allCompleted ? ['Mission Complete!'] : [];
    onComplete('missions', totalXP, badges, []);
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
          <h1 className="text-4xl text-purple-600">Daily Missions 🎯</h1>
          <div className="w-24"></div>
        </div>

        {/* Progress Card */}
        <Card className="p-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-3xl mb-2">Today's Progress</h2>
              <p className="text-xl opacity-90">
                {completedCount} of {missions.length} missions completed
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">{completedCount === missions.length ? '🎉' : '⭐'}</div>
              <div className="text-2xl">
                {totalXP} XP Earned
              </div>
            </div>
          </div>
        </Card>

        {/* Missions List */}
        <div className="space-y-4">
          {missions.map((mission) => (
            <Card
              key={mission.id}
              className={`p-6 rounded-3xl transition-all ${
                mission.completed
                  ? 'bg-gradient-to-r from-green-50 to-green-100 border-4 border-green-300'
                  : 'bg-white hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">{mission.emoji}</div>
                
                <div className="flex-1">
                  <h3 className="text-2xl text-gray-800 mb-1 flex items-center gap-2">
                    {mission.title}
                    {mission.completed && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                  </h3>
                  <p className="text-gray-600">{mission.description}</p>
                </div>

                <div className="text-right">
                  <div className="text-2xl text-purple-600">+{mission.xp} XP</div>
                  {mission.completed ? (
                    <div className="flex items-center gap-1 text-green-600 mt-1">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Done!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-400 mt-1">
                      <Circle className="w-5 h-5" />
                      <span>Pending</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Claim Rewards Button */}
        {completedCount > 0 && (
          <Card className="p-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl border-4 border-yellow-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-8 h-8 text-orange-600" />
                  <h3 className="text-3xl text-orange-800">Rewards Available!</h3>
                </div>
                <p className="text-xl text-orange-600">
                  You've earned {totalXP} XP from completed missions!
                </p>
                {allCompleted && (
                  <p className="text-lg text-green-600 mt-2">
                    🎉 Bonus Badge: All missions complete!
                  </p>
                )}
              </div>
              <Button
                onClick={handleClaimRewards}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl h-16 px-8 text-xl"
              >
                Claim Rewards! 🎁
              </Button>
            </div>
          </Card>
        )}

        {/* Weekly Bonus Preview */}
        <Card className="p-6 bg-white rounded-3xl shadow-lg">
          <h3 className="text-2xl text-purple-600 mb-4">Weekly Challenge 🏆</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl text-gray-700">Complete all daily missions for 7 days</p>
              <p className="text-gray-600">Current streak: {childData.stats.streakDays} days</p>
            </div>
            <div className="text-right">
              <div className="text-3xl text-yellow-600">+500 XP</div>
              <div className="text-sm text-gray-500">Bonus Reward</div>
            </div>
          </div>
          <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
              style={{ width: `${(childData.stats.streakDays / 7) * 100}%` }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
