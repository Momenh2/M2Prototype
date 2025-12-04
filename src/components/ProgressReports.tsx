import { ChildData } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, TrendingUp, Clock, Award, BookOpen, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface ProgressReportsProps {
  childData: ChildData;
  onBack: () => void;
}

export function ProgressReports({ childData, onBack }: ProgressReportsProps) {
  // Mock data for charts
  const weeklyActivityData = [
    { day: 'Mon', minutes: 35, activities: 2 },
    { day: 'Tue', minutes: 42, activities: 3 },
    { day: 'Wed', minutes: 28, activities: 2 },
    { day: 'Thu', minutes: 50, activities: 4 },
    { day: 'Fri', minutes: 45, activities: 3 },
    { day: 'Sat', minutes: 38, activities: 3 },
    { day: 'Sun', minutes: 40, activities: 2 },
  ];

  const topicsData = [
    { name: 'Math', value: 35, color: '#3b82f6' },
    { name: 'Reading', value: 30, color: '#8b5cf6' },
    { name: 'Science', value: 20, color: '#10b981' },
    { name: 'Games', value: 15, color: '#f59e0b' },
  ];

  const strengthsWeaknesses = [
    { area: 'Math Problems', score: 85, status: 'strong' },
    { area: 'Reading Comprehension', score: 92, status: 'strong' },
    { area: 'Memory Games', score: 78, status: 'moderate' },
    { area: 'Story Completion', score: 65, status: 'needs-work' },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl text-gray-800">Progress Reports</h1>
          <div className="w-24"></div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <p className="text-gray-600 text-sm">Total Time</p>
            </div>
            <p className="text-3xl text-gray-800">5.2 hrs</p>
            <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +15% this week
            </p>
          </Card>

          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <p className="text-gray-600 text-sm">Activities</p>
            </div>
            <p className="text-3xl text-gray-800">{childData.stats.activitiesCompleted}</p>
            <p className="text-gray-500 text-sm mt-1">Completed</p>
          </Card>

          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <p className="text-gray-600 text-sm">Badges</p>
            </div>
            <p className="text-3xl text-gray-800">{childData.badges.length}</p>
            <p className="text-gray-500 text-sm mt-1">Earned</p>
          </Card>

          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <p className="text-gray-600 text-sm">Avg. Score</p>
            </div>
            <p className="text-3xl text-gray-800">82%</p>
            <p className="text-green-600 text-sm mt-1">Excellent!</p>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity */}
          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-xl text-gray-800 mb-4">Weekly Learning Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey="minutes" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Topics Distribution */}
          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-xl text-gray-800 mb-4">Learning Topics</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={topicsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {topicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Performance Analysis */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl text-gray-800 mb-4">Strengths & Areas for Improvement</h3>
          <div className="space-y-4">
            {strengthsWeaknesses.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800">{item.area}</span>
                    {item.status === 'strong' && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-lg">
                        Strong
                      </span>
                    )}
                    {item.status === 'moderate' && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-lg">
                        Good
                      </span>
                    )}
                    {item.status === 'needs-work' && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-lg">
                        Practice More
                      </span>
                    )}
                  </div>
                  <span className="text-gray-600">{item.score}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      item.status === 'strong'
                        ? 'bg-green-500'
                        : item.status === 'moderate'
                        ? 'bg-yellow-500'
                        : 'bg-orange-500'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Timeline */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl text-gray-800 mb-4">Recent Activity Timeline</h3>
          <div className="space-y-4">
            {[
              { time: '10:30 AM', activity: 'Completed Math Quiz', xp: 80, emoji: '📝' },
              { time: '11:15 AM', activity: 'Played Memory Game', xp: 95, emoji: '🎮' },
              { time: '2:45 PM', activity: 'Read Adventure Story', xp: 100, emoji: '📚' },
              { time: '4:20 PM', activity: 'Finished Daily Mission', xp: 50, emoji: '🎯' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
              >
                <div className="text-3xl">{item.emoji}</div>
                <div className="flex-1">
                  <p className="text-gray-800">{item.activity}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-600">+{item.xp} XP</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
          <h3 className="text-xl text-gray-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Recommendations
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span className="text-gray-700">
                {childData.name} shows excellent progress in reading. Consider introducing more advanced stories.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span className="text-gray-700">
                Story completion could use more practice. Encourage finishing longer narratives.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span className="text-gray-700">
                Great consistency! The {childData.stats.streakDays}-day streak shows strong commitment to learning.
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
