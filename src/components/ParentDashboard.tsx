import { ChildData, ViewType } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { BarChart3, Clock, Shield, Settings, Award, TrendingUp, Star, Calendar } from 'lucide-react';

interface ParentDashboardProps {
  childData: ChildData;
  setCurrentView: (view: ViewType) => void;
}

export function ParentDashboard({ childData, setCurrentView }: ParentDashboardProps) {
  const menuItems = [
    {
      icon: BarChart3,
      title: 'Progress Reports',
      description: 'View detailed learning analytics',
      view: 'progress-reports' as ViewType,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Clock,
      title: 'Screen Time Control',
      description: 'Manage daily usage limits',
      view: 'screen-time' as ViewType,
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Shield,
      title: 'Safe Mode & Content',
      description: 'Configure safety settings',
      view: 'safe-mode' as ViewType,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Manage account preferences',
      view: 'account-settings' as ViewType,
      color: 'from-gray-500 to-gray-600',
    },
  ];

  const todayStats = {
    learningTime: 45,
    activitiesCompleted: childData.stats.activitiesCompleted,
    xpEarned: childData.xp,
    topicsStudied: 3,
  };

  const recentAchievements = [
    { badge: 'Perfect Quiz!', date: 'Today', icon: '📝' },
    { badge: 'Memory Master!', date: 'Yesterday', icon: '🎮' },
    { badge: 'Story Master!', date: '2 days ago', icon: '📚' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl text-gray-800">Parent Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor and guide {childData.name}'s learning journey</p>
          </div>
          <Button
            onClick={() => setCurrentView('welcome')}
            variant="outline"
            className="rounded-xl"
          >
            Back to Child View
          </Button>
        </div>

        {/* Child Overview Card */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-5xl">
                {childData.body === 'default' ? '🙂' : childData.body === 'happy' ? '😊' : childData.body === 'cool' ? '😎' : '🌟'}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full px-2 py-1 border-2 border-white">
                <Star className="w-4 h-4" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl text-gray-800">{childData.name}</h2>
              <p className="text-gray-600">Level {childData.level} Explorer</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                  {childData.xp} XP
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm">
                  {childData.badges.length} Badges
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm">
                  {childData.stats.streakDays} Day Streak
                </span>
              </div>
            </div>

            <Button
              onClick={() => setCurrentView('progress-reports')}
              className="bg-blue-600 hover:bg-blue-700 rounded-xl"
            >
              View Full Report
            </Button>
          </div>
        </Card>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Learning Time</p>
                <p className="text-3xl text-gray-800">{todayStats.learningTime}m</p>
                <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% this week
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Activities Done</p>
                <p className="text-3xl text-gray-800">{todayStats.activitiesCompleted}</p>
                <p className="text-gray-500 text-sm mt-1">Today</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">XP Earned</p>
                <p className="text-3xl text-gray-800">{todayStats.xpEarned}</p>
                <p className="text-gray-500 text-sm mt-1">Total</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Topics Studied</p>
                <p className="text-3xl text-gray-800">{todayStats.topicsStudied}</p>
                <p className="text-gray-500 text-sm mt-1">This week</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {recentAchievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{achievement.icon}</span>
                  <div>
                    <p className="text-gray-800">{achievement.badge}</p>
                    <p className="text-sm text-gray-500">{achievement.date}</p>
                  </div>
                </div>
                <Award className="w-5 h-5 text-yellow-500" />
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Card
              key={item.title}
              className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setCurrentView(item.view)}
            >
              <div className="flex items-start gap-4">
                <div className={`bg-gradient-to-br ${item.color} p-4 rounded-xl`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Notifications */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-500 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-gray-800 mb-1">Weekly Summary Available</h3>
              <p className="text-gray-600 text-sm">
                {childData.name} completed {childData.stats.activitiesCompleted} activities this week and earned {childData.badges.length} new badges!
              </p>
            </div>
            <Button
              onClick={() => setCurrentView('progress-reports')}
              variant="outline"
              className="rounded-xl"
            >
              View Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
