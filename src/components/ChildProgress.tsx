import { ChildData } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Trophy, Star, Zap, Calendar } from 'lucide-react';

interface ChildProgressProps {
  childData: ChildData;
  onBack: () => void;
}

export function ChildProgress({ childData, onBack }: ChildProgressProps) {
  const allBadges = [
    { id: 'quiz-master', emoji: '📝', name: 'Quiz Master', unlocked: childData.badges.includes('Perfect Quiz!') },
    { id: 'memory-master', emoji: '🎮', name: 'Memory Master', unlocked: childData.badges.includes('Memory Master!') },
    { id: 'story-master', emoji: '📚', name: 'Story Master', unlocked: childData.badges.includes('Story Master!') },
    { id: 'early-bird', emoji: '🌅', name: 'Early Bird', unlocked: false },
    { id: 'speed-demon', emoji: '⚡', name: 'Speed Demon', unlocked: false },
    { id: 'perfect-week', emoji: '📅', name: 'Perfect Week', unlocked: false },
    { id: 'helper', emoji: '🤝', name: 'Helpful Friend', unlocked: false },
    { id: 'curious', emoji: '🔍', name: 'Curious Mind', unlocked: false },
    { id: 'champion', emoji: '👑', name: 'Champion', unlocked: false },
  ];

  const recentActivities = [
    { activity: 'Completed Quiz', time: 'Today', emoji: '📝', xp: 80 },
    { activity: 'Finished Story', time: 'Yesterday', emoji: '📚', xp: 100 },
    { activity: 'Played Memory Game', time: '2 days ago', emoji: '🎮', xp: 95 },
  ];

  const nextMilestones = [
    { title: 'Level 2', progress: (childData.xp / childData.maxXp) * 100, emoji: '⭐' },
    { title: '10 Activities', progress: (childData.stats.activitiesCompleted / 10) * 100, emoji: '🎯' },
    { title: '7 Day Streak', progress: (childData.stats.streakDays / 7) * 100, emoji: '🔥' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
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
          <h1 className="text-4xl text-purple-600">My Progress 🌟</h1>
          <div className="w-24"></div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-3xl shadow-lg text-center">
            <Star className="w-8 h-8 mx-auto mb-2" />
            <div className="text-4xl mb-1">Level {childData.level}</div>
            <div className="text-sm opacity-90">Current Level</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl shadow-lg text-center">
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <div className="text-4xl mb-1">{childData.xp}</div>
            <div className="text-sm opacity-90">Total XP</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-3xl shadow-lg text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <div className="text-4xl mb-1">{childData.badges.length}</div>
            <div className="text-sm opacity-90">Badges Earned</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-3xl shadow-lg text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2" />
            <div className="text-4xl mb-1">{childData.stats.streakDays}</div>
            <div className="text-sm opacity-90">Day Streak</div>
          </Card>
        </div>

        {/* Badges Gallery */}
        <Card className="p-8 bg-white rounded-3xl shadow-xl">
          <h2 className="text-3xl text-purple-600 mb-6 flex items-center gap-2">
            <Trophy className="w-8 h-8" />
            Badge Collection
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {allBadges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl text-center transition-all ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-4 border-yellow-400'
                    : 'bg-gray-100 opacity-50'
                }`}
              >
                <div className={`text-5xl mb-2 ${!badge.unlocked ? 'grayscale' : ''}`}>
                  {badge.unlocked ? badge.emoji : '🔒'}
                </div>
                <div className="text-sm">{badge.name}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="p-8 bg-white rounded-3xl shadow-xl">
          <h2 className="text-3xl text-purple-600 mb-6">Recent Activities 📊</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{activity.emoji}</div>
                  <div>
                    <div className="text-xl text-gray-800">{activity.activity}</div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                </div>
                <div className="text-xl text-purple-600">+{activity.xp} XP</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Next Milestones */}
        <Card className="p-8 bg-white rounded-3xl shadow-xl">
          <h2 className="text-3xl text-purple-600 mb-6">Next Milestones 🎯</h2>
          <div className="space-y-6">
            {nextMilestones.map((milestone, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{milestone.emoji}</span>
                    <span className="text-xl text-gray-800">{milestone.title}</span>
                  </div>
                  <span className="text-lg text-purple-600">{Math.round(milestone.progress)}%</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
